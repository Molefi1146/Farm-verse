/*
  # Create wallets table and related functions

  1. New Tables
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `wallet_name` (text)
      - `currency` (text)
      - `balance` (numeric)
      - Timestamps

  2. Security
    - Enable RLS
    - Add policies for wallet owners
    - Add triggers for balance updates

  3. Indexes
    - Index on user_id for faster lookups
    - Index on currency for potential filtering
*/

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  wallet_name text NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  balance numeric NOT NULL DEFAULT 0 CHECK (balance >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS wallets_user_id_idx ON wallets(user_id);
CREATE INDEX IF NOT EXISTS wallets_currency_idx ON wallets(currency);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_wallet_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_wallet_timestamp
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_timestamp();

-- Create balance update function
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- Update wallet balance when a transaction is completed
  IF (TG_OP = 'INSERT' AND NEW.status = 'completed') THEN
    IF NEW.type IN ('deposit', 'return') THEN
      UPDATE wallets
      SET balance = balance + NEW.amount
      WHERE user_id = NEW.user_id;
    ELSIF NEW.type IN ('withdrawal', 'investment') THEN
      UPDATE wallets
      SET balance = balance - NEW.amount
      WHERE user_id = NEW.user_id
      AND balance >= NEW.amount;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for balance updates
CREATE TRIGGER update_wallet_balance
  AFTER INSERT OR UPDATE OF status ON transactions
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION update_wallet_balance();

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own wallets"
  ON wallets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallets"
  ON wallets
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to handle new user wallet creation
CREATE OR REPLACE FUNCTION handle_new_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create wallet for investors
  IF NEW.role = 'investor' THEN
    INSERT INTO wallets (user_id, wallet_name)
    VALUES (NEW.id, 'Primary Wallet');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user wallet creation
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_wallet();
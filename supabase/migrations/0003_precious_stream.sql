/*
  # Create investments and transactions tables

  1. New Tables
    - `investments`
      - `id` (uuid, primary key)
      - `investor_id` (uuid, references profiles)
      - `project_id` (uuid, references projects)
      - `shares` (integer)
      - `amount` (numeric)
      - `status` (enum)
      - Timestamps

    - `transactions`
      - For tracking deposits, withdrawals, and investment transactions

  2. Security
    - Enable RLS
    - Add policies for investors
*/

-- Create enum for investment status
CREATE TYPE investment_status AS ENUM ('pending', 'completed', 'cancelled');

-- Create enum for transaction types
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'investment', 'return');

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  shares integer NOT NULL,
  amount numeric NOT NULL,
  status investment_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(investor_id, project_id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type transaction_type NOT NULL,
  amount numeric NOT NULL,
  status investment_status DEFAULT 'pending',
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own investments"
  ON investments
  FOR SELECT
  USING (
    auth.uid() = investor_id OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = investments.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own investments"
  ON investments
  FOR INSERT
  WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Users can view their own transactions"
  ON transactions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
  ON transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
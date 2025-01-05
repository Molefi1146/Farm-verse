-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role user_role;
  user_name text;
  user_exp integer;
BEGIN
  -- Validate and set role
  BEGIN
    user_role := (NEW.raw_user_meta_data->>'role')::user_role;
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Invalid user role specified';
  END;

  -- Validate and set name
  user_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''),
    split_part(NEW.email, '@', 1)
  );

  -- Validate and set experience
  BEGIN
    user_exp := NULLIF(TRIM(NEW.raw_user_meta_data->>'experience'), '')::integer;
  EXCEPTION WHEN OTHERS THEN
    user_exp := NULL;
  END;

  -- Insert new profile with validated data
  INSERT INTO public.profiles (
    id,
    name,
    role,
    organization,
    experience
  ) VALUES (
    NEW.id,
    user_name,
    user_role,
    NULLIF(TRIM(NEW.raw_user_meta_data->>'organization'), ''),
    user_exp
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to create user profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
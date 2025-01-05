/*
  # Cap Table Schema

  1. New Tables
    - `share_classes`
      - Basic share class definitions
    - `shareholders`
      - Shareholder information and share allocation
    - `cap_table_history`
      - Version history of ownership changes

  2. Security
    - Enable RLS
    - Add policies for project admins
    - Restrict access to authorized users

  3. Triggers
    - Track ownership changes
    - Update total shares
*/

-- Create share classes table
CREATE TABLE IF NOT EXISTS share_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  rights text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create shareholders table
CREATE TABLE IF NOT EXISTS shareholders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  share_class_id uuid REFERENCES share_classes(id) ON DELETE CASCADE NOT NULL,
  shares integer NOT NULL CHECK (shares >= 0),
  date_acquired timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id, share_class_id)
);

-- Create cap table history table
CREATE TABLE IF NOT EXISTS cap_table_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  changes jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE share_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shareholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cap_table_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Project admins can manage share classes"
  ON share_classes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = share_classes.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project admins can manage shareholders"
  ON shareholders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = shareholders.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Shareholders can view their own shares"
  ON shareholders
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = shareholders.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project admins can view cap table history"
  ON cap_table_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = cap_table_history.project_id
      AND projects.creator_id = auth.uid()
    )
  );

-- Create function to track cap table changes
CREATE OR REPLACE FUNCTION log_cap_table_change()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO cap_table_history (
    project_id,
    user_id,
    action,
    changes
  ) VALUES (
    NEW.project_id,
    auth.uid(),
    CASE
      WHEN TG_OP = 'INSERT' THEN 'added_shareholder'
      WHEN TG_OP = 'UPDATE' THEN 'updated_shares'
      WHEN TG_OP = 'DELETE' THEN 'removed_shareholder'
    END,
    jsonb_build_object(
      'old_value', row_to_json(OLD),
      'new_value', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for tracking changes
CREATE TRIGGER log_shareholder_changes
  AFTER INSERT OR UPDATE OR DELETE ON shareholders
  FOR EACH ROW
  EXECUTE FUNCTION log_cap_table_change();
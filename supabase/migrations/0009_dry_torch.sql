/*
  # Documents and Notifications Schema

  1. New Tables
    - project_documents: Document management
    - project_compliance: Certifications and permits
    - notifications: User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for document access
    - Add policies for notifications
*/

-- Project documents table
CREATE TABLE IF NOT EXISTS project_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  uploaded_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS project_documents_project_id_idx ON project_documents(project_id);
CREATE INDEX IF NOT EXISTS project_documents_type_idx ON project_documents(type);

-- Project compliance table
CREATE TABLE IF NOT EXISTS project_compliance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  status text NOT NULL,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS project_compliance_project_id_idx ON project_compliance(project_id);
CREATE INDEX IF NOT EXISTS project_compliance_status_idx ON project_compliance(status);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);

-- Enable RLS
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Project documents policies
CREATE POLICY "Project members can view documents"
  ON project_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_documents.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project creators can manage documents"
  ON project_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_documents.project_id
      AND projects.creator_id = auth.uid()
    )
  );

-- Project compliance policies
CREATE POLICY "Project members can view compliance"
  ON project_compliance FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_compliance.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project creators can manage compliance"
  ON project_compliance FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_compliance.project_id
      AND projects.creator_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
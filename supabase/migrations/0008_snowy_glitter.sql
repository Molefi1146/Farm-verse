/*
  # Project Management Schema

  1. New Tables
    - tasks: Project task management
    - collaboration_requests: Project collaboration applications
    - budget_items: Project budget tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for project members
*/

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  title text NOT NULL,
  description text,
  priority text NOT NULL,
  status text NOT NULL,
  due_date date NOT NULL,
  assignee_id uuid REFERENCES profiles(id),
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tasks_project_id_idx ON tasks(project_id);
CREATE INDEX IF NOT EXISTS tasks_assignee_id_idx ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks(status);

-- Collaboration requests table
CREATE TABLE IF NOT EXISTS collaboration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  type text NOT NULL,
  experience text NOT NULL,
  motivation text NOT NULL,
  commitment text NOT NULL,
  skills text[] NOT NULL,
  investment_amount numeric,
  status text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS collab_requests_project_id_idx ON collaboration_requests(project_id);
CREATE INDEX IF NOT EXISTS collab_requests_user_id_idx ON collaboration_requests(user_id);
CREATE INDEX IF NOT EXISTS collab_requests_status_idx ON collaboration_requests(status);

-- Budget items table
CREATE TABLE IF NOT EXISTS budget_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  amount numeric NOT NULL,
  frequency text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS budget_items_project_id_idx ON budget_items(project_id);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;

-- Tasks policies
CREATE POLICY "Project members can view tasks"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND (
        projects.creator_id = auth.uid() OR
        auth.uid() = tasks.assignee_id
      )
    )
  );

CREATE POLICY "Project creators can manage tasks"
  ON tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.creator_id = auth.uid()
    )
  );

-- Collaboration requests policies
CREATE POLICY "Users can view their own requests"
  ON collaboration_requests FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = collaboration_requests.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can create collaboration requests"
  ON collaboration_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Budget items policies
CREATE POLICY "Project members can view budget items"
  ON budget_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = budget_items.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project creators can manage budget"
  ON budget_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = budget_items.project_id
      AND projects.creator_id = auth.uid()
    )
  );
/*
  # Create projects and related tables

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `category` (text)
      - `start_date` (date)
      - `duration` (text)
      - `required_investment` (numeric)
      - `total_shares` (integer)
      - `share_price` (numeric)
      - `status` (enum: draft, active, completed, cancelled)
      - Various timestamps

    - `project_media`
      - For storing project images and videos
    
    - `project_updates`
      - For project progress updates

  2. Security
    - Enable RLS
    - Add policies for creators and investors
*/

-- Create enum for project status
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'cancelled');

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  start_date date NOT NULL,
  duration text NOT NULL,
  required_investment numeric NOT NULL,
  total_shares integer NOT NULL,
  share_price numeric NOT NULL,
  status project_status DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Create project media table
CREATE TABLE IF NOT EXISTS project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  title text,
  created_at timestamptz DEFAULT now()
);

-- Create project updates table
CREATE TABLE IF NOT EXISTS project_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  USING (status = 'active' OR auth.uid() = creator_id);

CREATE POLICY "Creators can manage their projects"
  ON projects
  FOR ALL
  USING (auth.uid() = creator_id);

CREATE POLICY "Project media is viewable by everyone"
  ON project_media
  FOR SELECT
  USING (true);

CREATE POLICY "Creators can manage project media"
  ON project_media
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_media.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project updates are viewable by everyone"
  ON project_updates
  FOR SELECT
  USING (true);

CREATE POLICY "Creators can manage project updates"
  ON project_updates
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_updates.project_id
      AND projects.creator_id = auth.uid()
    )
  );
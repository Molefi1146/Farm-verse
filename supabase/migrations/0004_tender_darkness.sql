/*
  # Create meetings and related tables

  1. New Tables
    - `meetings`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `title` (text)
      - `type` (enum)
      - Meeting details (date, time, duration)
      - Location details
      - Status

  2. Security
    - Enable RLS
    - Add policies for project creators and participants
*/

-- Create enum for meeting types
CREATE TYPE meeting_type AS ENUM ('investor', 'labor', 'resources', 'voting', 'emergency');

-- Create enum for meeting status
CREATE TYPE meeting_status AS ENUM ('upcoming', 'completed', 'cancelled');

-- Create enum for meeting location types
CREATE TYPE meeting_location_type AS ENUM ('online', 'onsite', 'other');

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  type meeting_type NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration text NOT NULL,
  location_type meeting_location_type NOT NULL,
  location_details text NOT NULL,
  agenda text,
  status meeting_status DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting participants table
CREATE TABLE IF NOT EXISTS meeting_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(meeting_id, user_id)
);

-- Enable RLS
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_participants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Meeting participants can view meetings"
  ON meetings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM meeting_participants
      WHERE meeting_participants.meeting_id = meetings.id
      AND meeting_participants.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = meetings.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project creators can manage meetings"
  ON meetings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = meetings.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Meeting participants can view participant list"
  ON meeting_participants
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM meeting_participants mp
      WHERE mp.meeting_id = meeting_participants.meeting_id
      AND mp.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN projects p ON p.id = m.project_id
      WHERE m.id = meeting_participants.meeting_id
      AND p.creator_id = auth.uid()
    )
  );

CREATE POLICY "Project creators can manage participants"
  ON meeting_participants
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN projects p ON p.id = m.project_id
      WHERE m.id = meeting_participants.meeting_id
      AND p.creator_id = auth.uid()
    )
  );
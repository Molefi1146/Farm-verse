/*
  # Resources Marketplace Schema

  1. New Tables
    - resources: Equipment and physical resources for rent
    - services: Professional services offered
    - bookings: Resource and service booking management

  2. Security
    - Enable RLS on all tables
    - Add policies for viewing and managing resources/services
    - Add policies for bookings

  3. Indexes
    - Add indexes for common query patterns
*/

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  type text NOT NULL,
  description text,
  rate text NOT NULL,
  location text NOT NULL,
  availability text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resources_owner_id_idx ON resources(owner_id);
CREATE INDEX IF NOT EXISTS resources_type_idx ON resources(type);
CREATE INDEX IF NOT EXISTS resources_location_idx ON resources(location);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  type text NOT NULL,
  description text,
  rate text NOT NULL,
  location text NOT NULL,
  availability text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS services_provider_id_idx ON services(provider_id);
CREATE INDEX IF NOT EXISTS services_type_idx ON services(type);
CREATE INDEX IF NOT EXISTS services_location_idx ON services(location);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  resource_id uuid REFERENCES resources(id),
  service_id uuid REFERENCES services(id),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (
    (resource_id IS NOT NULL AND service_id IS NULL) OR
    (resource_id IS NULL AND service_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_resource_id_idx ON bookings(resource_id);
CREATE INDEX IF NOT EXISTS bookings_service_id_idx ON bookings(service_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Resources policies
CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own resources"
  ON resources FOR ALL
  USING (auth.uid() = owner_id);

-- Services policies
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own services"
  ON services FOR ALL
  USING (auth.uid() = provider_id);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM resources WHERE resources.id = resource_id AND resources.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM services WHERE services.id = service_id AND services.provider_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);
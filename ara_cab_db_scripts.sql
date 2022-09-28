CREATE TYPE customer_types AS ENUM('registered','guest');
CREATE TYPE booking_modes AS ENUM('offline','online');
CREATE TYPE journey_status_types AS ENUM('cancelled','started', 'completed', 'other');
CREATE TYPE journey_scopes AS ENUM('local','outstation', 'ceremony');
CREATE TYPE payment_modes AS ENUM('offline','online');
CREATE TYPE payment_status AS ENUM('cancelled', 'pending', 'completed', 'refunded', 'failed');
CREATE TYPE user_types AS ENUM('driver', 'customer', 'agent');
CREATE TYPE vehicle_types AS ENUM('budget_sedan','premium_sedan', 'hatchback', 'budget_suv', 'premium_suv');

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  place_name VARCHAR(50) NOT NULL,
  latitude REAL,
  longitude REAL,
  is_discontinued BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  country_code VARCHAR(5) NOT NULL DEFAULT '+91',
  alternate_phone VARCHAR(15),
  email VARCHAR(50) NOT NULL,
  customer_type customer_types NOT NULL DEFAULT 'guest',
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (phone)
);

CREATE TABLE IF NOT EXISTS drivers (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) NOT NULL,
  dob DATE,
  licence_number VARCHAR(16),
  licence_valid_upto DATE,
  phone VARCHAR(10) NOT NULL,
  country_code VARCHAR(5) NOT NULL DEFAULT '+91',
  alternate_phone VARCHAR(15),
  email VARCHAR(50) NOT NULL,
  address VARCHAR(150),
  is_discontinued BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (phone)
);

CREATE TABLE IF NOT EXISTS vehicles (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  model_name VARCHAR(50) NOT NULL,
  model_description VARCHAR(50),
  type vehicle_types NOT NULL,
  licence_plate VARCHAR(15),
  owner_id INTEGER,
  is_commercial BOOLEAN DEFAULT false,
  is_discontinued BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (licence_plate),
  CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES drivers (id)
);

CREATE TABLE IF NOT EXISTS ratecharts (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  pick_up_location_id INTEGER NOT NULL,
  drop_location_id INTEGER,
  approx_distance_km SMALLINT,
  halt_charge_per_count NUMERIC(10,2),
  one_way_charge NUMERIC(10,2) NOT NULL,
  round_trip_charge NUMERIC(10,2),
  vehicle_id INTEGER NOT NULL,
  is_discontinued BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_pick_up_location_id FOREIGN KEY (pick_up_location_id) REFERENCES locations (id),
  CONSTRAINT fk_drop_location_id FOREIGN KEY (drop_location_id) REFERENCES locations (id),
  CONSTRAINT fk_vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  customer_id INTEGER NOT NULL,
  driver_id INTEGER,
  booking_time TIMESTAMPTZ NOT NULL,
  pick_up_time TIMESTAMPTZ NOT NULL,
  pick_up_location_id INTEGER NOT NULL,
  drop_location_id INTEGER,
  vehicle_id INTEGER,
  journey_scope journey_scopes NOT NULL,
  booking_mode booking_modes NOT NULL,
  is_round_trip BOOLEAN DEFAULT false,
  has_halt BOOLEAN,
  halt_count INTEGER,
  rate_chart_id INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers (id),
  CONSTRAINT fk_driver_id FOREIGN KEY (driver_id) REFERENCES drivers (id),
  CONSTRAINT fk_pick_up_location_id FOREIGN KEY (pick_up_location_id) REFERENCES locations (id),
  CONSTRAINT fk_drop_location_id FOREIGN KEY (drop_location_id) REFERENCES locations (id),
  CONSTRAINT fk_vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicles (id),
  CONSTRAINT fk_rate_chart_id FOREIGN KEY (rate_chart_id) REFERENCES ratecharts (id)
);

CREATE TABLE IF NOT EXISTS journeystatus (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  booking_id INTEGER NOT NULL,
  status_type journey_status_types NOT NULL,
  status_time TIMESTAMPTZ NOT NULL,
  user_id INTEGER DEFAULT 0,
  user_type user_types NOT NULL,
  status_description VARCHAR(50),
  PRIMARY KEY (id),
  CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings (id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  gateway_transaction_id VARCHAR(50),
  booking_id INTEGER,
  gst_percent NUMERIC(4,2),
  gst_in_rs NUMERIC(10,2),
  amount_without_tax NUMERIC(10, 2) NOT NULL,
  payment_time TIMESTAMPTZ NOT NULL,
  payment_mode payment_modes NOT NULL,
  payment_status payment_status NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings (id)
);
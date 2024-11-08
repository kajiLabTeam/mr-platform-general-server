CREATE USER mr_platform_contents WITH PASSWORD 'mr_platform_contents';
CREATE USER mr_platform_users WITH PASSWORD 'mr_platform_users';

\c mr_platform;

-- Enum Type for Contents
CREATE TYPE content_type AS ENUM (
    'html2d'
);

-- Enum Type for Text Type
CREATE TYPE text_type AS ENUM (
    'html',
    'markdown'
);

-- Enum Type for Scale
CREATE TYPE scale_type AS ENUM (
    'small',
    'medium',
    'large'
);

--Create Public Spaces Table
CREATE TABLE layer (
    id VARCHAR(36) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create Contents Table
CREATE TABLE contents (
    id VARCHAR(36) PRIMARY KEY,
    layer_id VARCHAR(36) REFERENCES layer(id),
    type content_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create Content Location Table
CREATE TABLE content_location (
    id VARCHAR(36) PRIMARY KEY,
    content_id VARCHAR(36) REFERENCES contents(id),
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    height DOUBLE PRECISION NOT NULL,
    scale scale_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create Content Location Log Table
CREATE TABLE log_content_location (
    id VARCHAR(36) PRIMARY KEY,
    content_location_id VARCHAR(36) REFERENCES content_location(id),
    content_id VARCHAR(36) REFERENCES contents(id),
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    height DOUBLE PRECISION NOT NULL,
    scale scale_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create html2d Table
CREATE TABLE html2d (
    id VARCHAR(36) PRIMARY KEY,
    content_id VARCHAR(36) REFERENCES contents(id),
    size_width integer NOT NULL,
    size_height integer NOT NULL,
    text_type text_type NOT NULL,
    text_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create html2d Log Table
CREATE TABLE log_html2d (
    id VARCHAR(36) PRIMARY KEY,
    html2d_id VARCHAR(36) REFERENCES html2d(id),
    content_id VARCHAR(36) REFERENCES contents(id),
    size_width integer NOT NULL,
    size_height integer NOT NULL,
    text_type text_type NOT NULL,
    text_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- mr_platform_contents にはすべての権限を付与
GRANT ALL PRIVILEGES ON TABLE layer TO mr_platform_contents;
GRANT ALL PRIVILEGES ON TABLE contents TO mr_platform_contents;
GRANT ALL PRIVILEGES ON TABLE content_location TO mr_platform_contents;
GRANT ALL PRIVILEGES ON TABLE log_content_location TO mr_platform_contents;
GRANT ALL PRIVILEGES ON TABLE html2d TO mr_platform_contents;
GRANT ALL PRIVILEGES ON TABLE log_html2d TO mr_platform_contents;

-- Create Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create User Contents Table
CREATE TABLE user_contents (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    created_id VARCHAR(36) NOT NULL,
    content_id VARCHAR(36) REFERENCES contents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

GRANT ALL PRIVILEGES ON TABLE users TO mr_platform_users;
GRANT ALL PRIVILEGES ON TABLE user_contents TO mr_platform_users;

-- データベースの作成
CREATE DATABASE mr_platform_contents;
CREATE DATABASE mr_platform_user;
CREATE DATABASE mr_platform_organization;
CREATE DATABASE mr_platform_building;

\c mr_platform_contents;

-- Enum Type for Contents
CREATE TYPE content_type AS ENUM (
    'html2d'
);

-- Enum Type for Text Type
CREATE TYPE text_type AS ENUM (
    'html',
    'markdown'
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

-- Create html2d Table
CREATE TABLE html2d (
    id VARCHAR(36) PRIMARY KEY,
    content_id VARCHAR(36) REFERENCES contents(id),
    location_x DOUBLE PRECISION NOT NULL,
    location_y DOUBLE PRECISION NOT NULL,
    location_z DOUBLE PRECISION NOT NULL,
    rotation_roll DOUBLE PRECISION NOT NULL,
    rotation_pitch DOUBLE PRECISION NOT NULL,
    rotation_yaw DOUBLE PRECISION NOT NULL,
    size_width VARCHAR(255) NOT NULL,
    size_height VARCHAR(255) NOT NULL,
    text_type text_type NOT NULL,
    text_url VARCHAR(255) NOT NULL,
    style_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

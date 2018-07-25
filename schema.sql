DROP DATABASE IF EXISTS airpnp;
CREATE DATABASE airpnp;

USE airpnp;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR (35) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE hosts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE locations (
  id INT NOT NULL AUTO_INCREMENT,
  zipcode INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  total_reviews INT DEFAULT 0,
  avg_rating FLOAT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT,
  host_id INT,
  location_id INT,
  review_id INT,
  weekly_views INT DEFAULT 0,
  min_stay INT DEFAULT 1,
  max_guests INT,
  fees FLOAT DEFAULT 0,
  rate FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (host_id) REFERENCES hosts(id),
  FOREIGN KEY (location_id) REFERENCES locations(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE booked_dates (
  id INT NOT NULL AUTO_INCREMENT,
  listing_id INT, 
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT,
  guest_id INT,
  booked_dates_id INT NOT NULL,
  total_adults INT NOT NULL,
  total_children INT DEFAULT 0,
  total_infants INT DEFAULT 0,
  total_charge FLOAT NOT NULL, 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (guest_id) REFERENCES users(id)
);
  
  
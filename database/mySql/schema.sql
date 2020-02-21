DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

USE calendar;

DROP TABLE IF EXISTS Reservations;
		
CREATE TABLE Reservations (
  id INT NOT NULL AUTO_INCREMENT,
  final_price_per_night INT NULL,
  adults_amout INT NULL,
  childs_amout INT NULL,
  infants_amout INT NULL,
  check_in_date DATE NULL,
  check_out_date DATE NULL,
  house_id INT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Houses;
		
CREATE TABLE Houses (
  id INT NOT NULL AUTO_INCREMENT,
  price_per_night INT,
  avg_ratings FLOAT,
  reviews_amount INT,
  max_adults INT NULL DEFAULT 1,
  max_childs INT NULL DEFAULT 0,
  max_infants INT NULL DEFAULT 0,
  cleaning_fee INT NULL,
  service_fee INT NULL,
  occupancy_taxes_fees INT NULL,
  min_allowed_nights INT NULL,
  PRIMARY KEY (id)
);

-- FOREIGN KEY (index_col_name)
--         REFERENCES table_name (index_col_name,...)

-- ALTER TABLE Houses ADD FOREIGN KEY (reservations) REFERENCES Reservations (id);
-- ALTER TABLE Reservations ADD FOREIGN KEY (house_id) REFERENCES Houses (id);

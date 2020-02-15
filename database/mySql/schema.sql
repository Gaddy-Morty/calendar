-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'House'
-- 
-- ---

DROP TABLE IF EXISTS `House`;
		
CREATE TABLE `House` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `price_per_night` INTEGER NULL DEFAULT NULL,
  `avg_ratings` DOUBLE NULL DEFAULT NULL,
  `reviews_amount` INTEGER NULL DEFAULT NULL,
  `reservations` INTEGER NULL DEFAULT NULL,
  `max_adults` INTEGER NULL DEFAULT 1,
  `max_childs` INTEGER NULL DEFAULT 0,
  `max_infants` INTEGER NULL DEFAULT 0,
  `cleaning_fee` INTEGER NULL DEFAULT NULL,
  `service_fee` INTEGER NULL DEFAULT NULL,
  `occupancy_taxes_fees` INTEGER NULL DEFAULT NULL,
  'min_allowed_nights' INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `reservations`)
);

-- ---
-- Table 'Reservations'
-- 
-- ---

DROP TABLE IF EXISTS `Reservations`;
		
CREATE TABLE `Reservations` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `final_price_per_night` INTEGER NULL DEFAULT NULL,
  `adults_amout` INTEGER NULL DEFAULT NULL,
  `childs_amout` INTEGER NULL DEFAULT NULL,
  `infants_amout` INTEGER NULL DEFAULT NULL,
  `check_in_date` DATE NULL DEFAULT NULL,
  `check_out_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Reservations` ADD FOREIGN KEY (id) REFERENCES `House` (`reservations`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `House` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Reservations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `House` (`id`,`price_per_night`,`avg_ratings`,`reviews_amount`,`reservations`,`max_adults`,`max_childs`,`max_infants`,`cleaning_fee`,`service_fee`,`occupancy_taxes_fees`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `Reservations` (`id`,`final_price_per_night`,`adults_amout`,`childs_amout`,`infants_amout`,`check_in_date`,`check_out_date`) VALUES
-- ('','','','','','','');
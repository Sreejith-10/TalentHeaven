CREATE DATABASE talent_heaven_recruiters;

CREATE TABLE `talent_heaven_recruiters`.`recruiters` (
    `recruiter_id` VARCHAR(20) NOT NULL,
    `recuiter_name` VARCHAR(100) NOT NULL,
    `recruiter_email` VARCHAR(200) NOT NULL,
    `recruiter_password` VARCHAR(300) NOT curr,
    `recruiter_created_at` DATE NULL,
    PRIMARY KEY (`recruiter_id`),
    UNIQUE INDEX `recruiter_id_UNIQUE` (`recruiter_id` ASC) VISIBLE,
    UNIQUE INDEX `recruiter_email_UNIQUE` (`recruiter_email` ASC) VISIBLE
);


CREATE TABLE `talent_heaven_recruiters`.`auth` (
  `session_id` VARCHAR(10) NOT NULL,
  `refresh_token` TEXT(200) NOT NULL,
  `user_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`session_id`));



  CREATE TABLE `talent_heaven_recruiters`.`companies` (
  `company_id` VARCHAR(30) NOT NULL,
  `company_name` VARCHAR(100) NOT NULL,
  `company_about` LONGTEXT NULL,
  `company_industry` VARCHAR(100),
  `company_category` VARCHAR(100),
  `company_location` MEDIUMTEXT NULL,
  `company_country` VARCHAR(100) NULL,
  `company_state` VARCHAR(100) NULL,
  `company_city` VARCHAR(100) NULL,
  `reference` LONGTEXT NULL,
  `phone_number` VARCHAR(20) NULL,
  PRIMARY KEY (`company_id`));


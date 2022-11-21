-- migrate:up
SET @count=0;

CREATE TABLE `apply` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer NOT NULL,
  `users_id` integer NOT NULL,
  `resume_id` integer NOT NULL,
  `apply_status_id` integer NOT NULL
);

CREATE TABLE `apply_status` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `apply_status_name` varchar(45) NOT NULL
);

CREATE TABLE `company` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `company_name` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `image` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `company_id` integer NOT NULL,
  `image` varchar(200) DEFAULT NULL
);

CREATE TABLE `company_tag` (
  `id` integer PRIMARY KEY  NOT NULL AUTO_INCREMENT,
  `tag_id` integer NOT NULL,
  `company_id` integer NOT NULL
);

CREATE TABLE `education` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `education_name` varchar(45) NOT NULL
);

CREATE TABLE `mypage` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer DEFAULT NULL,
  `apply_id` integer DEFAULT NULL
);

CREATE TABLE `position` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `position_name` varchar(100) NOT NULL
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `position_id` integer NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `career_min` integer NOT NULL,
  `career_max` integer NULL,
  `education_id` integer DEFAULT NULL,
  `due_date` varchar(20) DEFAULT NULL,
  `view` integer DEFAULT NULL,
  `company_id` integer DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `resume` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `career` varchar(100) NOT NULL,
  `resume_image` varchar(100) DEFAULT NULL,
  `introduce` varchar(500) DEFAULT NULL,
  `resume_position_id` integer NOT NULL,
  `resume_tech_stack_id` integer NOT NULL,
  `resume_education_id` integer NOT NULL,
  `resume_career_id` integer DEFAULT NULL
);


CREATE TABLE `resume_career` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `year_month` date NOT NULL,
  `resume_career_name` varchar(45) NOT NULL,
  `introduce` varchar(200) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `tech_stack_id` integer DEFAULT NULL,
  `result` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
);

CREATE TABLE `resume_education` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `year_month` date NOT NULL,
  `education_id` integer NOT NULL,
  `resume_education_name` varchar(45) NOT NULL,
  `department` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
);

CREATE TABLE `school` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `school_name` varchar(45) NOT NULL
);

CREATE TABLE `scrap` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer NOT NULL,
  `users_id` integer NOT NULL
);

CREATE TABLE `sns_info` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `sns_id` varchar(45) DEFAULT NULL,
  `sns_type` varchar(45) DEFAULT NULL,
  `sns_name` varchar(45) DEFAULT NULL,
  `sns_profile` varchar(45) DEFAULT NULL,
  `sns_connect_date` datetime DEFAULT NULL
);

CREATE TABLE `tag` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `tag_name` varchar(45) NOT NULL
);

CREATE TABLE `tech_stack` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `tech_stack_name` varchar(100) NOT NULL
);

CREATE TABLE `user_log` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `login_date` datetime DEFAULT NULL,
  `login_status` varchar(45) DEFAULT NULL
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(45) UNIQUE NOT NULL,
  `users_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birth` integer DEFAULT NULL,
  `phone_number` integer DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` integer DEFAULT NULL
);

CREATE TABLE `posts_tech_stack` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer DEFAULT NULL,
  `tech_stack_id` integer DEFAULT NULL
);

CREATE TABLE `resume_position` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `position_id` integer NOT NULL
);

CREATE TABLE `resume_tech_stack` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `tech_stack_id` integer NOT NULL
);


  ALTER TABLE `apply` ADD FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`);

  ALTER TABLE `apply` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `apply` ADD FOREIGN KEY (`resume_id`) REFERENCES `resume` (`id`);

  ALTER TABLE `apply` ADD FOREIGN KEY (`apply_status_id`) REFERENCES `apply_status` (`id`);

  ALTER TABLE `image` ADD FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

  ALTER TABLE `company_tag` ADD FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`);
  
  ALTER TABLE `company_tag` ADD FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

  ALTER TABLE `mypage` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `mypage` ADD FOREIGN KEY (`apply_id`) REFERENCES `apply` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`position_id`) REFERENCES `position` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`education_id`) REFERENCES `education` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `resume` ADD FOREIGN KEY (`resume_position_id`) REFERENCES `resume_position` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`resume_tech_stack_id`) REFERENCES `resume_tech_stack` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`resume_education_id`) REFERENCES `resume_education` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`resume_career_id`) REFERENCES `resume_career` (`id`);

  ALTER TABLE `resume_career` ADD FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

  ALTER TABLE `resume_education` ADD FOREIGN KEY (`education_id`) REFERENCES `education` (`id`);

  ALTER TABLE `scrap` ADD FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`);

  ALTER TABLE `scrap` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `sns_info` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `user_log` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `posts_tech_stack` ADD FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`);

  ALTER TABLE `posts_tech_stack` ADD FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

  ALTER TABLE `resume_position` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

  ALTER TABLE `resume_position` ADD FOREIGN KEY (`position_id`) REFERENCES `position` (`id`);

  ALTER TABLE `resume_tech_stack` ADD FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

  ALTER TABLE `resume_tech_stack` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;


-- migrate:down
SET foreign_key_checks = 0;

DROP TABLE `apply`;
DROP TABLE `apply_status`;
DROP TABLE `company`;
DROP TABLE `education`;
DROP TABLE `mypage`;
DROP TABLE `position`;
DROP TABLE `posts`;
DROP TABLE `resume`;
DROP TABLE `resume_career`;
DROP TABLE `resume_education`;
DROP TABLE `school`;
DROP TABLE `scrap`;
DROP TABLE `sns_info`;
DROP TABLE `tag`;
DROP TABLE `tech_stack`;
DROP TABLE `user_log`;
DROP TABLE `users`;
DROP TABLE `posts_tech_stack`;
DROP TABLE `resume_position`;
DROP TABLE `resume_tech_stack`;

SET foreign_key_checks = 1;


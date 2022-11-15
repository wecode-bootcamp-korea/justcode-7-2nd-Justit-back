-- migrate:up
-- migrate:up
CREATE TABLE `apply` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `post_id` integer NOT NULL,
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
  `tag_id` integer DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
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
  `tech_stack_id` integer NULL,
  `content` varchar(1000) NOT NULL,
  `career_min` varchar(50) NOT NULL,
  `career_max` varchar(50) NULL,
  `education_id` integer DEFAULT NULL,
  `due_date` varchar(20) DEFAULT NULL,
  `view` integer DEFAULT NULL,
  `company_id` integer DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `resume` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `career` varchar(100) NOT NULL,
  `resume_image` varchar(100) DEFAULT NULL,
  `introduce` varchar(500) DEFAULT NULL,
  `position_id` integer NOT NULL,
  `tech_stack_id` integer NOT NULL,
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
  `created_at` timestamp DEFAULT NULL,
  `updated_at` timestamp DEFAULT NULL
);

CREATE TABLE `resume_education` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `year_month` date NOT NULL,
  `school_id` integer NOT NULL,
  `resume_education_name` varchar(45) NOT NULL,
  `department` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL,
  `updated_at` timestamp DEFAULT NULL
);

CREATE TABLE `school` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `school_name` varchar(45) NOT NULL
);

CREATE TABLE `scrap` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `post_id` integer NOT NULL,
  `users_id` integer NOT NULL
);

CREATE TABLE `sns_info` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `sns_id` varchar(45) DEFAULT NULL,
  `sns_type` varchar(45) DEFAULT NULL,
  `sns_name` varchar(45) DEFAULT NULL,
  `sns_profile` varchar(45) DEFAULT NULL,
  `sns_connect_date` timestamp DEFAULT NULL
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
  `login_date` timestamp DEFAULT NULL,
  `login_status` varchar(45) DEFAULT NULL
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(45) UNIQUE NOT NULL,
  `users_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `birth` integer DEFAULT NULL,
  `phone_number` integer DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL,
  `updated_at` integer DEFAULT NULL
);

  ALTER TABLE `apply` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

  ALTER TABLE `apply` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

  ALTER TABLE `apply` ADD FOREIGN KEY (`resume_id`) REFERENCES `resume` (`id`);

  ALTER TABLE `apply` ADD FOREIGN KEY (`apply_status_id`) REFERENCES `apply_status` (`id`);

  ALTER TABLE `company` ADD FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`);

  ALTER TABLE `mypage` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

  ALTER TABLE `mypage` ADD FOREIGN KEY (`apply_id`) REFERENCES `apply` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`position_id`) REFERENCES `position` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`education_id`) REFERENCES `education` (`id`);

  ALTER TABLE `posts` ADD FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`position_id`) REFERENCES `position` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`resume_education_id`) REFERENCES `resume_education` (`id`);

  ALTER TABLE `resume` ADD FOREIGN KEY (`resume_career_id`) REFERENCES `resume_career` (`id`);

  ALTER TABLE `resume_career` ADD FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

  ALTER TABLE `resume_education` ADD FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

  ALTER TABLE `scrap` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

  ALTER TABLE `scrap` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

  ALTER TABLE `sns_info` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);

  ALTER TABLE `user_log` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);


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
SET foreign_key_checks = 1;


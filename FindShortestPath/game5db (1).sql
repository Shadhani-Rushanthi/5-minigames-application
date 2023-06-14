-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 30, 2023 at 03:01 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game5db`
--

-- --------------------------------------------------------

--
-- Table structure for table `total_points`
--

DROP TABLE IF EXISTS `total_points`;
CREATE TABLE IF NOT EXISTS `total_points` (
  `total_points_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `total_points` int(11) DEFAULT NULL,
  PRIMARY KEY (`total_points_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `total_points`
--

INSERT INTO `total_points` (`total_points_id`, `user_id`, `total_points`) VALUES
(1, 1, 0),
(2, 2, 0),
(3, 3, 0),
(4, 4, 0),
(5, 5, 30);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`) VALUES
(1, 'shadani'),
(2, 'shadani'),
(3, 'EASY TAP'),
(4, 'EASY TAP'),
(5, 'EASY TAP');

-- --------------------------------------------------------

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
CREATE TABLE IF NOT EXISTS `user_answers` (
  `user_answers_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_answers_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_answers`
--

INSERT INTO `user_answers` (`user_answers_id`, `user_id`, `city`, `distance`, `is_correct`) VALUES
(1, 1, 'City B', NULL, 1),
(2, 1, 'City C', NULL, 1),
(3, 1, 'City D', NULL, 1),
(4, 1, 'City E', NULL, 1),
(5, 2, 'City B', NULL, 1),
(6, 2, 'City C', NULL, 1),
(7, 2, 'City D', NULL, 1),
(8, 2, 'City E', NULL, 1),
(9, 3, 'City A', NULL, 1),
(10, 3, 'City B', NULL, 1),
(11, 3, 'City C', NULL, 1),
(12, 3, 'City E', NULL, 1),
(13, 4, 'City A', NULL, 1),
(14, 4, 'City B', NULL, 1),
(15, 4, 'City D', NULL, 1),
(16, 4, 'City E', NULL, 1),
(17, 5, 'City A', 15, 0),
(18, 5, 'City B', 14, 0),
(19, 5, 'City D', 70, 0),
(20, 5, 'City E', 34, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

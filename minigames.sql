-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 13, 2023 at 08:12 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minigames`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
CREATE TABLE IF NOT EXISTS `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`) VALUES
(1, ''),
(2, ''),
(3, 'Ashan'),
(4, 'KUSUMA'),
(5, 'kavi'),
(6, 'fdsaf');

-- --------------------------------------------------------

--
-- Table structure for table `player_answers`
--

DROP TABLE IF EXISTS `player_answers`;
CREATE TABLE IF NOT EXISTS `player_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_id` int NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `distance` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `player_id` (`player_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_answers`
--

INSERT INTO `player_answers` (`id`, `player_id`, `city_name`, `distance`) VALUES
(1, 3, 'City A', 66),
(2, 3, 'City C', 55),
(3, 3, 'City D', 88),
(4, 3, 'City E', 99),
(5, 4, 'City B', 15),
(6, 4, 'City C', 34),
(7, 4, 'City D', 24),
(8, 4, 'City E', 46),
(9, 5, 'City A', 68),
(10, 5, 'City B', 29),
(11, 5, 'City C', 72),
(12, 5, 'City E', 19);

-- --------------------------------------------------------

--
-- Table structure for table `player_score`
--

DROP TABLE IF EXISTS `player_score`;
CREATE TABLE IF NOT EXISTS `player_score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `score` int NOT NULL,
  `game` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `player_score`
--

INSERT INTO `player_score` (`id`, `userId`, `score`, `game`) VALUES
(1, 7, 10, 'EncodeDecode');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

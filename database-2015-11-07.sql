-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.0.17-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para m2000315_payment
DROP DATABASE IF EXISTS `m2000315_payment`;
CREATE DATABASE IF NOT EXISTS `m2000315_payment` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `m2000315_payment`;


-- Volcando estructura para tabla m2000315_payment.companies
DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `id_company` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_company`),
  KEY `fk_companies_users_idx` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla m2000315_payment.companies: ~9 rows (aproximadamente)
DELETE FROM `companies`;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` (`id_company`, `name`, `id_user`) VALUES
	(10, 'Pagos Fijos', 1),
	(11, 'Nevada', 1),
	(12, 'Musimundo', 1),
	(13, 'Garbarino', 1),
	(14, 'Visa Sant', 1),
	(15, 'Visa Sant 2', 1),
	(16, 'Naranja', 1),
	(17, 'Banco', 1),
	(18, 'Visa Citi', 1);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;


-- Volcando estructura para tabla m2000315_payment.owners
DROP TABLE IF EXISTS `owners`;
CREATE TABLE IF NOT EXISTS `owners` (
  `id_owner` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_owner`),
  KEY `fk_owners_users1_idx` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla m2000315_payment.owners: ~3 rows (aproximadamente)
DELETE FROM `owners`;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` (`id_owner`, `name`, `id_user`) VALUES
	(5, 'Natti', 1),
	(6, 'Papá', 1),
	(7, 'Martin', 1);
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;


-- Volcando estructura para tabla m2000315_payment.payments
DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id_payment` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `month` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `year` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `payment_number` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `id_product` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_payment`),
  KEY `fk_payments_products1_idx` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla m2000315_payment.payments: ~174 rows (aproximadamente)
DELETE FROM `payments`;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` (`id_payment`, `amount`, `month`, `year`, `payment_number`, `id_product`, `status`) VALUES
	(75, 221.75, '8', '2015', '1', 12, 2),
	(76, 221.75, '9', '2015', '2', 12, 2),
	(77, 221.75, '10', '2015', '3', 12, 2),
	(78, 50, '11', '2015', '4', 12, 1),
	(79, 261.75, '12', '2015', '5', 12, 1),
	(80, 733, '8', '2015', '1', 13, 2),
	(81, 733, '9', '2015', '2', 13, 2),
	(82, 2600, '10', '2015', '3', 13, 2),
	(83, 2600, '11', '2015', '4', 13, 1),
	(84, 2600, '12', '2015', '5', 13, 1),
	(85, 114, '8', '2015', '1', 14, 2),
	(86, 114, '9', '2015', '2', 14, 2),
	(87, 114, '10', '2015', '3', 14, 2),
	(88, 140, '11', '2015', '4', 14, 1),
	(89, 140, '12', '2015', '5', 14, 1),
	(90, 75, '8', '2015', '1', 15, 2),
	(91, 75, '9', '2015', '2', 15, 2),
	(92, 75, '10', '2015', '3', 15, 2),
	(93, 75, '11', '2015', '4', 15, 1),
	(94, 75, '12', '2015', '5', 15, 1),
	(95, 75, '1', '2016', '6', 15, 1),
	(96, 75, '2', '2016', '7', 15, 1),
	(97, 75, '3', '2016', '8', 15, 1),
	(98, 75, '4', '2016', '9', 15, 1),
	(99, 75, '5', '2016', '10', 15, 1),
	(100, 144.08, '8', '2015', '1', 16, 2),
	(101, 242.58, '8', '2015', '1', 17, 2),
	(102, 242.58, '9', '2015', '2', 17, 2),
	(103, 242.58, '10', '2015', '3', 17, 2),
	(104, 242.58, '11', '2015', '4', 17, 1),
	(105, 242.58, '12', '2015', '5', 17, 1),
	(106, 242.58, '1', '2016', '6', 17, 1),
	(107, 242.58, '2', '2016', '7', 17, 1),
	(108, 242.58, '3', '2016', '8', 17, 1),
	(109, 242.58, '4', '2016', '9', 17, 1),
	(110, 242.58, '5', '2016', '10', 17, 1),
	(111, 541, '8', '2015', '1', 18, 2),
	(112, 541, '9', '2015', '2', 18, 2),
	(113, 541, '10', '2015', '3', 18, 2),
	(114, 695, '8', '2015', '1', 19, 2),
	(115, 695, '9', '2015', '2', 19, 2),
	(116, 695, '10', '2015', '3', 19, 2),
	(117, 695, '11', '2015', '4', 19, 1),
	(118, 695, '12', '2015', '5', 19, 1),
	(119, 695, '1', '2016', '6', 19, 1),
	(120, 695, '2', '2016', '7', 19, 1),
	(121, 695, '3', '2016', '8', 19, 1),
	(122, 695, '4', '2016', '9', 19, 1),
	(123, 695, '5', '2016', '10', 19, 1),
	(124, 695, '6', '2016', '11', 19, 1),
	(125, 695, '7', '2016', '12', 19, 1),
	(126, 695, '8', '2016', '13', 19, 1),
	(127, 695, '9', '2016', '14', 19, 1),
	(128, 695, '10', '2016', '15', 19, 1),
	(129, 1411.58, '8', '2015', '1', 20, 2),
	(130, 1411.58, '9', '2015', '2', 20, 2),
	(131, 1411.58, '10', '2015', '3', 20, 2),
	(132, 1411.58, '11', '2015', '4', 20, 1),
	(133, 1411.58, '12', '2015', '5', 20, 1),
	(134, 1411.58, '1', '2016', '6', 20, 1),
	(135, 1411.58, '2', '2016', '7', 20, 1),
	(136, 1411.58, '3', '2016', '8', 20, 1),
	(137, 1411.58, '4', '2016', '9', 20, 1),
	(138, 366, '8', '2015', '1', 21, 2),
	(139, 366, '9', '2015', '2', 21, 2),
	(140, 366, '10', '2015', '3', 21, 2),
	(141, 366, '11', '2015', '4', 21, 4),
	(142, 366, '12', '2015', '5', 21, 4),
	(143, 366, '1', '2016', '6', 21, 4),
	(144, 366, '2', '2016', '7', 21, 4),
	(145, 366, '3', '2016', '8', 21, 4),
	(146, 366, '4', '2016', '9', 21, 4),
	(147, 366, '5', '2016', '10', 21, 4),
	(148, 670, '8', '2015', '1', 22, 2),
	(149, 670, '9', '2015', '2', 22, 2),
	(150, 670, '10', '2015', '3', 22, 2),
	(151, 670, '11', '2015', '4', 22, 4),
	(152, 670, '12', '2015', '5', 22, 4),
	(153, 670, '1', '2016', '6', 22, 4),
	(154, 670, '2', '2016', '7', 22, 4),
	(155, 670, '3', '2016', '8', 22, 4),
	(156, 670, '4', '2016', '9', 22, 4),
	(157, 670, '5', '2016', '10', 22, 4),
	(158, 105, '8', '2015', '1', 23, 2),
	(159, 105, '9', '2015', '2', 23, 2),
	(160, 105, '10', '2015', '3', 23, 2),
	(161, 105, '11', '2015', '4', 23, 1),
	(162, 105, '12', '2015', '5', 23, 1),
	(163, 105, '1', '2016', '6', 23, 1),
	(164, 105, '2', '2016', '7', 23, 1),
	(165, 105, '3', '2016', '8', 23, 1),
	(166, 105, '4', '2016', '9', 23, 1),
	(167, 105, '5', '2016', '10', 23, 1),
	(168, 437.5, '8', '2015', '1', 24, 2),
	(169, 437.5, '9', '2015', '2', 24, 2),
	(170, 437.5, '10', '2015', '3', 24, 2),
	(171, 437.5, '11', '2015', '4', 24, 1),
	(172, 437.5, '12', '2015', '5', 24, 1),
	(173, 437.5, '1', '2016', '6', 24, 1),
	(174, 437.5, '2', '2016', '7', 24, 1),
	(175, 437.5, '3', '2016', '8', 24, 1),
	(176, 437.5, '4', '2016', '9', 24, 1),
	(177, 437.5, '5', '2016', '10', 24, 1),
	(178, 416.66, '8', '2015', '1', 25, 2),
	(179, 416.66, '9', '2015', '2', 25, 2),
	(180, 416.66, '10', '2015', '3', 25, 2),
	(181, 416.66, '11', '2015', '4', 25, 1),
	(182, 416.66, '12', '2015', '5', 25, 1),
	(183, 416.66, '1', '2016', '6', 25, 1),
	(184, 416.66, '2', '2016', '7', 25, 1),
	(185, 416.66, '3', '2016', '8', 25, 1),
	(186, 416.66, '4', '2016', '9', 25, 1),
	(187, 416.66, '5', '2016', '10', 25, 1),
	(188, 275.14, '8', '2015', '1', 26, 2),
	(189, 275.14, '9', '2015', '2', 26, 2),
	(190, 275.14, '10', '2015', '3', 26, 2),
	(191, 275.14, '11', '2015', '4', 26, 1),
	(192, 275.14, '12', '2015', '5', 26, 1),
	(193, 400, '8', '2015', '1', 27, 2),
	(194, 108, '8', '2015', '1', 28, 2),
	(195, 108, '9', '2015', '2', 28, 2),
	(196, 895, '8', '2015', '1', 29, 2),
	(197, 895, '9', '2015', '2', 29, 2),
	(198, 966.66, '8', '2015', '1', 30, 2),
	(199, 966.66, '9', '2015', '2', 30, 2),
	(200, 966.66, '10', '2015', '3', 30, 2),
	(201, 966.66, '11', '2015', '4', 30, 1),
	(202, 966.66, '12', '2015', '5', 30, 1),
	(203, 966.66, '1', '2016', '6', 30, 1),
	(204, 966.66, '2', '2016', '7', 30, 1),
	(205, 966.66, '3', '2016', '8', 30, 1),
	(206, 966.66, '4', '2016', '9', 30, 1),
	(207, 966.66, '5', '2016', '10', 30, 1),
	(208, 254, '8', '2015', '1', 31, 2),
	(209, 254, '9', '2015', '2', 31, 2),
	(210, 1184.26, '8', '2015', '1', 32, 2),
	(211, 1135.99, '8', '2015', '1', 33, 2),
	(212, 207.24, '8', '2015', '1', 34, 2),
	(213, 186, '8', '2015', '1', 35, 1),
	(214, 186, '9', '2015', '2', 35, 2),
	(215, 186, '10', '2015', '3', 35, 2),
	(216, 186, '11', '2015', '4', 35, 1),
	(217, 1114, '7', '2015', '1', 36, 2),
	(218, 1114, '8', '2015', '2', 36, 4),
	(219, 1114, '9', '2015', '3', 36, 2),
	(220, 1114, '10', '2015', '4', 36, 2),
	(221, 1114, '11', '2015', '5', 36, 4),
	(222, 30, '8', '2015', '1', 37, 2),
	(223, 30, '9', '2015', '2', 37, 2),
	(224, 30, '10', '2015', '3', 37, 2),
	(225, 30, '11', '2015', '4', 37, 1),
	(226, 30, '12', '2015', '5', 37, 1),
	(227, 200, '8', '2015', '1', 38, 2),
	(228, 200, '9', '2015', '2', 38, 2),
	(229, 3000, '10', '2015', '3', 38, 2),
	(230, 2500, '11', '2015', '4', 38, 1),
	(231, 200, '12', '2015', '5', 38, 1),
	(232, 600, '9', '2015', '1', 39, 2),
	(233, 150, '9', '2015', '1', 40, 2),
	(234, 304, '9', '2015', '1', 41, 2),
	(235, 304, '10', '2015', '2', 41, 2),
	(236, 304, '11', '2015', '3', 41, 1),
	(237, 1000, '9', '2015', '1', 42, 2),
	(238, 1000, '10', '2015', '2', 42, 2),
	(239, 1000, '11', '2015', '3', 42, 4),
	(240, 1000, '12', '2015', '4', 42, 4),
	(241, 1000, '1', '2016', '5', 42, 4),
	(242, 1000, '2', '2016', '6', 42, 4),
	(243, 1000, '3', '2016', '7', 42, 4),
	(244, 1000, '4', '2016', '8', 42, 4),
	(245, 1000, '5', '2016', '9', 42, 4),
	(246, 1000, '6', '2016', '10', 42, 4),
	(247, 1000, '7', '2016', '11', 42, 4),
	(248, 1000, '8', '2016', '12', 42, 4);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;


-- Volcando estructura para tabla m2000315_payment.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `total_pays` int(11) NOT NULL,
  `id_owner` int(11) NOT NULL DEFAULT '0',
  `id_company` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_product`,`id_owner`),
  KEY `fk_products_owners1_idx` (`id_owner`),
  KEY `fk_products_companies1_idx` (`id_company`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla m2000315_payment.products: ~31 rows (aproximadamente)
DELETE FROM `products`;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id_product`, `description`, `total_pays`, `id_owner`, `id_company`, `id_user`) VALUES
	(12, 'Claro', 5, 0, 10, 1),
	(13, 'Alquiler', 5, 0, 10, 1),
	(14, 'Internet', 5, 0, 10, 1),
	(15, 'Uso', 10, 0, 11, 1),
	(16, 'Horno', 1, 0, 11, 1),
	(17, 'Parlantes', 10, 0, 11, 1),
	(18, 'NevaPlan', 3, 0, 11, 1),
	(19, 'Aire', 15, 0, 12, 1),
	(20, 'Celular', 9, 0, 13, 1),
	(21, 'Celular', 10, 5, 13, 1),
	(22, 'Celular Axel', 10, 6, 13, 1),
	(23, 'Gastos Adm', 10, 0, 13, 1),
	(24, 'Moto', 10, 0, 14, 1),
	(25, 'Moto2', 10, 0, 14, 1),
	(26, 'Moto G', 5, 0, 14, 1),
	(27, 'Entradas', 1, 0, 14, 1),
	(28, 'MercadoLibre', 2, 0, 14, 1),
	(29, 'Casco', 2, 0, 15, 1),
	(30, 'Moto', 10, 0, 16, 1),
	(31, 'Carne', 2, 0, 16, 1),
	(32, 'Zero', 1, 0, 16, 1),
	(33, 'Balde', 1, 0, 16, 1),
	(34, 'Zero', 1, 0, 16, 1),
	(35, 'Prestamo', 4, 0, 17, 1),
	(36, 'Prestamo', 5, 7, 17, 1),
	(37, 'Luz', 5, 0, 10, 1),
	(38, 'Gas', 5, 0, 10, 1),
	(39, 'Auriculares', 1, 0, 14, 1),
	(40, 'Entradas del cine', 1, 0, 14, 1),
	(41, 'Pasajes', 3, 0, 15, 1),
	(42, 'Play 4', 12, 5, 18, 1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;


-- Volcando estructura para tabla m2000315_payment.salaries
DROP TABLE IF EXISTS `salaries`;
CREATE TABLE IF NOT EXISTS `salaries` (
  `id_salary` int(11) NOT NULL AUTO_INCREMENT,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `amount` double NOT NULL,
  `description` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_salary`),
  KEY `fk_salaries_users1_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla m2000315_payment.salaries: ~0 rows (aproximadamente)
DELETE FROM `salaries`;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;


-- Volcando estructura para tabla m2000315_payment.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `id_session` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla m2000315_payment.users: ~1 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id_user`, `email`, `password`, `id_session`) VALUES
	(1, 'erwin.bader06@gmail.com', '221b54976d729a7650aa52baaa3cea1f', 'f9f1049c12b3e39bd7a862e05461a0a2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

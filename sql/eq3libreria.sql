-- MySQL dump 10.13  Distrib 5.7.15, for Win32 (AMD64)
--
-- Host: localhost    Database: eq3libreria
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- CREA LA BD

DROP DATABASE IF EXISTS eq3libreria;
CREATE DATABASE eq3libreria;
USE eq3libreria;

-- USUARIO Y PRIVILEGIOS

DROP USER IF EXISTS 'admin_libreria'@'localhost';
CREATE USER 'admin_libreria'@'localhost' IDENTIFIED BY 'admin_libreria';
GRANT CREATE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'admin_libreria'@'localhost';
FLUSH PRIVILEGES;

--
-- Table structure for table `autor`
--

DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autor` (
  `AUTOR_ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(25) NOT NULL,
  `APELLIDO_PATERNO` varchar(25) NOT NULL,
  `APELLIDO_MATERNO` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`AUTOR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autor`
--

LOCK TABLES `autor` WRITE;
/*!40000 ALTER TABLE `autor` DISABLE KEYS */;
INSERT INTO `autor` VALUES (1,'Gabriel','García','Márquez'),(2,'George','Orwell',NULL),(3,'Antoine','Saint','Exupéry'),(4,'Ray','Bradbury',NULL),(5,'William','Shakespeare',NULL),(6,'Michael','Ende',NULL);
/*!40000 ALTER TABLE `autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editorial`
--

DROP TABLE IF EXISTS `editorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `editorial` (
  `EDITORIAL_ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(25) NOT NULL,
  PRIMARY KEY (`EDITORIAL_ID`),
  UNIQUE KEY `NOMBRE` (`NOMBRE`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editorial`
--

LOCK TABLES `editorial` WRITE;
/*!40000 ALTER TABLE `editorial` DISABLE KEYS */;
INSERT INTO `editorial` VALUES (4,'Ballantine Books'),(3,'Gallimard'),(2,'Secker & Warburg'),(5,'Simon & Schuster'),(1,'Sudamericana'),(6,'Thienemann');
/*!40000 ALTER TABLE `editorial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `EVENTO_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(25) NOT NULL,
  `DESCRIPCION` varchar(500) NOT NULL,
  `RUTA_IMAGEN` varchar(150) NOT NULL,
  `FECHA_INICIO` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `FECHA_FIN` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`EVENTO_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Lectura con Álex Grijelmo','El reconocido autor Álex Grijelmo nos visita para leer y comentar su obra \"Cazador de Estilemas\". Habrá firma de libros, charla abierta con el autor y un espacio de preguntas para el público. ¡Una oportunidad increible para amantes de su novela!','images/eventos/cazador-estilemas.jpg','2025-06-07 06:00:00','2025-06-10 06:00:00'),(2,'Semana del Libro 2025','Celebra el Día del Libro con nosotros en una semana llena de actividades: talleres de escritura, lecturas en voz alta, cuentacuentos para niños, descuentos especiales y más. Una fiesta literaria para toda la familia.','images/eventos/dia-del-libro.jpg','2025-06-16 06:00:00','2025-06-22 06:00:00');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libro`
--

DROP TABLE IF EXISTS `libro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libro` (
  `LIBRO_ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `TITULO` varchar(50) NOT NULL,
  `SINOPSIS` varchar(100) NOT NULL,
  `GENERO` varchar(25) NOT NULL,
  `ANIO_PUBLICACION` int(4) NOT NULL,
  `PRECIO` decimal(5,2) NOT NULL,
  `CANTIDAD_DISPONIBLE` int(11) NOT NULL,
  `RUTA_IMAGEN` varchar(150) NOT NULL,
  `AUTOR_ID` smallint(6) NOT NULL,
  `EDITORIAL_ID` smallint(6) NOT NULL,
  PRIMARY KEY (`LIBRO_ID`),
  KEY `AUTOR_ID` (`AUTOR_ID`),
  KEY `EDITORIAL_ID` (`EDITORIAL_ID`),
  CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`AUTOR_ID`) REFERENCES `autor` (`AUTOR_ID`),
  CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`EDITORIAL_ID`) REFERENCES `editorial` (`EDITORIAL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libro`
--

LOCK TABLES `libro` WRITE;
/*!40000 ALTER TABLE `libro` DISABLE KEYS */;
INSERT INTO `libro` VALUES (1,'Cien años de soledad','La historia de varias generaciones de la familia Buendía en el mítico pueblo de Macondo.','Realismo mágico',1967,199.99,10,'images/libros/cien-anios-soledad.jpg',1,1),(2,'1984','Distopía donde el Gran Hermano controla la vida de todos los ciudadanos.','Distopía',1949,149.99,15,'images/libros/1984.jpg',2,2),(3,'El Principito','Un niño proveniente de otro planeta enseña valiosas lecciones sobre la vida y el amor.','Fábula',1943,99.99,12,'images/libros/prince.jpg',3,3),(4,'Fahrenheit 451','En un mundo donde los libros están prohibidos, un bombero cuestiona su rol.','Ciencia ficción',1953,129.99,8,'images/libros/fahrenheit.jpg',4,4),(5,'Hamlet','La tragedia de un príncipe atormentado por la traición y la venganza.','Tragedia',1603,119.99,5,'images/libros/hamlet.jpg',5,5),(6,'Momo','Una niña enfrenta a los hombres grises que roban el tiempo a las personas.','Fantasía',1973,109.99,7,'images/libros/momo.jpeg',6,6);
/*!40000 ALTER TABLE `libro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud_contacto`
--

DROP TABLE IF EXISTS `solicitud_contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solicitud_contacto` (
  `SOLICITUD_CONTACTO_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TIPO_SOLICITUD` char(1) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `FECHA` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MENSAJE` varchar(1000) NOT NULL,
  PRIMARY KEY (`SOLICITUD_CONTACTO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud_contacto`
--

LOCK TABLES `solicitud_contacto` WRITE;
/*!40000 ALTER TABLE `solicitud_contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud_contacto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-18 15:26:36
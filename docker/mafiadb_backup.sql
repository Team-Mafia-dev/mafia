-- MariaDB dump 10.19-11.3.2-MariaDB, for osx10.18 (arm64)
--
-- Host: localhost    Database: mafia
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ROOM_INFO`
--

DROP TABLE IF EXISTS `ROOM_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROOM_INFO` (
  `roomDate` date NOT NULL,
  `roomSeqno` int(4) NOT NULL,
  `roomName` varchar(14) DEFAULT '',
  `isDel` tinyint(1) DEFAULT 0,
  `isStarted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`roomDate`,`roomSeqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROOM_INFO`
--

LOCK TABLES `ROOM_INFO` WRITE;
/*!40000 ALTER TABLE `ROOM_INFO` DISABLE KEYS */;
INSERT INTO `ROOM_INFO` VALUES
('2024-09-12',1,NULL,0,0),
('2024-09-14',2,'테스트입니다.',0,0),
('2024-09-14',3,'테스트입니다.',0,0),
('2024-09-16',4,'테스트입니다.',0,0),
('2024-09-18',5,'테스트입니다.',1,0),
('2024-09-18',6,'가나다',0,1),
('2024-09-18',7,'테스트입니다.',0,0),
('2024-09-18',8,'테스트입니다.',0,0),
('2024-10-03',9,'테스트입니다.',0,0),
('2024-10-05',10,'sss',0,0),
('2024-10-05',11,'zc',0,0),
('2024-10-05',12,'ff',0,0),
('2024-10-05',13,'aaa',0,1),
('2024-10-07',14,'test',0,0),
('2024-10-09',15,'aa',0,0),
('2024-10-09',16,'dd',0,0);
/*!40000 ALTER TABLE `ROOM_INFO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_INFO`
--

DROP TABLE IF EXISTS `USER_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_INFO` (
  `userId` varchar(11) NOT NULL DEFAULT '',
  `userNm` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '',
  `pw` varchar(60) DEFAULT NULL,
  `winCnt` int(11) DEFAULT 0,
  `loseCnt` int(11) DEFAULT 0,
  `isDel` tinyint(1) DEFAULT 0,
  `profileImage` int(11) DEFAULT 0,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_INFO`
--

LOCK TABLES `USER_INFO` WRITE;
/*!40000 ALTER TABLE `USER_INFO` DISABLE KEYS */;
INSERT INTO `USER_INFO` VALUES
('asd','asd','$2a$10$AH7aGjDqRWlQd5eHV8EOneoDI2VoVoQBjJyBcVX6zKfcnGrxr3Rbu',3,5,0,0),
('qwe','qwe','$2a$10$6NZeM/a.q5Uz4v/RReDKAu7FdBb8D6QLJNHmCbs0SAPRg7pMHugRO',0,0,0,0),
('xxc','xxc','$2a$10$2lGLqBb29XSIMh14cFP8OusajnaEmgl/XrFAshWApf1yADtr.b9jC',0,0,0,0);
/*!40000 ALTER TABLE `USER_INFO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-20 13:09:38

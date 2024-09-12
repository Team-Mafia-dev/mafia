./gradlew build -x test			// 프로젝트 빌드

docker-compose up --build -d 		// 빌드하고 컨테이너 실행


docker-compose up			// 컨테이너 실행
Docker-compose stop			// 컨테이너 내리기



docker cp mafiadb_backup.sql database:/dumpfile.sql	// 덤프파일 생성

docker exec -it database mariadb -u root -p	// 컨테이너의 데이터베이스 접속
USE MAFIA;					// 마피아 데이터베이스 접속
SOURCE /dumpfile.sql;				// 덤프파일 넣기

DROP DATABASE mafia;				// 데이터베이스 삭제(선택)
CREATE DATABASE mafia;				// 데이터베이스 추가(선택)


docker save -o spring-app-image.tar mafia-backend:latest
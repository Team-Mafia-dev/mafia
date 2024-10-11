-- 여기는 문용환만
./gradlew build -x test			// 프로젝트 빌드 후 프론트의 docker 폴더로 빌드파일 이동
mysqldump -u root -p mafia > mafiadb_backup.sql
brew services stop mariadb 	// 마리아디비 정지 
brew services stop redis    // 레디스 정지

-- 희성이는 여기서부터
-- pull한 뒤 설정 됐으면 도커만 실행시키면 됨
docker-compose up

-- 새로 pull한 뒤 첫 설정.
-- 1. 터미널 실행
docker-compose stop			// 컨테이너 내리기
docker stop $(docker ps -aq) // 도커 컨테이너 모두 중지
docker rm $(docker ps -aq) // 도커 컨테이너 모두 삭제

-- 2. 프로젝트의 docker폴더로 이동
docker-compose up --build -d 		// 빌드하고 컨테이너 실행
docker-compose up			        // 컨테이너 실행

-- 3. 새로운 터미널 실행 후 프로젝트의 docker폴더로 이동
docker cp mafiadb_backup.sql database:/dumpfile.sql	// 덤프파일 생성
docker exec -it database mariadb -u root -p	// 컨테이너의 데이터베이스 접속, 비밀번호 : root
USE mafia;					// 마피아 데이터베이스 접속
SOURCE /dumpfile.sql;				// 덤프파일 넣기



// 여기는 생략
DROP DATABASE mafia;				// 데이터베이스 삭제(선택)
CREATE DATABASE mafia;				// 데이터베이스 추가(선택)
docker save -o spring-app-image.tar mafia-backend:latest
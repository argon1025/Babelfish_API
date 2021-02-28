# 베이스 이미지를 지정합니다
# 2021.02.17 기준 LTS 버전 입니다
FROM node:14

# 각명령어의 디렉토리 위치는 매번 초기화 되기 때문에
# 기본 디렉토리를 생성하고 해당 디렉토리로 위치를 고정 합니다
WORKDIR /usr/src/app

# 앱 소스 추가
COPY ./ ./

# 앱 의존성 설치
RUN npm install

#환경변수 설정
ENV NodeJS_PORT 8080
ENV MYSQL_HOST 0.0.0.0
ENV MYSQL_USER testuser
ENV MYSQL_PASSWORD testpassword
ENV MYSQL_DATABASE testdatabase

# 포트 오픈 - docker compose 에서 관리 하기때문에 비활성화
EXPOSE $NodeJS_PORT

# 서버를 실행합니다
CMD [ "node", "App.js" ]
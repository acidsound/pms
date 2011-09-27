ReadMe
======

주차장 관제 시스템

구조
----
* 관리장비에서 소켓 서버로 통신
* 소켓 서버와 웹서버 통신
* 웹에서 클라이언트에게 실시간 상황 중계

사용 모듈
--------
* [express](http://expressjs.com/) -- `npm install express`
* [socket.io](http://socket.io/) -- `npm install socket.io`
* [mongolian](https://github.com/marcello3d/node-mongolian) -- `npm install mongolian`
* [jsdom](https://github.com/tmpvar/jsdom) -- `npm install jsdom`
* [jquery](https://github.com/coolaj86/node-jquery) -- `npm install jquery`

설치 방법
--------
먼저 프로젝트를 가져온다.

    git clone git@github.com:acidsound/pms.git

혹은 download 후 압축 해제

완료후 local에 모듈 설치

    npm install express
    npm install socket.io
    npm install mongolian
    npm install jsdom
    npm install jquery

config.sample.json 을 rename 하거나 다른 이름으로 복사하기를 하여 config.json 을 만든다.

    cp config.sample.json config.json

connectionURL 부분을 수정 Database 설정

sessionKey에 session용 암호화 키를 넣고

port에 실제 서비스할 포트명을 넣는다.

실행
---
node server.js

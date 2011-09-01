ReadMe
======

주차장 관리 프로젝트


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

    git clone git@github.com:acidsound/pcc.git

혹은 download 후 압축 해제

완료후 local에 모듈 설치

    npm install express
    npm install socket.io
    npm install mongolian
    npm install jsdom
    npm install jquery

실행
---
node server.js

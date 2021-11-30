# Welcome to 42Checkin 👋
![Version](https://img.shields.io/badge/version-2.2.1-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/padawanR0k/42s_checkin_server/wiki)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## 🏠 [Homepage](https://cluster.42seoul.io/checkin)

<br/>

## 개요

- 해당 저장소는 사회적 거리두기가 시행됨에 따라, 42서울 본과정생들의 클러스터 입장인원수를 파악하기 위한 서비스의 클라이언트 프로젝트입니다. 서버 프로젝트는 해당 [저장소](https://bitbucket.org/42seoul/checkin_back/src/master)로 이동해주세요.
- 시설관리자를 위한 어드민 사이트의 클라이언트 프로젝트는 해당 [저장소](https://bitbucket.org/42seoul/admin_front/src/master/)에서 확인하실 수 있습니다.

<br/>


## 프로젝트 구조

```shell
src
 ├── admin
 ├── api
 ├── assets
 ├── checkin-admin
 ├── components
 ├── pages
 ├── redux
 ├── routes
 ├── styles
 ├── type
 └── utils
```

- admin: admin관련 폴더 (곧 옮겨질 예정)
- api: 서버와의 통신을 위한 api들을 모아논 폴더
- assets: 이미지, 아이콘등의 정적파일들을 모아논 폴더
- checkin-admin: admin관련 폴더 (곧 옮겨질 예정)
- components: 컴포넌트들을 모아논 폴더
- pages: 페이지들을모아논 폴더
- redux: 리덕스 모듈들을 모아논 폴더
- routes: 라우팅 관련 로직들을 모아논 폴더
- styles: style관련 css들을 모아논 폴더
- types: type들을 모아논 폴더
- utils: 개발을 편하게 돕는 hooks, utility 함수등을 모아논 폴더

<br/>

## 설치 및 실행 방법

1. 해당 저장소를 클론해주세요.

2. 의존성 패키지들을 설치합니다.

   ```shell
   yarn install
   ```

3. [서버 실행 가이드](https://github.com/innovationacademy-kr/42checkin-backend/blob/develop/README.md)를 참고하여 로컬환경에 서버를 실행합니다.

4. 환경에 맞게 .env파일을 작성합니다. [env파일 작성가이드](#Env-작성-가이드)

5. 코드를 실행합니다.

   ```shell
   yarn start
   ```

<br/>

## 사용스택

- [React v17](https://reactjs.org/)
- [Redux v4](https://redux.js.org/)
- [React-Router-Dom v5](https://v5.reactrouter.com/)
- [Typescript v4](https://www.typescriptlang.org/)

<br/>

## Lint, Prettier 셋업

- eslint-config-airbnb-typescript-prettier: ^4.2.0

<br/>

## 배포시 주의할 점

- Sentry를 사용할 시 Sentry가 Source map을 tracking할 수 있도록 'yarn release' script를 실행한 후 배포해야됩니다.

<br/>

## Git Branch

브랜치는 다음과 같이 운영됩니다.

- master: 실제 서비스에 배포되어 운영되고 있는 코드입니다.
- develop: 아직 서비스에 배포되지는 않았지만, 다음 버전에 배포될 코드입니다. 테스트서버에 배포되어 있는 코드입니다.
- feature: 개발 브랜치에서 뻗어나와 개발해야될 기능을 담은 코드입니다.

<br/>

## Wiki

- 위키: [https://github.com/padawanR0k/42s_checkin_server/wiki]

<br/>

## Reference

- 서버 프로젝트: [https://bitbucket.org/42seoul/checkin_back.git]

<br/>

## Env 작성 가이드

```shell
REACT_APP_API_URL=server url (ex. https://localhost:3000)

REACT_APP_VERSION=$npm_package_version

REACT_APP_AUTH_KEY=cookie key값 (ex.w_auth_local)

REACT_APP_COOKIE_DOMAIN=cookie domain 옵션 값 (ex. localhost)

REACT_APP_X_42CADET_AUTH=API key의 value (곧 삭제될 예정)

REACT_APP_SENTRY_DSN=SENTRY DSN
```

<br/>
<br/>
<br/>
<br/>

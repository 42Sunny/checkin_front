# Welcome to 42Checkin ๐

![Version](https://img.shields.io/badge/version-2.2.1-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/padawanR0k/42s_checkin_server/wiki)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ๐  [Homepage](https://cluster.42seoul.io/checkin)

<br/>

## ๊ฐ์

- ํด๋น ์ ์ฅ์๋ ์ฌํ์  ๊ฑฐ๋ฆฌ๋๊ธฐ๊ฐ ์ํ๋จ์ ๋ฐ๋ผ, 42์์ธ ๋ณธ๊ณผ์ ์๋ค์ ํด๋ฌ์คํฐ ์์ฅ์ธ์์๋ฅผ ํ์ํ๊ธฐ ์ํ ์๋น์ค์ ํด๋ผ์ด์ธํธ ํ๋ก์ ํธ์๋๋ค. ์๋ฒ ํ๋ก์ ํธ๋ ํด๋น [์ ์ฅ์](https://bitbucket.org/42seoul/checkin_back)๋ก ์ด๋ํด์ฃผ์ธ์.
- ์์ค๊ด๋ฆฌ์๋ฅผ ์ํ ์ด๋๋ฏผ ์ฌ์ดํธ์ ํด๋ผ์ด์ธํธ ํ๋ก์ ํธ๋ ํด๋น [์ ์ฅ์](https://bitbucket.org/42seoul/admin_front)์์ ํ์ธํ์ค ์ ์์ต๋๋ค.

<br/>

## ํ๋ก์ ํธ ๊ตฌ์กฐ

```shell
src
 โโโ admin
 โโโ api
 โโโ assets
 โโโ checkin-admin
 โโโ components
 โโโ pages
 โโโ redux
 โโโ routes
 โโโ styles
 โโโ type
 โโโ utils
```

- admin: admin๊ด๋ จ ํด๋ (๊ณง ์ฎ๊ฒจ์ง ์์ )
- api: ์๋ฒ์์ ํต์ ์ ์ํ api๋ค์ ๋ชจ์๋ผ ํด๋
- assets: ์ด๋ฏธ์ง, ์์ด์ฝ๋ฑ์ ์ ์ ํ์ผ๋ค์ ๋ชจ์๋ผ ํด๋
- checkin-admin: admin๊ด๋ จ ํด๋ (๊ณง ์ฎ๊ฒจ์ง ์์ )
- components: ์ปดํฌ๋ํธ๋ค์ ๋ชจ์๋ผ ํด๋
- pages: ํ์ด์ง๋ค์๋ชจ์๋ผ ํด๋
- redux: ๋ฆฌ๋์ค ๋ชจ๋๋ค์ ๋ชจ์๋ผ ํด๋
- routes: ๋ผ์ฐํ ๊ด๋ จ ๋ก์ง๋ค์ ๋ชจ์๋ผ ํด๋
- styles: style๊ด๋ จ css๋ค์ ๋ชจ์๋ผ ํด๋
- types: type๋ค์ ๋ชจ์๋ผ ํด๋
- utils: ๊ฐ๋ฐ์ ํธํ๊ฒ ๋๋ hooks, utility ํจ์๋ฑ์ ๋ชจ์๋ผ ํด๋

<br/>

## ์ค์น ๋ฐ ์คํ ๋ฐฉ๋ฒ

1. ํด๋น ์ ์ฅ์๋ฅผ ํด๋ก ํด์ฃผ์ธ์.

2. ์์กด์ฑ ํจํค์ง๋ค์ ์ค์นํฉ๋๋ค.

   ```shell
   yarn install
   ```

3. [์๋ฒ ์คํ ๊ฐ์ด๋](https://github.com/innovationacademy-kr/42checkin-backend/blob/develop/README.md)๋ฅผ ์ฐธ๊ณ ํ์ฌ ๋ก์ปฌํ๊ฒฝ์ ์๋ฒ๋ฅผ ์คํํฉ๋๋ค.

4. ํ๊ฒฝ์ ๋ง๊ฒ .envํ์ผ์ ์์ฑํฉ๋๋ค. [envํ์ผ ์์ฑ๊ฐ์ด๋](#Env-์์ฑ-๊ฐ์ด๋)

5. ์ฝ๋๋ฅผ ์คํํฉ๋๋ค.

   ```shell
   yarn start
   ```

<br/>

## ์ฌ์ฉ์คํ

- [React v17](https://reactjs.org/)
- [Redux v4](https://redux.js.org/)
- [React-Router-Dom v5](https://v5.reactrouter.com/)
- [Typescript v4](https://www.typescriptlang.org/)

<br/>

## Lint, Prettier ์์

- eslint-config-airbnb-typescript-prettier: ^4.2.0

<br/>

## ๋ฐฐํฌ์ ์ฃผ์ํ  ์ 

- Sentry๋ฅผ ์ฌ์ฉํ  ์ Sentry๊ฐ Source map์ trackingํ  ์ ์๋๋ก 'yarn release' script๋ฅผ ์คํํ ํ ๋ฐฐํฌํด์ผ๋ฉ๋๋ค.

<br/>

## Git Branch

๋ธ๋์น๋ ๋ค์๊ณผ ๊ฐ์ด ์ด์๋ฉ๋๋ค.

- master: ์ค์  ์๋น์ค์ ๋ฐฐํฌ๋์ด ์ด์๋๊ณ  ์๋ ์ฝ๋์๋๋ค.
- develop: ์์ง ์๋น์ค์ ๋ฐฐํฌ๋์ง๋ ์์์ง๋ง, ๋ค์ ๋ฒ์ ์ ๋ฐฐํฌ๋  ์ฝ๋์๋๋ค. ํ์คํธ์๋ฒ์ ๋ฐฐํฌ๋์ด ์๋ ์ฝ๋์๋๋ค.
- feature: ๊ฐ๋ฐ ๋ธ๋์น์์ ๋ป์ด๋์ ๊ฐ๋ฐํด์ผ๋  ๊ธฐ๋ฅ์ ๋ด์ ์ฝ๋์๋๋ค.

<br/>

## Wiki

- ์ํค: [https://github.com/padawanR0k/42s_checkin_server/wiki]

<br/>

## Reference

- ์ฝ๋ ๋ฆฌ๋ทฐ: ์ฝ๋ ๋ฆฌ๋ทฐ๋ ํด๋น [์ ์ฅ์](https://github.com/42Sunny/checkin_front)์์ ์งํํ๊ณ  ์์ต๋๋ค.
- ์๋ฒ ํ๋ก์ ํธ: [https://bitbucket.org/42seoul/checkin_back.git]

<br/>

## Env ์์ฑ ๊ฐ์ด๋

```shell
REACT_APP_API_URL=server url (ex. https://localhost:3000)

REACT_APP_VERSION=$npm_package_version

REACT_APP_AUTH_KEY=cookie key๊ฐ (ex.w_auth_local)

REACT_APP_COOKIE_DOMAIN=cookie domain ์ต์ ๊ฐ (ex. localhost)

REACT_APP_X_42CADET_AUTH=API key์ value (๊ณง ์ญ์ ๋  ์์ )

REACT_APP_SENTRY_DSN=SENTRY DSN
```

<br/>
<br/>
<br/>
<br/>

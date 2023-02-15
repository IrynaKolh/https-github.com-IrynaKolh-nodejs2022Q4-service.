# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```
```
git checkout dev-docker
```
## Containerization

images are taken from docker hub

```
docker compose up
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

Create User example

```
{
    "login": "1",
    "password": "4"
}
```

Update User Password example

```
{
    "oldPassword": "4",
    "newPassword": "5"
}
```

Create Artist example

```
{
  "name": "string",
  "grammy": false
}
```

Create Album example

```
{
 "name": "string",
  "year": 1985,
  "artistId": "COPY FROM CREATED ARTIST"  47f5e7f3-9b82-497c-8a89-b320c3c765ec
}
```

Create Track example

```
{
  "name": "string",
  "artistId": "COPY FROM CREATED ARTIST", 47f5e7f3-9b82-497c-8a89-b320c3c765ec
  "albumId": "COPY FROM CREATED ALBUM", c3927eff-18b5-485e-bb36-af927ec0ae37
  "duration": 3
}
```
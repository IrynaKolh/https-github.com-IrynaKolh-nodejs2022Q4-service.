# Home Library Service


## Downloading

```
git clone https://github.com/IrynaKolh/nodejs2022Q4-service.git
```
```
git checkout dev-error-auth
```

## Installing NPM modules

```
npm install
```

## Containerization

images are taken from docker hub

```
docker compose up --build
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


To run all test with authorization

```
npm run test:auth
```


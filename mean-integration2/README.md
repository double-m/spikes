# MEAN Integration Spike

A MongoDB-Express-Angular-Node exploration

## Log

### Server

Create Express application from scratch (without the `express` generator)

```
mkdir mean-integration
cd mean-integration
npm install --save express
```

### Database

```
npm install --save mongodb
```

### Development utilities: nodemon

```
npm install --save-dev nodemon
node_modules/nodemon/bin/nodemon.js -e js,html bin/www
```

### Server APIs: GET|POST /api/product

```
curl localhost:3000/api/products | jq  -r '.'
curl -XPOST localhost:3000/api/products -H 'Content-Type: application/json' --data '{"product": {"name": "Prodotto 1", "code": "p1"}}'
```

### Client

Create a scaffolding for the Angular client using `bower`

```
bower init
touch .bowerrc                  # and add { "directory": "client/public/components" } to it
bower install --save angular.js
bower install --save bootstrap
touch client/public/index.html  # entry point for the browser, mapped on /products by Express
touch client/public/app.js      # entry point for the Angular application
```

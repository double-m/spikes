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

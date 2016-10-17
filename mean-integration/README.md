# MEAN Integration Spike

A MongoDB-Express-Angular-Node exploration

## Log

### Server

Create Express scaffolding using `express` generator

```
mkdir mean-integration
cd mean-integration
express
```

### Client

Create a scaffolding for the Angular client using `bower`

```
bower init
touch .bowerrc                  # and add "directory": "client/public/components" to it
bower install --save angular.js
bower install --save bootstrap
touch client/public/index.html  # entry point for the browser, mapped on / by Express
touch client/public/app.js      # entry point for the Angular application
```

### Refactoring

Change structure so to separate client from server

```
tree
.
├── ...
├── client
│   └── public
├── ...
└── server
    ├── bin
    ├── public
    ├── routes
    └── views
```

### Authentication

Add authentication using `passport` with strategy `local` to protect the route `/admin`

```
npm install --save express-session
npm install --save passport
npm install --save passport-local
```

then add a `login.html` page and start from `server/app.js`.

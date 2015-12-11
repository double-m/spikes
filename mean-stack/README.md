# mean-demo

TODO-list application constructed togheter during the last lesson of the MEAN-course

```
git init

# yes, yes, yes...
npm init

# --save add na entry to the package.json using the semantic versioning (SemVer)
npm install express --save

# configured Express to serve static files: this will be needed to serve the Angular app

# install nodemon; use it with `node_modules/.bin/nodemon index.js`
npm install nodemon --save-dev

# in production we avoid devDependecies using 'npm install --production'

bower init
touch .bowerrc # and add "directory": "public/components" to it
bower install angular.js --save

npm i -S mongodb

# implementation of the CRUD

# api testing using supertest+mocha+chai (for e2e use selenium)
npm i -D supertest mocha chai

# write tests/api.spec.js
node_modules/.bin/mocha tests/api.spec.js
```

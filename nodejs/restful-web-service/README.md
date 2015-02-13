### RESTful web service

As suggested in the book *Node.js in Action*

Usage:

```
npm start
curl http://localhost:3000
curl -d 'item A' http://localhost:3000
curl -d 'item B' http://localhost:3000
curl -d 'item C' http://localhost:3000
curl http://localhost:3000
curl -XDELETE http://localhost:3000/1
curl http://localhost:3000
curl -XPUT http://localhost:3000/2
curl http://localhost:3000
```

During development:

```
forever -w start index.js
```

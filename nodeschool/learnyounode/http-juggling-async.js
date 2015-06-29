var http = require('http')
  , contentUrls = []
  , completed = 0;

function getUrlContent(index, url) {
  http.get(url, function(response) {
    var collection = '';
  
    response.setEncoding('utf-8');
    response.on('data', function(data) {
      collection += data;
    });
  
    response.on('end', function() {
      contentUrls[index] = collection;

      completed++;
      if (completed === 3) {
        contentUrls.forEach(function(contentUrl) {
          console.log(contentUrl);
        });
      }
    });
  
    response.on('error', console.error);
  });
}

for (var i = 0; i < 3; i++)
  getUrlContent(i, process.argv[i+2]);


var filterDir = require('./ls-dir-filter')
  , dir = process.argv[2]
  , ext = process.argv[3];

filterDir(dir, ext, function(err, filteredList) {
  if (err)
    return console.error('Error:', err);

  filteredList.forEach(function(file) {
    console.log(file);
  });
});


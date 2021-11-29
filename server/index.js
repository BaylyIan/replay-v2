var mysql = require('mysql');
var json_data = require('./songs/songs100.json');

var dbCon = mysql.createConnection({
  connectionLimit: 50,
  host: 'localhost',
  user: 'ian',
  password: 'NewApp#1',
  database: 'replay_music',

});

// console.log(json_data)

dbCon.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT IGNORE INTO songs (title, artist, image_url) VALUES ?";

//   var data = JSON.parse(json_data);
var data = json_data
//   console.log(data)

  const queryArr = [data.map((field) => [field.title, field.artist.name, field.preview])];

  dbCon.query(sql, queryArr, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

var mysql = require('mysql');
var json_data = require('./songs/songs98.json');

// var dbCon = mysql.createConnection({
//   connectionLimit: 50,
//   host:'us-cdbr-east-04.cleardb.com',
//   user:'bef506f32ffc26',
//   password:'afed3b4a',
//   database:'heroku_5fcfa8c353e006b'

// });

var dbCon = mysql.createConnection({
  connectionLimit: 50,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USERNAME || 'ian',
  password: process.env.MYSQL_PASSWORD || 'NewApp#1',
  database: process.env.MYSQL_DATABASE || 'replay_music'

});

// console.log(json_data)

dbCon.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT IGNORE INTO songs (title, artist, image_url) VALUES ?";

//   var data = JSON.parse(json_data);
var data = json_data
//   console.log(data)

  const queryArr = [data.map((field) => [field.title, field.artist.name, field.album.cover])];

  dbCon.query(sql, queryArr, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

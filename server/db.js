const mysql = require('mysql')
const bcrypt = require('bcryptjs')

// 2

const dbDetails = {
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USERNAME || 'ian',
  password: process.env.MYSQL_PASSWORD || 'NewApp#1',
  database: process.env.MYSQL_DATABASE || 'replay_music'
}
const connection = mysql.createConnection(dbDetails)

// const connection = mysql.createConnection("mysql://b37836ucuxmm23hu:wjd9ez3dhpo61q3b@xlf3ljx3beaucz9x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tb1rbcip564kgd16")

function createUser(name, email, password, callback) {
  const query = `
      INSERT INTO users (name, password, email)
      VALUES (?, ?, ?)
  `

  bcrypt.hash(password, 12, (error, hashed) => {
    if (error) {
      callback(error)
      return
    }
    const params = [name, hashed, email]
    // const params = [user.name, user.password, user.email]

    connection.query(query, params, function (error, result, fields) {
      callback(error, result.insertId)
      console.log(error, result)
    })
  })
}
exports.createUser = createUser

function getUser(email, password, callback) {
  const query = `
      SELECT id, name, email, password
      FROM users
      WHERE email = ?
  `
  const params = [email]

  connection.query(query, params, (error, results, fields) => {
    if (!results || results.length === 0) {
      callback(Error("Email is incorrect"))
      return
    }

    const user = results[0]

    console.log(user.password, password)
    bcrypt.compare(password, user.password, (error, same) => {
      console.log(error)
      if (error) {
        callback(error)
        return
      }

      if (!same) {
        callback(Error("Password is incorrect"))
        return
      }

      callback(null, user)
    })
  })
}
exports.getUser = getUser

//get all users
function getAllUsers(callback) {
  const query = `
  SELECT * FROM users
  WHERE id = ?
  `
  const params = [id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.getAllUsers = getAllUsers



//get user credentials by id
function userCredentials(id, callback) {
  const query = `
    SELECT * FROM users
    WHERE id = ?
    `
  const params = [id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.userCredentials = userCredentials






//add profile picture
//need to also insert user_id and authenticate it with jwt token

function addProfilePicture(image_url, id, callback) {
  const query = `
  UPDATE users 
  SET image_url = (?) 
  WHERE id = (?)
  `
  const params = [image_url, id]
  connection.query(query, params, (error, result) => {
    if (error) {
      callback(error)
      // updateProfilePicture()
      console.log("picture alreadye xsits")
      return
    }
    callback(null, result.insertId)
  })
}
exports.addProfilePicture = addProfilePicture

//add playlist pic
function addPlaylistPicture(image_url, id, callback) {
  const query = `
  UPDATE playlists 
  SET image_url = (?) 
  WHERE id = (?)
  `
  const params = [image_url, id]
  connection.query(query, params, (error, result) => {
    if (error) {
      callback(error)
      // updateProfilePicture()
      console.log("picture alreadye xsits")
      return
    }
    callback(null, result.insertId)
  })
}
exports.addPlaylistPicture = addPlaylistPicture



//get a profile picture
function getProfilePictures(callback) {
  const query = `
  SELECT * FROM users
  `
  connection.query(query, (error, results) => {
    if (error) {
      callback(error)
      return
    }
    callback(null, results)
  })
}
exports.getProfilePictures = getProfilePictures


//get a profile picture
function getPlaylistPicture(callback) {
  const query = `
  SELECT * FROM playlists
  `
  connection.query(query, (error, results) => {
    if (error) {
      callback(error)
      return
    }
    callback(null, results)
  })
}
exports.getPlaylistPicture = getPlaylistPicture


//prof pic by id
function getProfilePicturesId(id, callback) {
  const query = `
  SELECT * FROM users WHERE id = ?
  `
  const params = [id, callback]
  connection.query(query, params, (error, results) => {
    if (error) {
      callback(error)
      return
    }
    callback(null, results)
  })
}
exports.getProfilePicturesId = getProfilePicturesId


//update profile picture
// function updateProfilePicture(description, image_url, user_id, callback){

//   const query = `
//   UPDATE profile_pictures 
//   SET description = ?, image_url = ?
//   WHERE user_id = ? 
//   `
//   console.log("i ran")
//   const params = [description, image_url, user_id]
//   connection.query(query, params, (error, result) =>{
//     if(error) {
//       callback(error)
//       return
//     }
//     callback(null, result.insertId)
//   })
// }
// exports.updateProfilePicture = updateProfilePicture

//update playlist picture





// get all playlists
function allPlaylists(callback) {
  const query = `
      SELECT playlists.*, users.name AS username, users.email, users.image_url AS usersimg
      FROM playlists
      LEFT JOIN users ON playlists.user_id = users.id 
    `
  connection.query(query, null, (error, results, fields) => {
    callback(error, results)
  })
}
exports.allPlaylists = allPlaylists


// create a playlist
function createPlaylist(playlist, userId, callback) {
  // console.log(playlist, 'db')
  const query = `
      INSERT INTO playlists (name, image_url, description, user_id)
      VALUES (?, ?, ?, ?)
  `
  const params = [playlist.name, playlist.image, playlist.description, userId]
  connection.query(query, params, (error, result, fields) => {
    // console.log(result, 'red')
    callback(error, result.insertId)
    console.log(error, result)
  })
}
exports.createPlaylist = createPlaylist

function createTags(tag, callback) {
  const query = `
      INSERT INTO tags (text)
      VALUES (?)
  `
  const params = [tag]
  connection.query(query, params, (error, result, fields) => {
    // console.log(result.insertId, 'db')
    callback(error, result)
    console.log(error, result)
  })
}
exports.createTags = createTags

function createPlaylistTag(playlistId, tagId, callback) {
  const query = `
    INSERT INTO playlist_tags (playlist_id, tag_id)
    VALUES (?, ?)
`
const params = [playlistId, tagId]
connection.query(query, params, (error, result, fields) => {
  callback(error, result)
})
}
exports.createPlaylistTag = createPlaylistTag

//delete a playlist and all its contents
function deletePlaylist(playlist_id, callback) {
  const query = `
    DELETE FROM playlists
    WHERE id = ?
    `
  const params = [playlist_id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.deletePlaylist = deletePlaylist


//change a playlists name
function updatePlaylist(id, data, callback) {
  const query = `
    UPDATE playlists
    SET name = ?
    WHERE id = ?
    `
  const params = [data.name, id]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.updatePlaylist = updatePlaylist


//add a song to a playlist 
function addSong(playlist_id, song_id, callback) {
  const query = `
    INSERT INTO playlist_songs (playlist_id, song_id)
    VALUES (?, ?)
    `
  const params = [playlist_id, song_id]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result.insertId)
  })
}
exports.addSong = addSong


//get all songs 
function allSongs(callback) {
  const query = `
      SELECT * 
      FROM songs
    `
  connection.query(query, null, (error, results, fields) => {
    callback(error, results)
  })
}
exports.allSongs = allSongs


//get all songs inside of a playlist 
function getPlaylistSongs(playlist_id, callback) {
  const query = `
      SELECT * 
      FROM playlist_songs 
      INNER JOIN songs
      ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = ?
    `
  const params = [playlist_id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.getPlaylistSongs = getPlaylistSongs


//get a playlist by id 
function getPlaylist(user_id, callback) {
  const query = `
    SELECT * FROM playlists
    WHERE user_id = ?
  `
  const params = [user_id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.getPlaylist = getPlaylist

//these two functions dont work when they both exsits, not sure if we need ^ but def need v

//get all of a users playlists
function getUserPlaylists(user_id, callback) {
  const query = `
    SELECT * FROM playlists
    WHERE user_id = ?
  `
  const params = [user_id]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.getUserPlaylists = getUserPlaylists

//get all playlists that have been liked
function allLikedPlaylists(callback) {
  const query = `
  SELECT * FROM liked
  `

  connection.query(query, null, (error, result, fields) => {
    callback(error, result)
  })
}
exports.allLikedPlaylists = allLikedPlaylists

//user likes a playlist
function likePlaylist(playlistId, userId, callback) {
  const query = `
    INSERT INTO liked (playlist_id, user_id)
    VALUES (?,?)
  `
  const params = [playlistId, userId]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.likePlaylist = likePlaylist

//get all of a users liked playlists
function userLikedPlaylists(user_id, callback) {
  // const query = `
  //   SELECT * FROM liked 
  //   WHERE user_id = ?
  // `

  const query =
    `
    SELECT playlists.*
    FROM playlists
    INNER JOIN liked ON liked.playlist_id = playlists.id
    WHERE liked.user_id = ?
  `
  //LEFT JOIN playlist ON playlist.id = liked.playlist_id
  //WHERE playlist.user_id = your token's userid

  // SELECT playlists.*, users.name AS username, users.email, users.image_url AS usersimg
  // FROM playlists
  // LEFT JOIN users ON playlists.user_id = users.id 
  const params = [user_id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.userLikedPlaylists = userLikedPlaylists

//count number of likes on a playlist
function countPlaylistLikes(playlist_id, callback) {
  const query = `
  SELECT COUNT(*) FROM liked 
  WHERE playlist_id = ?
  `
  const params = [playlist_id, callback]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.countPlaylistLikes = countPlaylistLikes


//get user id from the playlist the user is currently viewing, so they can navigate to that users profile
function getPlaylistCreator(playlist_id, callback) {
  const query = `
    SELECT user_id
    FROM playlists
    WHERE id = ?
  `
  const params = [playlist_id]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.getPlaylistCreator = getPlaylistCreator


//get the playlist name and image from the playlist_id that the user is viewing

function getPlaylistInfo(playlist_id, callback) {
  const query = `
    SELECT *
    FROM playlists
    WHERE id = ?;
  `
  const params = [playlist_id]
  connection.query(query, params, function (error, result, fields) {
    callback(error, result)
  })
}
exports.getPlaylistInfo = getPlaylistInfo
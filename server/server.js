const express = require('express')
const database = require('./db.js')
const jwt = require('./jwt')

const fs = require('fs')
const path = require('path')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
// const s3 = require('./s3')

const app = express()

const multer = require('multer')
const uploadPlaylist = multer({ dest: 'uploads/playlist' })
const uploadProfile = multer({ dest: 'uploads/profile' })

app.use(express.json())
app.use(express.static('build'))

app.use('/', function (req, res, next) {
  var origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

const { uploadPlaylistPicture, getPlaylistFileStream } = require('./s3')


// const s3 = require('./s3')

//get an image from s3
// app.get('/images/:filename', (req, res)=>{
//   const filename = req.params.filename
//   const readStream = s3.getFileStream(filename)
//   readStream.pipe(res)
// })


//get the profile picture by user_id
// app.get('/api/users', jwt.authorize, (req, res)=>{
//   // const id = req.params.id
//   const id = req.user.userId
//   console.log(id)
//   database.getProfilePicturesId(id, (error, pictures)=>{
//     if(error){
//       res.send({error: error.message})
//       console.log("fail back")
//       return
//     }
//     res.send({pictures})
//   })
// })

//get playlist picture
// app.get('api/get_playlist_image,', (req, res) => {
//   const id = req.body.playlistId
//   console.log(id)
//   database.getPlaylistPicture(id, (error, covers) => {
//     if (error) {
//       res.send({ error: error.message })
//       return
//     }
//     res.send({ covers })
//   })
// })

//USER AUTH ----------------------------------------------------------------

// create a user
app.post('/api/create_user', (req, res) => {
  const { name, email, password } = req.body
  database.createUser(name, email, password, (error, userId) => {
    if (error) {
      res.send({ error: error.message })
      return
    }
    // res.send({ token })
    const token = jwt.generateToken({ userId: userId, name: name, email: email })
    res.send({ userId, name, email, token })
    // console.log({ userId, name, email, token }, 'here')
  })
})


// log in a user
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body
  database.getUser(email, password, (error, user) => {
    console.log(error)
    if (error) {
      res.send({ error: error })
      console.log(error, 'here backend')
      return
    }
    const token = jwt.generateToken({ userId: user.id, name: user.name, email: user.email })
    // res.send({ userId: user.id, name: user.name, email: user.email })
    res.send({ token: token, user:user })
  })
})

//get users profile 
app.get('/api/profile', jwt.authorize, (req, res) => {
  console.log(req.user, 'ehehrherhre')
  //token's user id
  const id = req.user.userId
  database.userCredentials(id, (error, result) => {
    if (error) {
      res.send({ error: error.message })
      console.log('fart')
      return
    }
    res.send({ result })
  })
  
})


//CREATE PLAYLIST ------------------------------

//upload playlist picture w/ S3
//bucket name replayv2-playlist-images
//user replayv2-user
app.post('/playlistImage', uploadPlaylist.single('image'), async (req, res) => {
  const file = req.file
  const result = await uploadPlaylistPicture(file)
  await unlinkFile(file.path)
  res.send({ imagePath: `/playlistImage/${result.key}` })
})

//get playlist Picture from s3
app.get('/playlistImage/:key', (req, res) => {
  const key = req.params.key
  const readStream = getPlaylistFileStream(key)
  readStream.pipe(res)
})

//create new playlist
app.post('/api/create_playlist', jwt.authorize, (req, res) => {
  const userId = req.user.userId
  const playlist = req.body

  //create playlist in db
  database.createPlaylist(playlist, userId, (error, playlistId) => {
    // console.log(playlistId, 'playlist id')
    res.send({ playlistId })

    //loop through tags, add each one to db
    for (let i = 0; i < playlist.tags.length; i++) {
      database.createTags(playlist.tags[i].text, (error, result) => {
        // console.log(result.insertId, playlistId, 'both')
        const tagId = result.insertId

        //create a tag/playlist relationship
        database.createPlaylistTag(playlistId, tagId, (error, result) => {
        })
      })
    }
  })
})

//GET PLAYLISTS ----------------------------------------------------------------

// get all playlists
app.get('/api/playlists', (req, res) => {
  database.allPlaylists((error, playlists) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ playlists })
  })
})

//get playlist tags
app.get('/api/playlist_tags/:id', (req, res) => {
  const playlist_id = req.params.id
  database.getPlaylistTags(playlist_id, (error, tags) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ tags })
  })
})

//get playlist by id
app.get('/api/playlist_by_id/:id', (req, res) => {
  const user_id = req.params.id
  console.log(req.params, 'user_id')
  database.getPlaylistById(user_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})

//LIKES ----------------------------------------------------------------

//user liked a playlist
app.post('/api/like_playlist', jwt.authorize, (req, res) => {
  const playlistId = req.body.playlist_id //playlist id
  const userId = req.user.userId
  console.log(playlistId, userId, 'req like')

  database.likePlaylist(playlistId, userId, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    // playlist.id = playlist_id
    console.log(result, 'back like')
    res.send({ result })
  })
})

//user unliked a playlists
app.post('/api/unlike_playlist', jwt.authorize, (req, res) => {
  const playlist_id = req.body.playlist_id
  const user_id = req.user.userId
  console.log(playlist_id, user_id, 'req unlike')
  database.unlikePlaylist(playlist_id, user_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    console.log(result, 'unlike back')
    res.send({ result })
  })
})

//get all of a users liked playlists
app.get('/api/users_liked_playlists', jwt.authorize, (req, res) => {
  const user_id = req.user.userId
  database.userLikedPlaylists(user_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})

//count how many likes a users playlists have gotten
app.get('/api/count_user_likes/:id', (req, res) => {
  const user_id = req.params.id
  console.log(req.params.id, 'count')
  database.countUserLikes(user_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})

// app.get('/api/playlist_songs/:id', (req, res) => {
//   const playlist_id = req.params.id
//   database.getPlaylistSongs(playlist_id, (error, result) => {
//     if (error) {
//       res.send({ error })
//       return
//     }
//     res.send({ result })
//   })
// })



//need token as const id when that user is uploading an avatar
//user posts a profile picture, saves to s3 and database
// app.post('/api/update_avatar/', jwt.authorize, upload.single('image'),  async (req, res)=>{
//   const { filename, path } = req.file
//   // const description = req.body.description

//   await s3.uploadFile(req.file)

//   //this user_id must be passed in from front end token to work
//   // const id = 2
//   const id = req.user.userId
//   const image_url = `/images/${filename}`
//   database.addProfilePicture(image_url, id, (error, insertId)=>{
//     if (error){
//       console.log("fail back")

//       res.send({error: error.message})
//       return
//     }
//     res.send({
//       id: insertId,
//       image_url,
//       id
//     })
//   })
// })

//add picture to playlist
// app.post('/api/add_playlist_picture/', upload.single('image'),  async (req, res)=>{
//   const { filename, path } = req.file
//   // const description = req.body.description

//   await s3.uploadFile(req.file)

//   //this user_id must be passed in from front end token to work
//   // const id = 2
//   const id = req.params.id
//   const image_url = `/images/${filename}`
//   database.addPlaylistPicture(image_url, id, (error, insertId)=>{
//     if (error){
//       console.log("fail back")

//       res.send({error: error.message})
//       return
//     }
//     res.send({
//       id: insertId,
//       image_url,
//       id
//     })
//   })
// })

//any other routes that get called get forwarded to index.htnl so router can handle it
// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, 'build/profile.js'))
// })











//delete a playlst and all its contents
app.delete('/api/delete_playlist/:id', (req, res) => {
  const id = req.params.id
  database.deletePlaylist(id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})

// update a playlist name
app.use(express.json())
app.patch('/api/update_playlist_name/:id', (req, res) => {
  const id = req.params.id
  const playlist_data = req.body
  database.updatePlaylist(id, playlist_data, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})

// add a song to a playlist 
app.post('/api/add_song', (req, res) => {
  const playlist_id = req.body.playlist_id //playlist id
  const song_id = req.body.song_id
  database.addSong(playlist_id, song_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    // song.id = song_id
    console.log("song inserted")
    res.send({ result })
  })
})

//get all songs that have been added to any playlist
app.get('/api/all_songs', (req, res) => {
  database.allSongs((error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})



//get all songs for a specific playlist 
app.use(express.json())
app.get('/api/playlist_songs/:id', (req, res) => {
  const playlist_id = req.params.id
  database.getPlaylistSongs(playlist_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})



//get all songs that include user input

//get a playlist by playlist_id
// app.use(express.json())
// app.get('/api/playlists_by_id/:id', (req, res) => {
//     const id = req.params.id
//     database.getPlaylist(id, (error, result) => {
//       if (error) {
//         res.send({error})
//         return
//       }
//       res.send({result})
//     })
// })


//get all of a users playlists
app.use(express.json())
app.get('/api/user_playlists', jwt.authorize, (req, res) => {
  const user_id = req.user.userId
  console.log(user_id)
  database.getPlaylist(user_id, (error, results) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ results })
  })
})


//get all liked playlists
app.get('/api/liked_playlists', (req, res) => {
  database.allLikedPlaylists((error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})





// count number of likes on a playlist
app.get('/api/count_playlist_likes', (req, res) => {
  const playlist_id = req.body.id
  database.countPlaylistLikes(playlist_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })

})

//get user id from the playlist the user is currently viewing, so they can navigate to that users profile
//we only need the playlist_id to do this
app.get('/api/playlist_creator', (req, res) => {
  const playlist_id = req.params.id
  database.getPlaylistCreator(playlist_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
    console.log({ result })
  })
})


//get the playlist name and image from the playlist_id that the user is viewing
app.get('/api/playlist_info/:id', (req, res) => {
  const playlist_id = req.params.id
  database.getPlaylistInfo(playlist_id, (error, result) => {
    if (error) {
      res.send({ error })
      return
    }
    res.send({ result })
  })
})

const port = process.env.PORT || 4200
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// app.listen(process.env.PORT || 4200, () => {
//   console.log("The server is listening on port 4200")
// })
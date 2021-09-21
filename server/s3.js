require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const playlistBucket = process.env.AWS_PLAYLIST_BUCKET_NAME
const profileBucket = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// // uploads a playlist file to s3
function uploadPlaylistPicture(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: playlistBucket,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadPlaylistPicture = uploadPlaylistPicture


// // downloads a file from s3
function getPlaylistFileStream(fileKey) {
  console.log(fileKey, 'fileKey')
  const downloadParams = {
    Key: fileKey,
    Bucket: playlistBucket
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getPlaylistFileStream = getPlaylistFileStream
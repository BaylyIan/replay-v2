DROP DATABASE IF EXISTS replay_music;
CREATE DATABASE replay_music;

DROP USER IF EXISTS replay_music_user@localhost;

-- CREATE USER 'replay_music_user'@'https://replay-music-app.herokuapp.com/' IDENTIFIED WITH mysql_native_password BY 'NewApp#1';
-- GRANT ALL PRIVILEGES ON replay_music.* TO 'replay_music_user'@'https://replay-music-app.herokuapp.com/';

CREATE USER 'ian'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NewApp#1';
GRANT ALL PRIVILEGES ON replay_music.* TO 'ian'@'localhost';


USE replay_music;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- user name
    `password` TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    release_date VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- artist name
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE playlists (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- name of playlist 
    image_url VARCHAR(255), -- playlist picture user adds to db
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- time playlist was created
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) -- playlist creator id
);

CREATE TABLE playlist_songs (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- time song was added
    playlist_id INTEGER NOT NULL,
    song_id INTEGER NOT NULL,
    FOREIGN KEY(playlist_id) REFERENCES playlists(id),  -- id # of playlist
    FOREIGN KEY (song_id) REFERENCES songs(id) 
);

CREATE TABLE liked (
    id INTEGER PRIMARY KEY  AUTO_INCREMENT, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- time playlist was liked
    playlist_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(playlist_id) REFERENCES playlists(id), -- playlist id that was liked
    FOREIGN KEY(user_id) REFERENCES users(id) -- user id that liked playlist
);
CREATE TABLE profile_pictures (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255),
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW() -- time profile pic was uploaded
);
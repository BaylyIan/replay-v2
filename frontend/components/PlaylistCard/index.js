import React from 'react';
import PropTypes from 'prop-types';
import { Theme } from '../../styles/theme'


import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { Container, Header, Avatar, Cover, TitleCont, PlaylistButton } from './style'

const PlaylistCard = ({ toggle, username, userPic, playlistPic, playlistName, liked, onLike}) => {
  return (
    <Container toggle={toggle}>
      <Header>
        <Avatar>
          <img src={userPic} />
        </Avatar>
        <h2>{username}</h2>
      </Header>
      <Cover>
        <img src={playlistPic} />
      </Cover>
      <TitleCont>
        <h1>{playlistName}</h1>
        {liked ? <AiFillHeart
          size={42}
          color={'red'}
          onClick={onLike}
       
        /> : <AiOutlineHeart
          size={42}
          color={`${Theme.colors.white}`}
          onClick={onLike}
        />}
      </TitleCont>
      <PlaylistButton>View Playlist</PlaylistButton>
    </Container>
  );
}

PlaylistCard.defaultProps = {
  username: 'user',
  userPic: '/Icons/default_profile.png',
  playlistPic: '/Icons/default_playlist.png',
  playlistName: 'playlist name',
  onLike:()=>{}
}

PlaylistCard.propTypes = {

}

export default PlaylistCard;
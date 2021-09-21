import React from 'react';
import PropTypes from 'prop-types';
import { Theme } from '../../styles/theme'


import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { Container, Header, Avatar, Cover, TitleCont, TagWrap } from './style'
import TagArea from '../TagArea';

const PlaylistCard = ({ toggle, username, user_pic, playlist_pic, playlist_name, liked, onLike, tags, showClose}) => {
  return (
    <Container toggle={toggle}>
      <Header>
        <Avatar>
          <img src={user_pic} />
        </Avatar>
        <h2>{username}</h2>
      </Header>
      <Cover>
        <img src={playlist_pic} />
      </Cover>
      <TitleCont>
        <h1>{playlist_name}</h1>
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
      <TagWrap>
          <TagArea 
            arr={tags}
            showClose={showClose}
          />
      </TagWrap>
    </Container>
  );
}

PlaylistCard.defaultProps = {
  username: 'user',
  user_pic: '/Icons/default_profile.png',
  playlist_pic: '/Icons/default_playlist.png',
  playlist_name: 'playlist name',
  onLike:()=>{}
}

PlaylistCard.propTypes = {

}

export default PlaylistCard;
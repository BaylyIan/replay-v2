import React from 'react';
import PropTypes from 'prop-types';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Theme } from '../../styles/theme'



import { Container, Cover, Info } from './style'

const PlaylistTab = ({ user_pic, title, showLike, liked, onLike, username }) => {
    return (
        <Container>
            <Cover>
                <img src={user_pic} />
            </Cover>
            <Info>
                <h1>{title}</h1>
                {showLike && liked ? <AiFillHeart
                    size={36}
                    color={'#CA3433'}
                    onClick={onLike} /> :
                showLike && !liked ? <AiOutlineHeart
                    size={36}
                    color={`${Theme.colors.white}`}
                    onClick={onLike} /> : null}
            </Info>
            <p>{username}</p>
        </Container>
    );
}

PlaylistTab.defaultProps = {
    user_pic: '/Icons/default_playlist.png',
    title: "playlist",
    showLike:false,
    liked:false,
    onLike:()=>{},
    username:'user'
}

PlaylistTab.propTypes = {

}

export default PlaylistTab;
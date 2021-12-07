import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from 'react-icons/ai'
import { Theme } from '../../styles/theme'


import { Container, Cover, Info, TagWrap, Cont } from './style'

const PlaylistTab = ({ user_pic, title, showLike, liked, onLike, username, deletePlaylist, edit, onClick }) => {

    const [color, setColor] = useState()

    const handleHover = () => {
        setColor(!color)
    }
    return (
        <Container onClick={onClick}>
            <Cover>
                <img alt='' src={user_pic} />
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
            <Cont>
                <p>{username}</p>
                {edit ? <div
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    onClick={deletePlaylist}
                >
                    <AiOutlineDelete
                        size={28}
                        fill={color ? Theme.colors.orange : Theme.colors.lightGrey}

                    />
                </div> : null}
            </Cont>
        </Container>
    );
}

PlaylistTab.defaultProps = {
    user_pic: '/Icons/default_playlist.png',
    title: "playlist",
    showLike: false,
    liked: false,
    onLike: () => { },
    username: 'user',
    deletePlaylist: () => { },
    onClick: () => { }
}

PlaylistTab.propTypes = {

}

export default PlaylistTab;
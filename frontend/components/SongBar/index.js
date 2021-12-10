import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Container, Cover, Left, Right, Spacer } from './style'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { Theme } from '../../styles/theme';

const SongBar = ({ title, artist, cover, onClick, showAdd}) => {

    const [hide, setHide] = useState(false);

    const handleHide = ()=>{
        setHide(!hide)
        console.log('hide')
    }

    return (
        <Container hide={hide}>
            <Left>
                <Spacer showAdd={showAdd}>
                {showAdd ? <AiOutlinePlusCircle
                    size={25}
                    fill={Theme.colors.lightGrey}
                    onClick={()=>{
                        onClick()
                        handleHide()
                    }}
                /> : null}
                </Spacer>
                <Cover><img src={cover} /></Cover>
                <h3>{title}</h3>
            </Left>
            <Right>
                <h3>{artist}</h3>
            </Right>
        </Container>
    );
}

SongBar.defaultProps = {
    title: "West End Blues",
    artist: "Bob",
    cover: '/Icons/default_playlist.png',
    onClick:()=>{}
}

SongBar.propTypes = {

}

export default SongBar;
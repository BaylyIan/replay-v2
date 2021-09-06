import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style'

import { Theme } from '../../styles/theme'
import { AiOutlineClose } from 'react-icons/ai'


const Tag = ({ text, showClose, deleteTag}) => {
    return (
        <Container>
            <p style={{ color: `${Theme.colors.lightGrey}`, marginRight: '5px' }}>{text}</p>
            {showClose ? <AiOutlineClose
                size={15}
                fill={Theme.colors.lightGrey}
                onClick={deleteTag}

            /> : null}
        </Container>
    );
}

Tag.defaultProps = {
    deleteTag:()=> {}
}

Tag.propTypes = {

}

export default Tag;
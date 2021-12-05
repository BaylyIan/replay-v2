import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style'

const Button = ({ onClick, text, bgColor, showIcon, icon, width, height, textColor, hoverBgColor, hoverTextColor, border }) => {
    return (
        <Container onClick={onClick}
            width={width}
            height={height}
            border={border}
            bgColor={bgColor}
            hoverBgColor={hoverBgColor}
            hoverTextColor={hoverTextColor}
            textColor={textColor}
            >
            {showIcon ? icon : null}
            <p >{text}</p>
        </Container>
    );
}

Button.defaultProps = {
    onClick: () => { },
    height: '48px',
    color: 'transparent'
}

Button.propTypes = {

}

export default Button;
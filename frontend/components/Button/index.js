import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style'

const Button = ({ onClick, text, color, showIcon, icon, width, height, textColor, margin, fontSize}) => {
    return (
        <Container onClick={onClick} color={color} width={width} height={height} textColor={textColor} margin={margin}>
            {showIcon ? icon : null}
            <p>{text}</p>
        </Container>
    );
}

Button.defaultProps = {
    onClick: () => { },
    height:'48px',
    color:'transparent'
}

Button.propTypes = {

}

export default Button;
import React from 'react';
import PropTypes from 'prop-types'; 

import { Container } from './style'

const Avatar = ({image}) => {
  return (
    <Container>
        <img src={image}/>
    </Container>
  );
}

Avatar.defaultProps = {
  image:  '/Icons/default_profile.png'
}

Avatar.propTypes = {

}

export default Avatar;
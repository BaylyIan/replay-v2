import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { Container } from './style'


const NavItem = ({ icon, text, toggle, selected, onClick }) => {

    return (
        <Container
            toggle={toggle}
            selected={selected}
            onClick={onClick}>
            {icon}
            {!toggle ? <h3 selected={selected}>{text}</h3> : null}
        </Container>
    );
}

NavItem.defaultProps = {
    text: 'default',
    onClick:()=>{}
}

NavItem.propTypes = {

}

export default NavItem;
import React from 'react';
import PropTypes from 'prop-types';
import {Theme } from '../../styles/theme'
import { MdClose } from 'react-icons/md'

import { Container, Background, CloseWrap, Title, PageWrap} from './style'

const CustomModal = ({ isActive, children, handleClose, title}) => {
    return isActive ? (
        <PageWrap>
           <Container>
               <Background onClick={handleClose} />
                <CloseWrap>
                    <Title><h2>{title}</h2></Title>
                    <MdClose 
                        size={28}
                        fill={Theme.colors.white}
                        onClick={handleClose}
                    />
                </CloseWrap>
                {children}
           </Container>
        </PageWrap>
    ) : null;
}

CustomModal.defaultProps = {
    handleClose:()=>{}
}

CustomModal.propTypes = {
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default CustomModal;
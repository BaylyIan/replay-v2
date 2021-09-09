import React from 'react';
import PropTypes from 'prop-types';
import { Container, InputField } from './style'
import { Theme } from '../../styles/theme'

import { MdMail } from 'react-icons/md'

const TextArea = ({ icon, placeholder, value, register, disabled, onBlur, name, type, required, label, rows, height, onChange}) => {
    return (
        <Container height={height}>
            {icon}
            <InputField
                fontSize={'14px'}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                name={name}
                type={type}
                onBlur={(e)=>{onBlur(e)}}
                rows={rows}
                onChange={onChange}
            />
        </Container>
    );
}

TextArea.defaultProps = {
    onBlur: ()=> {},
    onChange: ()=> {},
}

TextArea.propTypes = {
}

export default TextArea;
import React from 'react';
import PropTypes from 'prop-types';
import { Container, InputField } from './style'
import { Theme } from '../../styles/theme'

import { MdMail } from 'react-icons/md'

const Input = ({ icon, placeholder, value, register, disabled, onBlur, name, type, required, label}) => {
    return (
        <Container>
            {icon}
            <InputField
                fontSize={'14px'}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                name={name}
                type={type}
                onBlur={(e)=>{onBlur(e)}}
                {...register(label, {required})}
            />
        </Container>
    );
}

Input.defaultProps = {
    onBlur: ()=> {},

}

Input.propTypes = {
}

export default Input;
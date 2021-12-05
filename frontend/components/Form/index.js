import React, { useState } from 'react';
import PropTypes from 'prop-types';

//utills
import { Theme } from '../../styles/theme';
import { useForm } from "react-hook-form";

//comps
import Input from '../Input'
import Button from '../Button'
import { Container, ToggleCont } from './style'

//icons
import { MdMail, MdLock, MdPerson } from 'react-icons/md'

const Form = ({ toggle, onChangeToggle, onSubmit }) => {

    const { register, handleSubmit, errors } = useForm();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <Container>
            <ToggleCont toggle={toggle}>
                <p onClick={onChangeToggle}>Sign in</p>
                <p onClick={onChangeToggle}>Sign up</p>
            </ToggleCont>
            <div>
                {!toggle ? <Input
                    icon={<MdPerson size={20} fill={Theme.colors.lightGrey} />}
                    placeholder={'Username'}
                    onChange={(e) => { setName(e.target.value) }}
                    label="username"
                    required
                /> : null}
                {/* {errors.username && <Error>This is required!</Error>} */}
                <Input
                    icon={<MdMail size={20} fill={Theme.colors.lightGrey} />}
                    placeholder={'Email'}
                    onChange={(e) => { setEmail(e.target.value) }}
                    label="email"
                    required
                />
                {/* {errors.email && <Error>This is required!</Error>} */}
                <Input
                    icon={<MdLock size={20} fill={Theme.colors.lightGrey} />}
                    placeholder={'Password'}
                    onChange={(e) => { setPassword(e.target.value) }}
                    label="password"
                    required
                />
                {/* {errors.password && <Error>This is required!</Error>} */}
                <Button text={toggle ? 'login' : 'Sign up'}
                    type='submit'
                    width={'100%'}
                    onClick={() => { onSubmit({ name, email, password }) }}
                    height={'51px'}
                    textColor={Theme.colors.orange}
                    border={Theme.colors.orange}
                    bgColor={'transparent'}
                    hoverBgColor={Theme.colors.orange}
                    hoverTextColor={Theme.colors.white}

                />
                {/* <input type='submit' /> */}
            </div>
        </Container>
    );
}

Form.defaultProps = {
    onSubmit: () => { }
}

Form.propTypes = {

}

export default Form;
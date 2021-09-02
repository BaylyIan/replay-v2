import React, { useState } from 'react';
import PropTypes from 'prop-types';

//utills
import { Theme } from '../../styles/theme';
import { useForm } from "react-hook-form";

//comps
import Input from '../Input'
import Button from '../Button'
import { Container, Toggle } from './style'

//icons
import { MdMail, MdLock, MdPerson } from 'react-icons/md'

const Form = ({ toggle, onChangeToggle, onSubmit }) => {

    const { register, handleSubmit, errors } = useForm();

    return (
        <Container>
            <Toggle toggle={toggle}>
                <p onClick={onChangeToggle}>Sign in</p>
                <p onClick={onChangeToggle}>Sign up</p>
            </Toggle>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!toggle ? <Input
                    icon={<MdPerson size={20} fill={Theme.colors.lightGrey} />}
                    placeholder={'Username'}
                    register={register}
                    label="username"
                    required
                /> : null}
                {/* {errors.username && <Error>This is required!</Error>} */}
                <Input
                    icon={<MdMail size={20} fill={Theme.colors.lightGrey} />}
                    placeholder={'Email'}
                    register={register}
                    label="email"
                    required
                />
                {/* {errors.email && <Error>This is required!</Error>} */}
                <Input
                    icon={<MdLock size={20} fill={Theme.colors.lightGrey} />}
                    placeholder={'Password'}
                    register={register}
                    label="password"
                    required
                />
                {/* {errors.password && <Error>This is required!</Error>} */}
                <Button text={toggle ? 'login' : 'Sign up'} type='submit' width={'100%'}/>
                {/* <input type='submit' /> */}
            </form>
        </Container>
    );
}

Form.defaultProps = {
    onSubmit:()=>{}
}

Form.propTypes = {

}

export default Form;
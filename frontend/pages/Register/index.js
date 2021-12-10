import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { PageContext } from "../../utils/context";
import { useRouter } from 'next/router';

//comps
import { Main, Left, Right } from '../../pageStyles/Register/style'
import Form from '../../components/Form'

//utills
import jsCookie from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../../utils/authContext'
import { DB_URL } from '../../utils/constants'

const Register = ({}) => {
  //check if user has been logged in recently, and either set toggle to true or bypass login entirely
  const [toggle, setToggle] = useState(true)
  const { login, register } = useAuth()

  //add user priviledges collumn in db to have basic user, admin, etc. 
  const router = useRouter()

  const handleSubmit = async (e) => {
    try {
      switch (toggle) {
        case true:
        login(e)
          break;
        case false:
          //sign up
        register(e)
        break;
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeToggle = () => {
    setToggle(!toggle)
  }

  return (
    <Main>
      <Left>

      </Left>
      <Right>
        <Form
          toggle={toggle}
          onChangeToggle={handleChangeToggle}
          onSubmit={(e) => {
            handleSubmit(e)
            // console.log(e, 'comp')
          }} />
      </Right>
    </Main>
  )
}

export default Register;
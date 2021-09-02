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

const Register = ({}) => {
  //check if user has been logged in recently, and either set toggle to true or bypass login entirely
  const [toggle, setToggle] = useState(true)

  //add user priviledges collumn in db to have basic user, admin, etc. 
  const { setUser, setLoggedIn } = useContext(PageContext);
  const router = useRouter()

  const handleSubmit = async (e) => {
    try {
      switch (toggle) {
        case true:
          //login
          const result = await axios.post('http://localhost:4200/api/users/login', {
            email: e.email,
            password: e.password
          })

          const token = result.data.token
          sessionStorage.setItem('token', token);
          jsCookie.set("token", token);
          axios.defaults.headers.common['Authorization'] = "Bearer " + token;

          const user = await axios.get('http://localhost:4200/api/profile', { token: token });

          sessionStorage.setItem("user", JSON.stringify(user.data.result[0]));
          setUser(JSON.parse(sessionStorage.user))
          setLoggedIn(true)
          router.push("/");

          break;
        case false:
          //sign up
          const _result = await axios.post("http://localhost:4200/api/create_user", {
            name: e.username,
            email: e.email,
            password: e.password,
          });

          const _token = _result.data.token
          sessionStorage.setItem('token', _token);
          jsCookie.set("token", _token);
          axios.defaults.headers.common['Authorization'] = "Bearer " + _token;

          console.log(_result.data.token, 'token')

          const _user = await axios.get('http://localhost:4200/api/profile', { token: _token });

          sessionStorage.setItem("user", JSON.stringify(_user.data.result[0]));
          setUser(JSON.parse(sessionStorage.user))
          setLoggedIn(true)
          router.push("/");
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
          // onSubmit={(e)=>{handleSubmit(e)}}
          onSubmit={(e) => {
            handleSubmit(e)

          }} />
      </Right>
    </Main>
  )
}

export default Register;
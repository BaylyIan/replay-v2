import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { PageContext } from "../utils/context";
import { useRouter } from 'next/router'

import { Container } from "../pageStyles/Home/style.js";

//comps


//utills


export default function Home() {

  const router = useRouter()

  const { user, keyword } = useContext(PageContext)

  // console.log(user, 'user on page')
  console.log(keyword, 'keyword')

  return (
    <Container>
      {/* <p>{user.name}</p> */}
      <div >This is the dashboard, and the page that will open when app is run</div>
      hello
    </Container>
  )
}

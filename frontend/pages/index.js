import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

//comps
import { Container } from "../pageStyles/Home/style.js";
import PlaylistCard from "../components/PlaylistCard"

//utills
import { PageContext } from "../utils/context";
import { useRouter } from 'next/router'
import axios from 'axios'


export default function Home() {

  const router = useRouter()

  const { user, keyword } = useContext(PageContext)

  const [playlists, setPlaylists] = useState([])

  // console.log(user, 'user on page')
  console.log(keyword, 'keyword')

  const getPlaylists = async () => {
    const result = await axios.get('http://localhost:4200/api/playlists')
    console.log(result.data.playlists)
    setPlaylists(result.data.playlists)
  }

  useEffect(()=>{
    console.log(user, 'user on page')
    getPlaylists()
  },[])

  return (
    <Container>
     {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
                return (
                    <PlaylistCard key={i}>

                    </PlaylistCard>
                       
                )
            }) : null}

     
    </Container>
  )
}

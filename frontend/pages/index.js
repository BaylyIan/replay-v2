import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

//comps
import { Container } from "../pageStyles/Home/style.js";
import PlaylistCard from "../components/PlaylistCard"

//utills
import { PageContext } from "../utils/context";
import { useRouter } from 'next/router'
import axios from 'axios'
import { URL } from "../utils/constants"

export default function Home() {

  const router = useRouter()

  const { user, keyword, toggle } = useContext(PageContext)

  const [playlists, setPlaylists] = useState([])



  // console.log(user, 'user on page')
  console.log(keyword, 'keyword')

  const getPlaylists = async () => {
    const result = await axios.get(`${URL}/api/playlists`)
    const playlistArr = result.data.playlists

    for (let i = 0; i < playlistArr.length; i++) {
      const playlist_id = playlistArr[i].id
      const tags = await axios.get(`${URL}/api/playlist_tags/${playlist_id}`)
      playlistArr[i].tags = tags.data.tags.map(o => o.tag = {tag: o.text})
    }
    setPlaylists(playlistArr)
  }


  const likePlaylist = async (id) => {
    console.log(id)
  }

  useEffect(() => {
    console.log(user, 'user on page')
    getPlaylists()
  }, [])

  return (
    <Container toggle={toggle}>
      {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
        return (
          <PlaylistCard key={i}
            toggle={toggle}
            liked={false}
            playlist_name={o.name}
            playlist_pic={`${URL}/playlistImage/${o.image_url}`}
            username={o.username}
            user_pic={o.usersimg ? usersimg : null}
            tags={o.tags}
            showClose={false}
            onLike={() => {
              likePlaylist(o.id)
            }}
          >

          </PlaylistCard>

        )
      }) : null}


    </Container>
  )
}

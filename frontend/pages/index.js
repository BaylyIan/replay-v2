import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

//comps
import { Container } from "../pageStyles/Home/style.js";
import PlaylistCard from "../components/PlaylistCard"

//utills
import { PageContext } from "../utils/context";
import { useRouter } from 'next/router'
import { URL } from "../utils/constants"

export default function Home() {

  const router = useRouter()

  const { user, keyword, toggle } = useContext(PageContext)

  const [playlists, setPlaylists] = useState([])
  const [liked, setLiked] = useState([])

  // console.log(user, 'user on page')
  // console.log(keyword, 'keyword')

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
      const result = await axios.post(`${URL}/api/like_playlist`, {
        playlist_id:id
      })
      getLikedPlaylists()

    }
  
  const unlikePlaylist = async (id) => {
    const result = await axios.post(`${URL}/api/unlike_playlist`, {
      playlist_id:id
    })
    getLikedPlaylists()

  }

  const getLikedPlaylists = async () => {
    if(user){
      const result = await axios.get(`${URL}/api/users_liked_playlists`)
      setLiked(result.data.result)
    }
  }

  useEffect(() => {
    getPlaylists()
    getLikedPlaylists()
  }, [])

  return (
    <Container toggle={toggle}>
      {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
        let state = false
        for(const i of liked) {
          if(i.id === o.id) {
            state = true
          }
        }
        return (
          <PlaylistCard key={i}
            toggle={toggle}
            liked={false}
            playlist_name={o.name}
            playlist_pic={`${URL}/playlistImage/${o.image_url}`}
            username={o.username}
            user_pic={o.usersimg ? usersimg : '/Icons/default_profile.png'}
            tags={o.tags}
            showClose={false}
            liked={state}
            onLike={() => {
              if(state){
                unlikePlaylist(o.id)
              }else{
                likePlaylist(o.id)
              }
            }}
          >

          </PlaylistCard>

        )
      }) : null}


    </Container>
  )
}

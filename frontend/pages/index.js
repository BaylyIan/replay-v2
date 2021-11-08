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
import { useAuth } from '../utils/authContext'

export default function Home() {

  const router = useRouter()
  const { auth } = useAuth()

  const { toggle } = useContext(PageContext)

  const [playlists, setPlaylists] = useState([])
  const [liked, setLiked] = useState([])

  useEffect(() => {
    console.log(auth, 'user on page')

  }, [auth])
  console.log(auth, 'here')

  const getPlaylists = async () => {
    const result = await axios.get(`${URL}/api/playlists`)
    const playlistArr = result.data.playlists
    console.log('her')
    if (auth.status === "SIGNED_IN") {
      const liked = await axios.get(`${URL}/api/users_liked_playlists`)
      for (let i = 0; i < playlistArr.length; i++) {
        const playlist = playlistArr[i]
        for (const i of liked.data.result) {
          if (i.id === playlist.id) {
            playlist.liked = true
          }
        }
      }

    }

    for (let i = 0; i < playlistArr.length; i++) {
      const playlist_id = playlistArr[i].id
      const tags = await axios.get(`${URL}/api/playlist_tags/${playlist_id}`)
      playlistArr[i].tags = tags.data.tags.map(o => o.tag = { tag: o.text })
    }
    console.log(playlistArr)
    setPlaylists(playlistArr)
  }

  const getLikedPlaylists = async () => {
    if (auth.status === "SIGNED_IN") {
      const result = await axios.get(`${URL}/api/users_liked_playlists`)
      // console.log(result.data.result, 'rere')
      setLiked(result.data.result)
    }
  }
  const likePlaylist = async (id) => {
    await axios.post(`${URL}/api/like_playlist`, {
      playlist_id: id
    })

    getPlaylists()

  }

  const unlikePlaylist = async (id) => {
    await axios.post(`${URL}/api/unlike_playlist`, {
      playlist_id: id
    })
    getPlaylists()
  }

  const viewOtherProfile = async ( id ) => {
    console.log(id, 'id')
    await axios.get(`http://localhost:4200/api/profile_by_id/${id}`).then((res) => {
      // console.log(res.data.result[0], 'test here')
      router.push({
        pathname: "/Profile/[id]/[profile]",
        query: {
          id: 'view',
          profile: res.data.result[0].id,
          otherUser: JSON.stringify(res.data.result[0])
        },
      })
    })
  }

  useEffect(() => {
    getPlaylists()
    getLikedPlaylists()
  }, [])

  // Server-render loading state
  if (!auth) {
    return <Page>Loading...</Page>
  }

  return (
    <Container toggle={toggle}>
      {playlists && liked && playlists.length !== 0 ? playlists.map((o, i) => {
        // let state = false
        // for(const i of liked) {
        //   if(i.id === o.id) {
        //     state = true
        //   }
        // }
        console.log(o)
        return (
          <PlaylistCard key={i}
            toggle={toggle}
            liked={false}
            playlist_name={o.name}
            playlist_pic={`${URL}/playlistImage/${o.image_url}`}
            username={o.username}
            user_pic={o.usersimg !== null ? `http://localhost:4200/profileImage/${o.usersimg}` : '/Icons/default_profile.png'}
            tags={o.tags}
            showClose={false}
            liked={o.liked}
            showLike={auth.status === "SIGNED_IN" ? true : false}
            onLike={() => {
              if (o.liked) {
                unlikePlaylist(o.id)
              } else {
                likePlaylist(o.id)
              }
            }}
            onProfileView={() => {
              // console.log(o.user_id)
              viewOtherProfile(o.user_id)
            }}
            onPlaylistView={() => {
              router.push({
                pathname: "/Playlist/[id]/[playlist]",
                query: {
                  id: 'view',
                  playlist: o.id,
                  user:JSON.stringify(o.user_id)
                },
              })
            }}
          >

          </PlaylistCard>

        )
      }) : null}


    </Container>
  )
}



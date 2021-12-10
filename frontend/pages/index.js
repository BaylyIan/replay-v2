import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

//comps
import { Container, Page } from "../pageStyles/Home/style.js";
import PlaylistCard from "../components/PlaylistCard"


//utills
import { PageContext } from "../utils/context";
import { useRouter } from 'next/router'
import { DB_URL } from '../utils/constants'
import { useAuth } from '../utils/authContext'
import jsHttpCookie from 'cookie';
import { parseCookies } from "../utils/index.js";
import { useModal } from "../utils/useModal"


export default function Home({ playlists }) {

  const router = useRouter()
  const { auth } = useAuth()

  const { toggle, setShowReg, keyword } = useContext(PageContext)


  const refreshData = () => router.replace(router.asPath);

  const likePlaylist = async (id) => {
    await axios.post(`${DB_URL}/api/like_playlist`, {
      playlist_id: id,
      userId: auth.user.id
    }).then(() => {
      refreshData()
    })
  }

  const unlikePlaylist = async (id) => {
    await axios.post(`${DB_URL}/api/unlike_playlist`, {
      playlist_id: id,
      userId: auth.user.id
    }).then(() => {
      refreshData()
    })
  }

  // Server-render loading state
  if (!auth || !playlists) {
    return <Page>Loading...</Page>
  }

  return (
    <Container toggle={toggle}>
      {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
        // console.log(o, 'mapped')

        return (
          <PlaylistCard key={i}
            toggle={toggle}
            playlist_name={o.name}
            playlist_pic={`${DB_URL}/playlistImage/${o.image_url}`}
            username={o.username}
            user_pic={o.usersimg !== null ? `${DB_URL}/profileImage/${o.usersimg}` : '/Icons/default_profile.png'}
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
              if(auth.status === "SIGNED_IN"){
                router.push({
                  pathname: "/Profile/[profile]",
                  query: {
                    profile: o.user_id
                  }
                });
              }else{
                setShowReg(true)
              }
            }}
            onPlaylistView={() => {
              if (auth.status === "SIGNED_IN") {
                console.log('pop')
                router.push({
                  pathname: "/Playlist/[playlist]",
                  query: {
                    playlist: o.id,
                  },
                })
              } else {
                setShowReg(true)
              }
            }}
          >

          </PlaylistCard>

        )
      }) : null}


    </Container>
  )
}

export async function getServerSideProps({ req, res }) {

  console.log('refresh')
  const { user } = parseCookies(req);

  const result = await axios.get(`${DB_URL}/api/playlists`)

  let playlists = result.data.playlists

  if (user && playlists) {
    console.log('yes')
    const result2 = await axios.get(`${DB_URL}/api/users_liked_playlists/${JSON.parse(user).id}`)
    let likedPlaylists = result2.data.result

    for (let i = 0; i < playlists.length; i++) {
      const playlist = playlists[i]
      for (const i of likedPlaylists) {
        if (i.id === playlist.id) {
          playlist.liked = true
        }
      }
    }

    for (let i = 0; i < playlists.length; i++) {
      const playlist_id = playlists[i].id
      const tags = await axios.get(`${DB_URL}/api/playlist_tags/${playlist_id}`)
      playlists[i].tags = tags.data.tags.map(o => o.tag = { tag: o.text })
    }

  } else {

    for (let i = 0; i < playlists.length; i++) {
      const playlist_id = playlists[i].id
      const tags = await axios.get(`${DB_URL}/api/playlist_tags/${playlist_id}`)
      playlists[i].tags = tags.data.tags.map(o => o.tag = { tag: o.text })
    }

  }

  // Pass data to the page via props
  return { props: { playlists } }
}



import React, { useState, useEffect, useContext } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

//comps
import { Container, Page } from "../pageStyles/Home/style.js";
import PlaylistCard from "../components/PlaylistCard"


//utills
import { PageContext } from "../utils/context";
import { useRouter } from 'next/router'
import { URL } from "../utils/constants"
import { useAuth } from '../utils/authContext'
import jsHttpCookie from 'cookie';
import { parseCookies } from "../utils/index.js";
import { useModal } from "../utils/useModal"


export default function Home({ playlists }) {

  const router = useRouter()
  const { auth } = useAuth()

  const { toggle, showReg, setShowReg, toggleReg } = useContext(PageContext)

  const refreshData = () => router.replace(router.asPath);

  const likePlaylist = async (id) => {
    await axios.post(`https://replay-v2.herokuapp.com/api/like_playlist`, {
      playlist_id: id
    }).then(() => {
      refreshData()
    })
  }

  const unlikePlaylist = async (id) => {
    await axios.post(`${URL}/api/unlike_playlist`, {
      playlist_id: id
    }).then(() => {
      refreshData()
    })
  }

  const viewOtherProfile = async (id) => {
    await axios.get(`https://replay-v2.herokuapp.com/api/profile_by_id/${id}`).then((res) => {
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
            playlist_pic={`https://replay-v2.herokuapp.com/playlistImage/${o.image_url}`}
            username={o.username}
            user_pic={o.usersimg !== null ? `https://replay-v2.herokuapp.com/profileImage/${o.usersimg}` : '/Icons/default_profile.png'}
            tags={o.tags}
            showClose={false}
            liked={o.liked}
            showLike={auth.status === "SIGNED_IN" ? true : false}
            onLike={() => {
              if (o.liked) {
                console.log("unlike")

                unlikePlaylist(o.id)
              } else {
                console.log("like me")

                likePlaylist(o.id)
              }
            }}
            onProfileView={() => {
              if (auth.status === "SIGNED_IN" && auth.user.id === o.user_id) {
                router.push({
                  pathname: "/Profile/[id]/[profile]",
                  query: {
                    id: 'view',
                    profile: auth.user.id
                  }
                });
              } else if (auth.status === "SIGNED_IN") {
                viewOtherProfile(o.user_id)
              } else {
                setShowReg(true)

              }
            }}
            onPlaylistView={() => {
              if (auth.status === "SIGNED_IN") {
                console.log('pop')
                router.push({
                  pathname: "/Playlist/[id]/[playlist]",
                  query: {
                    id: 'view',
                    playlist: o.id,
                    user: JSON.stringify(o.user_id),
                    play: JSON.stringify(o)
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

  const result = await axios.get(` https://replay-v2.herokuapp.com/api/playlists`)

  let playlists = result.data.playlists

  if (user) {
    console.log('yes')
    const result2 = await axios.get(` https://replay-v2.herokuapp.com/api/users_liked_playlists/${JSON.parse(user).id}`)
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
      const tags = await axios.get(` https://replay-v2.herokuapp.com/api/playlist_tags/${playlist_id}`)
      playlists[i].tags = tags.data.tags.map(o => o.tag = { tag: o.text })
    }

  } else {
    console.log('no')

    for (let i = 0; i < playlists.length; i++) {
      const playlist_id = playlists[i].id
      const tags = await axios.get(` https://replay-v2.herokuapp.com/api/playlist_tags/${playlist_id}`)
      playlists[i].tags = tags.data.tags.map(o => o.tag = { tag: o.text })
    }

  }

  // Pass data to the page via props
  return { props: { playlists } }
}



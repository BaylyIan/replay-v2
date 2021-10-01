import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { URL } from "../../../utils/constants"
import { useAuth } from '../../../utils/authContext'

//comps 
import { Page, Avatar, Gradient, InfoCont, Line, Wrap, LoginCont } from '../../../pageStyles/Profile/style';
import PlaylistTab from '../../../components/PlaylistTab'
import Button from '../../../components/Button'
import { AiFillHeart } from 'react-icons/ai'

const Profile = ({ }) => {

  const { user, keyword, toggle, setUser } = useContext(PageContext)
  const router = useRouter()

  const { id, profile } = router.query
  const { auth, login, register } = useAuth()

  console.log(auth.user, 'profile')


  const [num_playlists, setNum_playlists] = useState()
  const [num_likes, setNum_likes] = useState(0)
  const [playlists, setPlaylists] = useState()
  const [liked, setLiked] = useState([])
  // const [loggedIn, setLoggedIn] = useState()

  const playlistByUser = async () => {
    const result = await axios.get(`${URL}/api/playlist_by_id/${profile}`)
    // console.log(result.data.result)
    setPlaylists(result.data.result)
    setNum_playlists(result.data.result.length)
  }

  const getLikedPlaylists = async () => {
    if (auth.status === "SIGNED_IN") {
      const result = await axios.get(`${URL}/api/users_liked_playlists`)
      setLiked(result.data.result)
    }
    // console.log(result.data.result)
  }

  const getUserLikes = async () => {
    const result = await axios.get(`${URL}/api/count_user_likes/${auth.user.id}`)
    let count = result.data.result[0]
    setNum_likes(count[Object.keys(count)[0]])
  }

  useEffect(() => {
    if (auth.status === "SIGNED_IN") {
      getUserLikes()
    }
  }, [auth])

  useEffect(() => {
    if (auth.status === "SIGNED_IN") {
      playlistByUser()
      getLikedPlaylists()
    }
  }, [auth])


  var page = <Page />

  // console.log(id, user, profile)
  // useEffect(() => {
  //   if (id === 'view') {
  //     console.log(auth, profile, 'signedInUseEffect')
  //     if (profile == auth.user.id) {
  //       console.log(auth.user.id, profile, 'own profile')
  //       page = <Page>
  //         <Gradient />
  //         {/* <h1>VIEW OWN PROFILE</h1> */}
  //         <Avatar>
  //           <img src={auth.user.image_url ? auth.user.image_url : '/Icons/default_profile.png'} />
  //         </Avatar>
  //         <h1>{auth.user.name}</h1>
  //         <InfoCont>
  //           <h3>{num_playlists} playlists </h3>
  //           <Line />
  //           <h3> <AiFillHeart fill={`${Theme.colors.lightGrey}`} style={{ marginRight: '5px' }} />{num_likes} Likes</h3>
  //         </InfoCont>
  //         {playlists && playlists.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>My Playlists</h1> : null}
  //         <Wrap toggle={toggle}>
  //           {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
  //             return (
  //               <PlaylistTab
  //                 showLike={false}
  //                 user_pic={`${URL}/playlistImage/${o.image_url}`}
  //                 title={o.name}
  //                 username={auth.user.name}
  //               />
  //             )
  //           }) : null}
  //         </Wrap>
  //         {liked.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Liked Playlists</h1> : null}
  //         <Wrap toggle={toggle}>
  //           {liked && liked.length !== 0 ? liked.map((o, i) => {
  //             return (
  //               <PlaylistTab
  //                 showLike={false}
  //                 user_pic={`${URL}/playlistImage/${o.image_url}`}
  //                 title={o.name}
  //                 username={auth.user.name}
  //               />
  //             )
  //           }) : null}
  //         </Wrap>
  //       </Page>
  //     } else if (profile !== auth.user.id) {
  //       page = <Page>
  //         <h1>VIEW OTHER PROFILE</h1>
  //       </Page>
  //     }
  //   } else if (id === 'edit' && profile == auth.user.id) {
  //     page = <Page>
  //       <h1>EDIT OWN PROFILE</h1>
  //     </Page>
  //   }
  // }, [auth, profile])


  return (
    <div>
      {page}
      {/* {profile} */}
    </div>
  )

}

export default Profile;
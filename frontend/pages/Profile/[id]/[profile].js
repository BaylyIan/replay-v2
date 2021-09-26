import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { URL } from "../../../utils/constants"

//comps 
import { Page, Avatar, Gradient, InfoCont, Line, Wrap } from '../../../pageStyles/Profile/style';
import PlaylistTab from '../../../components/PlaylistTab'
import { AiFillHeart } from 'react-icons/ai'

const Profile = ({ }) => {

  const { user, keyword, loggedIn, toggle } = useContext(PageContext)
  const router = useRouter()

  const { id, profile } = router.query

  // console.log(user, 'user')

  const [num_playlists, setNum_playlists] = useState()
  const [num_likes, setNum_likes] = useState(0)
  const [playlists, setPlaylists] = useState()
  const [liked, setLiked] = useState([])

  const playlistByUser = async () => {
    const result = await axios.get(`${URL}/api/playlist_by_id/${profile}`)
    // console.log(result.data.result)
    setPlaylists(result.data.result)
    setNum_playlists(result.data.result.length)
  }

  const getLikedPlaylists = async () => {
    const result = await axios.get(`${URL}/api/users_liked_playlists`)
    // console.log(result.data.result)
    setLiked(result.data.result)
  }

  const getUserLikes = async () => {
    const userData = sessionStorage.getItem("user");
    const { id } = JSON.parse(userData)
    const result = await axios.get(`${URL}/api/count_user_likes/${id}`)
    console.log(result.data.result[0], 'count front')
    // setNum_likes(result.data.result[0])
    // console.log(count, 'cc')

  }

  useEffect(() => {
  
    getUserLikes()
  }, [user])

  useEffect(() => {
    playlistByUser()
    getLikedPlaylists()
  }, [profile])


  var page = <Page />

  // console.log(id, user, profile)

  if (id === 'view' && profile === 'no-user' || !user) {
    page = <Page>
      <h1>NEED TO LOGIN</h1>
    </Page>
  } else if (id === 'view' && profile == user.id) {
    page = <Page>
      <Gradient />
      {/* <h1>VIEW OWN PROFILE</h1> */}
      <Avatar>
        <img src={user.image_url ? user.image_url : '/Icons/default_profile.png'} />
      </Avatar>
      <h1>{user.name}</h1>
      <InfoCont>
        <h3>{num_playlists} playlists </h3>
        <Line />
        <h3> <AiFillHeart fill={`${Theme.colors.lightGrey}`} style={{ marginRight: '5px' }} />{num_likes} Likes</h3>
      </InfoCont>
      {playlists && playlists.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>My Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
          return (
            <PlaylistTab
              showLike={false}
              user_pic={`${URL}/playlistImage/${o.image_url}`}
              title={o.name}
              username={user.name}
            />
          )
        }) : null}
      </Wrap>
      {liked.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Liked Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {liked && liked.length !== 0 ? liked.map((o, i) => {
          return (
            <PlaylistTab
              showLike={false}
              user_pic={`${URL}/playlistImage/${o.image_url}`}
              title={o.name}
              username={user.name}
            />
          )
        }) : null}
      </Wrap>
    </Page>
  } else if (id === 'edit' && profile === user.id) {
    page = <Page>
      <h1>EDIT OWN PROFILE</h1>
    </Page>
  } else if (id === 'view' && profile !== user.id) {
    page = <Page>
      <h1>VIEW OTHER PROFILE</h1>
    </Page>
  } else {
    console.log('did not work')
  }


  return (
    <div>
      {page}
      {/* {profile} */}
    </div>
  )

}

export default Profile;
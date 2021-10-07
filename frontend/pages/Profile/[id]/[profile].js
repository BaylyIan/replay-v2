import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { useAuth } from '../../../utils/authContext'

//comps 
import { Page, Avatar, Gradient, InfoCont, Line, Wrap, UserCont, FileInput } from '../../../pageStyles/Profile/style';
import PlaylistTab from '../../../components/PlaylistTab'
import Button from '../../../components/Button'
import { AiFillHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'

const Profile = ({ }) => {

  const { keyword, toggle } = useContext(PageContext)
  const router = useRouter()

  const { id, profile } = router.query
  const { auth } = useAuth()

  const [num_playlists, setNum_playlists] = useState()
  const [num_likes, setNum_likes] = useState(0)
  const [playlists, setPlaylists] = useState()
  const [liked, setLiked] = useState([])

  const [file, setFile] = useState()
  const [tempFile, setTempFile] = useState()

  const getUsersPlaylist = async () => {
    const result = await axios.get(`http://localhost:4200/api/playlist_by_id/${auth.user.id}`)
    console.log(result.data.result)
    setPlaylists(result.data.result)
    setNum_playlists(result.data.result.length)
  }

  const getLikedPlaylists = async () => {
    const result = await axios.get(`http://localhost:4200/api/users_liked_playlists`)
    setLiked(result.data.result)
    // console.log(result.data.result)
  }

  const getUserLikes = async () => {
    const result = await axios.get(`http://localhost:4200/api/count_user_likes/${auth.user.id}`)
    let count = result.data.result[0]
    setNum_likes(count[Object.keys(count)[0]])
  }

  //user pic
  const fileSelected = event => {
    const file = event.target.files[0]
    console.log(file, 'file')
    if (file) {
      setTempFile(URL.createObjectURL(file))
      setFile(file)
    }
  }


  useEffect(() => {
    if (auth.status === "SIGNED_IN") {
      getUserLikes()
      getUsersPlaylist()
      getLikedPlaylists()
    }
  }, [auth])

  // Server-render loading state
  if (!auth || auth.status === "SIGNED_OUT") {
    return <Page>Loading...</Page>
  }

  // Once the user request finishes, handle authentication
  return id === 'view' && profile == auth.user.id ? (
    <Page>
      {/* <h1>VIEW OWN PROFILE</h1> */}
      <Gradient />
      <BsThreeDotsVertical
        size={30}
        fill={Theme.colors.white}
        style={{ zIndex: '3', alignSelf: 'flex-end' }}
        onClick={() => {
          router.push({
            pathname: "/Profile/[id]/[profile]",
            query: {
              id: 'edit',
              profile: auth.user.id
            },
          })
        }}
      />
      <Avatar>
        <img src={auth.user.image_url ? auth.user.image_url : '/Icons/default_profile.png'} />
      </Avatar>
      <h1>{auth.user.name}</h1>
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
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={auth.user.name}
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
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={auth.user.name}
            />
          )
        }) : null}
      </Wrap>
    </Page>
  ) : id === 'view' && profile !== auth.user.id ? (
    <Page>
      <h1>VIEW OTHER PROFILE</h1>
    </Page>
  ) : id === 'edit' && profile == auth.user.id ? (
    <Page>
      {/* <h1>EDIT OWN PROFILE</h1> */}
      <Gradient />
      <div style={{ zIndex: '3', alignSelf: 'flex-end' }}>
        <Button
          width={'140px'}
          textColor={Theme.colors.white}
          text={'Save Profile'}
          onClick={() => {
            router.push({
              pathname: "/Profile/[id]/[profile]",
              query: {
                id: 'view',
                profile: auth.user.id
              },
            })
          }}
        />
      </div>
      <Avatar>
        <img src={tempFile ? tempFile : auth.user.user_pic ? auth.user.user_pic : '/Icons/default_profile.png'} />
      </Avatar>
        <FileInput type='file' name='file' id='file' accept='image/*' onChange={fileSelected} />
      <UserCont  htmlFor='file'>
        <AiOutlineEdit
          size={28}
          fill={Theme.colors.white}
        />
      </UserCont>
      <h1>{auth.user.name}</h1>
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
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={auth.user.name}
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
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={auth.user.name}
            />
          )
        }) : null}
      </Wrap>
    </Page>
  ) : (
    <Page>
      <h1>NO ID</h1>
    </Page>
  )
}

export default Profile;
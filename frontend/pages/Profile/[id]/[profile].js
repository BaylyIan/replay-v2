import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { useAuth } from '../../../utils/authContext'
import { postImage } from '../../../utils'


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

  const { id, profile, otherUser } = router.query
  const { auth } = useAuth()

  console.log(profile, 'viewing this profile')

  const [num_playlists, setNum_playlists] = useState()
  const [__num_playlists, __setNum_playlists] = useState()
  const [num_likes, setNum_likes] = useState(0)
  const [__num_likes, __setNum_likes] = useState(0)
  const [playlists, setPlaylists] = useState()
  const [__playlists, __setPlaylists] = useState()
  const [liked, setLiked] = useState([])
  const [__liked, __setLiked] = useState([])

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

  const uploadProfilePicture = async ({ file }) => {
    if (file === undefined) return console.error('no file sent to s3')
    await postImage({ image: file, type: 'profile' })
  }

  const getOtherUsersPlaylists = async () => {
    const result = await axios.get(`http://localhost:4200/api/playlist_by_id/${JSON.parse(otherUser).id}`)
    // console.log(result.data.result)
    __setPlaylists(result.data.result)
    __setNum_playlists(result.data.result.length)
  }

  const getOtherUsersLikedPlaylists = async () => {
    const result = await axios.get(`http://localhost:4200/api/otherUser_liked_playlists/${JSON.parse(otherUser).id}`)
    __setLiked(result.data.result)
  }

  // const deletePlaylist = async ({ id }) => {
  //   console.log(id)
  //   const result = await axios.post(`http://localhost:4200/api/delete_playlist/${id}`)
  //   console.log(result, 'delete play')
  // }


  useEffect(() => {
    if (id === 'view' && profile == auth.user.id ) {
      // getUserLikes()
      getUsersPlaylist()
      getLikedPlaylists()
    }else if(id === 'view' && profile !== auth.user.id ) {
      // countOtherUsersLikes()
      getOtherUsersPlaylists()
      getOtherUsersLikedPlaylists()
    }
  }, [auth])

  // console.log(JSON.parse(pro), 'wuery')
  // console.log(JSON.parse(otherUser), 'query')

  // Server-render loading state
  if (!auth || auth.status === "SIGNED_OUT") {
    return <Page>Loading.....</Page>
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
        <img src={auth.user.image_url ? `http://localhost:4200/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
      </Avatar>
      <h1>{auth.user.name}</h1>
      <InfoCont>
        <h3>{num_playlists} playlists </h3>
        <Line />
        <h3> <AiFillHeart fill={`${Theme.colors.lightGrey}`} style={{ marginRight: '5px' }} />{liked.length} Likes</h3>
      </InfoCont>
      {playlists && playlists.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>My Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
          return (
            <PlaylistTab
              key={i}
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
              key={i}
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
      {/* <h1>VIEW OTHER PROFILE</h1> */}
      <Gradient />
      <Avatar>
        <img src={JSON.parse(otherUser).image_url !== null ? `http://localhost:4200/profileImage/${JSON.parse(otherUser).image_url}` : '/Icons/default_profile.png'} />
      </Avatar>
      <h1>{JSON.parse(otherUser).name}</h1>
      <InfoCont>
        <h3>{__num_playlists} playlists </h3>
        <Line />
        <h3> <AiFillHeart fill={`${Theme.colors.lightGrey}`} style={{ marginRight: '5px' }} />{__liked.length} Likes</h3>
      </InfoCont>
      {__playlists && __playlists.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Playlists </h1> : null}
      <Wrap toggle={toggle}>
        {__playlists && __playlists.length !== 0 ? __playlists.map((o, i) => {
          return (
            <PlaylistTab
              key={i}
              showLike={false}
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={JSON.parse(otherUser).name}
            />
          )
        }) : null}
      </Wrap>
      {__liked.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Liked Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {__liked && __liked.length !== 0 ? __liked.map((o, i) => {
          return (
            <PlaylistTab
              key={i}
              showLike={false}
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={JSON.parse(otherUser).name}
            />
          )
        }) : null}
      </Wrap>
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
          textColor={Theme.colors.orange}
          onClick={() => {
            uploadProfilePicture({ file })
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
        <img src={tempFile ? tempFile : auth.user.image_url ? `http://localhost:4200/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
      </Avatar>
      <FileInput type='file' name='file' id='file' accept='image/*' onChange={fileSelected} />
      <UserCont htmlFor='file'>
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
              key={i}
              showLike={false}
              user_pic={`http://localhost:4200/playlistImage/${o.image_url}`}
              title={o.name}
              username={auth.user.name}
              edit={true}
              deletePlaylist={() => {
                deletePlaylist(o)
              }}
            />
          )
        }) : null}
      </Wrap>
      {liked.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Liked Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {liked && liked.length !== 0 ? liked.map((o, i) => {
          return (
            <PlaylistTab
              key={i}
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
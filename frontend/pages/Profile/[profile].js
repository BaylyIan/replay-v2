import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../styles/theme'
import axios from 'axios'

import { useAuth } from '../../utils/authContext'
import { postImage } from '../../utils'
import { DB_URL } from '../../utils/constants'



//comps 
import { Page, Avatar, Gradient, InfoCont, Line, Wrap, UserCont, FileInput } from '../../pageStyles/Profile/style';
import PlaylistTab from '../../components/PlaylistTab'
import Button from '../../components/Button'
import { AiFillHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'

const Profile = ({ playlists, liked, profile }) => {

  const { keyword, toggle } = useContext(PageContext)
  const router = useRouter()

  const { auth } = useAuth()

  const [file, setFile] = useState()
  const [tempFile, setTempFile] = useState()
  const [edit, setEdit] = useState()

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
    await postImage({ image: file, type: 'profile', id: auth.user.id })
  }

  // const deletePlaylist = async ({ id }) => {
  //   console.log(id)
  //   const result = await axios.post(`http://localhost:4200/api/delete_playlist/${id}`)
  //   console.log(result, 'delete play')
  // }

  // Server-render loading state
  if (!auth || auth.status === "SIGNED_OUT") {
    return <Page>Loading.....</Page>
  }

  let av
  if (profile.id === auth.user.id && edit) {
    av = <img alt='' src={tempFile ? tempFile : auth.user.image_url ? `${DB_URL}/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
  } else if (profile.id === auth.user.id && !edit) {
    av = <img alt='' src={auth.user.image_url ? `${DB_URL}/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
  } else if (profile.id !== auth.user.id) {
    av = <img alt='' src={profile.image_url ? `${DB_URL}/profileImage/${profile.image_url}` : '/Icons/default_profile.png'} />
  }

  return (
    <Page>
      {/* <h1>VIEW OWN PROFILE</h1> */}
      <Gradient />
      {auth.user.id === profile.id && !edit ? <BsThreeDotsVertical
        size={30}
        fill={Theme.colors.white}
        style={{ zIndex: '3', alignSelf: 'flex-end' }}
        onClick={() => {
          setEdit(true)
        }}
      /> : null}
      {edit ? <div style={{ zIndex: '3', alignSelf: 'flex-end' }}>
        <Button
          width={'140px'}
          text={'Save Profile'}
          textColor={Theme.colors.orange}
          border={Theme.colors.orange}
          bgColor={'transparent'}
          hoverBgColor={Theme.colors.orange}
          hoverTextColor={Theme.colors.white}
          onClick={() => {
            uploadProfilePicture({ file })
            setEdit(false)
          }}
        />
      </div> : null}
      <Avatar>
        {av}
      </Avatar>
      {edit ?
        <div>
          <FileInput type='file' name='file' id='file' accept='image/*' onChange={fileSelected} />
          <UserCont htmlFor='file'>
            <AiOutlineEdit
              size={28}
              fill={Theme.colors.white}
            />
          </UserCont>
        </div> : null}
      <h1>{profile.name}</h1>
      <InfoCont>
        <h3>{playlists ? playlists.length : "0"}{` playlist${playlists.length !== 1 ? 's' : ''}`} </h3>
        <Line />
        <h3> <AiFillHeart fill={`${Theme.colors.lightGrey}`} style={{ marginRight: '5px' }} />{liked ? liked.length : "0"} Likes</h3>
      </InfoCont>
      {playlists && playlists.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {playlists && playlists.length !== 0 ? playlists.map((o, i) => {
          return (
            <PlaylistTab
              key={i}
              showLike={false}
              user_pic={`${DB_URL}/playlistImage/${o.image_url}`}
              title={o.name}
              username={auth.user.name}
              onClick={() => {
                router.push({
                  pathname: "/Playlist/[playlist]",
                  query: {
                    playlist: o.id
                  }
                })
              }}
            />
          )
        }) : null}
      </Wrap>
      {liked && liked.length !== 0 ? <h1 style={{ alignSelf: 'flex-start', marginLeft: '15px' }}>Liked Playlists</h1> : null}
      <Wrap toggle={toggle}>
        {liked && liked.length !== 0 ? liked.map((o, i) => {
          return (
            <PlaylistTab
              key={i}
              showLike={false}
              user_pic={`${DB_URL}/playlistImage/${o.image_url}`}
              title={o.name}
              username={o.creator.name}
              onClick={() => {
                router.push({
                  pathname: "/Playlist/[playlist]",
                  query: {
                    playlist: o.id
                  }
                })
              }}
            />
          )
        }) : null}
      </Wrap>
    </Page>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get(`${DB_URL}/api/users`)

  const profiles = res.data.users
  const paths = profiles.map((profile) => ({
    params: { profile: profile.id.toString() },

  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`${DB_URL}/api/profile_by_id/${params.profile}`)
  const profile = res.data.result[0]

  const res2 = await axios.get(`${DB_URL}/api/playlist_by_id/${profile.id}`)
  const playlists = res2.data.result

  const res3 = await axios.get(`${DB_URL}/api/users_liked_playlists/${profile.id}`)
  const liked = res3.data.result
  
  for (const i of liked) {
    await axios.get(`${DB_URL}/api/profile_by_id/${i.user_id}`).then((res) => {
      i.creator = {
        name: res.data.result[0].name,
      }
    })
  }

  if (playlists.length !== 0 || liked.length !== 0) {
    return {
      props: {
        playlists: playlists,
        liked: liked,
        profile: profile
      }
    }
  } else {
    return {
      props: {
        playlists: [],
        liked: [],
        profile: profile
      }
    }
  }
}

export default Profile;
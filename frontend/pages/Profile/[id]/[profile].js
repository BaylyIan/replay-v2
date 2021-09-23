import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'


//comps 
import { Page, Avatar, Gradient, InfoCont, Line} from '../../../pageStyles/Profile/style';
import {AiFillHeart} from 'react-icons/ai'

const Profile = ({ }) => {

  const { user, keyword, loggedIn } = useContext(PageContext)
  const router = useRouter()

  const { id, profile } = router.query

  const [num_playlists, setNum_playlists] = useState(0)
  const [num_likes, setNum_likes] = useState(0)


  


  //view own profile only when logged in
  //viewing other profile while logged in
  //path from nav bar will return prompt to signup if not logged in
  //view other profiles while not logged in

  var page = <Page />

  // if (id === 'view' && profile == user.id) {
  //   page = <Page>
  //     <h1>VIEW OWN PROFILE</h1>
  //   </Page>
  // } else if (id === 'edit') {
  //   page = <Page>
  //     EDIT
  //   </Page>
  // }



  console.log(id, user, profile)

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
       
        <h3> <AiFillHeart fill={`${Theme.colors.lightGrey}`}  style={{marginRight:'5px'}}/>{num_likes} Likes</h3>
      </InfoCont>
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
    console.log('fuck')
  }


  return (
    <div>
      {page}
      {/* {profile} */}
    </div>
  )

  // if(loggedIn){
  //   return (
  //     {page}
  //   )
  // }else{//routed from clicking on someones profile){
  //   return (
  //     <div style={{display: 'flex', width:'100%', height:'100%', backgroundColor:'red'}}>This is th profile page</div>
  //   )
  // }

}

export default Profile;
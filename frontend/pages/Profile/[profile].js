import React, { useState, useEffect, useContext } from "react";

import { PageContext } from "../../utils/context";
import { useRouter } from 'next/router'

//comps 
import { Comp } from '../../pageStyles/Profile/style';

const Profile = ({ }) => {

  const { user, keyword, loggedIn } = useContext(PageContext)
  const router = useRouter()

  const { profile } = router.query

  console.log(loggedIn, 'logg,')

  //view own profile only when logged in
  //viewing other profile while logged in
  //path from nav bar will return prompt to signup if not logged in
  //view other profiles while not logged in

  var page = <Comp />

  return (
    <div>
      hello my name is 
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
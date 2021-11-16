import React, { useEffect, useState } from 'react';
import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { Page, Avatar, Gradient, Line, Header, Cover, Details, SubHeader } from '../../../pageStyles/Playlist/style';


import { useAuth } from '../../../utils/authContext'


const Playlist = ({ }) => {

    const router = useRouter()
    const { auth } = useAuth()

    const { id, playlist, user } = router.query

    const [play, setPlay] = useState()


    //for view playlist, need playlist image, playlist name, playlist tags, playlist description, playlist creator name + image, playlist songs


    // console.log(playlist, 'playlist page')

    // const getPlaylist = async () => {
    //     const res = await axios.get(`http://localhost:4200/api/single_playlist/${playlist}`)
    //     // console.log(res.data.result[0], 'red')
    //     setPlay(res.data.result[0])
    // }
    useEffect(()=>{
        // getPlaylist()
    })

    if (!auth || auth.status === "SIGNED_OUT" || !play ) {
        return <Page>Loading.....</Page>
    }

    const usr = JSON.parse(user) 

    return id === 'view' && usr == auth.user.id ? (
        <Page>
            {/* <Gradient /> */}
            {/* <h1>VIEW OWN PLAYLIST</h1> */}
            <Header>
                <Cover>
                    <img src={play.image_url ? `http://localhost:4200/playlistImage/${play.image_url}` : '/Icons/default_playlist.png'} />
                </Cover>
                <Details>
                    <div style={{display:'flex', alignItems:'center'}}>
                    <Avatar>
                        <img src={auth.user.image_url !== null ? `http://localhost:4200/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
                    </Avatar>
                    <h3>{auth.user.name}</h3>
                    </div>
                    <SubHeader>
                    
                    <h1>{play.name}</h1>

                    </SubHeader>
                </Details>
            </Header>-
        </Page>
    ) : id === 'view' && usr !== auth.user.id ? (
        <div>
            {/* <h1>VIEW OTHER PLAYLIST</h1> */}
        </div>
    ) : id === 'view' && auth.status === "SIGNED_OUT" ? (
        <div>
            {/* <h1>NOT LOGGED IN VIEWING ANY PLAYLIST</h1> */}
        </div>
    ) : id === 'edit' && usr !== auth.user.id ? (
        <div>
            {/* <h1>EDIT OWN PLAYLIST</h1> */}
        </div>
    ) : (
        <div>
            {/* <h1>SOMETHING WENT WRONG</h1> */}
        </div>
    );
}

export default Playlist;
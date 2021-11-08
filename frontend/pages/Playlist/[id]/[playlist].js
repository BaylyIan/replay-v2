import React from 'react';
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


    //for view playlist, need playlist image, playlist name, playlist tags, playlist description, playlist creator name + image, playlist songs


    // console.log(id, playlist, JSON.parse(user), 'playlist page')

    if (!auth || auth.status === "SIGNED_OUT") {
        return <Page>Loading.....</Page>
    }

    return id === 'view' && JSON.parse(user) == auth.user.id ? (
        <Page>
            <Gradient />
            {/* <h1>VIEW OWN PLAYLIST</h1> */}
            <Header>
                <Cover></Cover>
                <Details>
                    <SubHeader>

                    </SubHeader>
                </Details>
            </Header>
        </Page>
    ) : id === 'view' && JSON.parse(user) !== auth.user.id ? (
        <div>
            {/* <h1>VIEW OTHER PLAYLIST</h1> */}
        </div>
    ) : id === 'view' && auth.status === "SIGNED_OUT" ? (
        <div>
            {/* <h1>NOT LOGGED IN VIEWING ANY PLAYLIST</h1> */}
        </div>
    ) : id === 'edit' && JSON.parse(user) !== auth.user.id ? (
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
import React, { useEffect, useState } from 'react';
import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { Page, Avatar, Gradient, Line, Header, Cover, Details, SubHeader, TagWrap, Main, SongCont } from '../../../pageStyles/Playlist/style';

import TagArea from '../../../components/TagArea';
import SearchBar from '../../../components/SearchBar';
import { BsThreeDotsVertical } from 'react-icons/bs'


import { useAuth } from '../../../utils/authContext'


const Playlist = ({ }) => {

    const router = useRouter()
    const { auth } = useAuth()

    const { id, user, play } = router.query

    // const [playlist, setPlaylist] = useState()

    // console.log(JSON.parse(play), 'play')
    //for view playlist, need playlist image, playlist name, playlist tags, playlist description, playlist creator name + image, playlist songs


    // console.log(playlist, 'playlist page')

    // const getPlaylist = async () => {
    //     const res = await axios.get(`http://localhost:4200/api/single_playlist/${playlist}`)
    //     // console.log(res.data.result[0], 'red')
    //     setPlay(res.data.result[0])
    // }
    useEffect(() => {
    }, [])

    // const playlist = JSON.parse(play)
    console.log(JSON.parse(play), 'here')

    if (!auth || auth.status === "SIGNED_OUT" || !play) {
        return <Page>Loading.....</Page>
    }

    return id === 'view' && JSON.parse(user) == auth.user.id ? (
        <Page>
            <Gradient />
            {/* <h1>VIEW OWN PLAYLIST</h1> */}
            <Header>
                <Cover>
                    <img src={JSON.parse(play).image_url ? `http://localhost:4200/playlistImage/${JSON.parse(play).image_url}` : '/Icons/default_playlist.png'} />
                </Cover>
                <Details>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar>
                            <img src={auth.user.image_url !== null ? `http://localhost:4200/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
                        </Avatar>
                        <h3>{auth.user.name}</h3>

                    </div>
                    <SubHeader>

                        <h1>{JSON.parse(play).name}</h1>

                    </SubHeader>
                    <TagWrap>
                        <TagArea
                            arr={JSON.parse(play).tags}
                            showClose={false}
                        />
                    </TagWrap>

                </Details>
                {/* <BsThreeDotsVertical
                    size={30}
                    fill={Theme.colors.white}
                //  onClick={() => {
                //    router.push({
                //      pathname: "/Profile/[id]/[profile]",
                //      query: {
                //        id: 'edit',
                //        profile: auth.user.id
                //      },
                //    })
                //  }}
                /> */}
            </Header>
            <Main>
                <SearchBar 
                    text="Search Songs"
                    main={true}
                />
                <SongCont>
                    
                </SongCont>
                <SongCont>

                </SongCont>
            </Main>
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
import React, { useEffect, useState } from 'react';
import { PageContext } from "../../../utils/context";
import { useRouter } from 'next/router'
import { Theme } from '../../../styles/theme'
import axios from 'axios'

import { Page, Avatar, Gradient, Line, Header, Cover, Details, SubHeader, TagWrap, Main, SongCont, Show } from '../../../pageStyles/Playlist/style';

import TagArea from '../../../components/TagArea';
import SearchBar from '../../../components/SearchBar';
import SongBar from '../../../components/SongBar';
import { BsThreeDotsVertical } from 'react-icons/bs'


import { useAuth } from '../../../utils/authContext'
import useDebounce from '../../../utils/hooks/useDebounce'

const Playlist = ({ }) => {

    const router = useRouter()
    const { auth } = useAuth()

    const { id, user, play } = router.query

    const [searchValue, setSearchValue] = useState("")
    const [songs, setSongs] = useState([])
    const [count, setCount] = useState(10)
    const [playlistSongs, setPlaylistSongs] = useState([])
    //for view playlist, need playlist image, playlist name, playlist tags, playlist description, playlist creator name + image, playlist songs
    // let count = 0
    let temp
    const getSongs = async (value, count) => {
        const result = await axios.post(`http://localhost:4200/api/search_songs`, { string: value })
        if (result.data.result === undefined) {
            setSongs([])
            setCount(10)
            return
        }
        temp = result.data.result.slice(0, count)
        setSongs(temp)
    }

    const addSong = async (song_id) => {
        console.log(song_id)
        await axios.post(`http://localhost:4200/api/add_song`, {
            song_id: song_id,
            playlist_id: JSON.parse(play).id
        })
        getPlaylistSongs()
    }

    const getPlaylistSongs = async () => {
        const res = await axios.get(`http://localhost:4200/api/playlist_songs/${JSON.parse(play).id}`)
        console.log(res.data.result, 'all songs')
        const uniqueNames = Array.from(new Set(res.data.result));
        setPlaylistSongs(uniqueNames)
    }

    useDebounce(() => getSongs(searchValue, count), 1000, [searchValue])

    useEffect(() => {
        getPlaylistSongs()
    }, [play])


    // console.log(JSON.parse(play), 'here')

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
                        <h2>{auth.user.name}</h2>

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
                <div>
                    <SearchBar
                        main={true}
                        showSearch={false}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                    />
                </div>
                {songs && songs.length !== 0 ? <SongCont>
                    {songs && songs.length !== 0 ? songs.map((o, i) => {

                        // console.log(o)
                        return (
                            <SongBar key={i}
                                title={o.title}
                                artist={o.artist}
                                cover={o.image_url}
                                showAdd={true}
                                onClick={() => {
                                    addSong(o.id)
                                }}
                            >

                            </SongBar>

                        )
                    }) : null}
                    {songs && songs.length !== 0 && songs.length >= 10 ? <Show onClick={() => {
                        setCount(count + 10)
                        console.log(count)
                        getSongs(searchValue, count)
                    }
                    }>
                        <h3>Show more</h3>
                    </Show> : null}
                </SongCont> : null}
                {playlistSongs && playlistSongs.length !== 0 ? <SongCont>
                    {playlistSongs && playlistSongs.length !== 0 ? playlistSongs.map((o, i) => {

                        // console.log(o)
                        return (
                            <SongBar key={i}
                                title={o.title}
                                artist={o.artist}
                                cover={o.image_url}
                                showAdd={false}
                            >

                            </SongBar>

                        )
                    }) : null}
                </SongCont> : null}
            </Main>
        </Page>
    ) : id === 'view' && JSON.parse(user) !== auth.user.id ? (
        <div>
            <h1>VIEW OTHER PLAYLIST</h1>
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
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Theme } from '../../styles/theme'
import axios from 'axios'

import { Page, Avatar, Gradient, Line, Header, Cover, Details, SubHeader, TagWrap, Main, SongCont, Show } from '../../pageStyles/Playlist/style';

import TagArea from '../../components/TagArea';
import SearchBar from '../../components/SearchBar';
import SongBar from '../../components/SongBar';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DB_URL } from '../../utils/constants'

import { useAuth } from '../../utils/authContext'
import useDebounce from '../../utils/hooks/useDebounce'

const Playlist = ({ playlist }) => {

    const { auth } = useAuth()

    const [searchValue, setSearchValue] = useState("")
    const [songs, setSongs] = useState([])
    const [count, setCount] = useState(10)
    const [playlistSongs, setPlaylistSongs] = useState(playlist.songs)

    let temp
    const getSongs = async (value, count) => {
        const result = await axios.post(`${DB_URL}/api/search_songs`, { string: value })
        if (result.data.result === undefined) {
            setSongs([])
            setCount(10)
            return
        }
        temp = result.data.result.slice(0, count)
        setSongs(temp)
    }

    const addSong = async (song_id) => {
        await axios.post(`${DB_URL}/api/add_song`, {
            song_id: song_id,
            playlist_id: playlist.id
        })
        const songs = await axios.get(`${DB_URL}/api/playlist_songs/${playlist.id}`)
        const uniqueSongs = Array.from(new Set(songs.data.result));
        setPlaylistSongs(uniqueSongs)
    }

    useDebounce(() => getSongs(searchValue, count), 1000, [searchValue])

    if (!auth || auth.status === "SIGNED_OUT") {
        return <Page>Loading.....</Page>
    }

    return (
        <Page>
            <Gradient />
            {/* <h1>VIEW OWN PLAYLIST</h1> */}
            <Header>
                <Cover>
                    <img src={playlist.image_url ? `${DB_URL}/playlistImage/${playlist.image_url}` : '/Icons/default_playlist.png'} />
                </Cover>
                <Details>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar>
                            <img src={playlist.creator.name !== null ? `${DB_URL}/profileImage/${playlist.creator.image}` : '/Icons/default_profile.png'} />
                        </Avatar>
                        <h2>{auth.user.name}</h2>
                    </div>
                    <SubHeader>
                        <h1>{playlist.name}</h1>
                    </SubHeader>
                    <TagWrap>
                        <TagArea
                            arr={playlist.tags}
                            showClose={false}
                        />
                    </TagWrap>
                </Details>
            </Header>
            <Main>
                <div>{auth.user.id === playlist.user_id ? <SearchBar
                        main={true}
                        showSearch={false}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                    /> : null}
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
    )

    // return id === 'view' && JSON.parse(user) == auth.user.id ? (
    //     <Page>
    //         <Gradient />
    //         {/* <h1>VIEW OWN PLAYLIST</h1> */}
    //         <Header>
    //             <Cover>
    //                 <img src={JSON.parse(play).image_url ? `${DB_URL}/playlistImage/${JSON.parse(play).image_url}` : '/Icons/default_playlist.png'} />
    //             </Cover>
    //             <Details>
    //                 <div style={{ display: 'flex', alignItems: 'center' }}>
    //                     <Avatar>
    //                         <img src={auth.user.image_url !== null ? `${DB_URL}/profileImage/${auth.user.image_url}` : '/Icons/default_profile.png'} />
    //                     </Avatar>
    //                     <h2>{auth.user.name}</h2>

    //                 </div>
    //                 <SubHeader>

    //                     <h1>{JSON.parse(play).name}</h1>

    //                 </SubHeader>
    //                 <TagWrap>
    //                     <TagArea
    //                         arr={JSON.parse(play).tags}
    //                         showClose={false}
    //                     />
    //                 </TagWrap>

    //             </Details>
    //             {/* <BsThreeDotsVertical
    //                 size={30}
    //                 fill={Theme.colors.white}
    //             //  onClick={() => {
    //             //    router.push({
    //             //      pathname: "/Profile/[id]/[profile]",
    //             //      query: {
    //             //        id: 'edit',
    //             //        profile: auth.user.id
    //             //      },
    //             //    })
    //             //  }}
    //             /> */}
    //         </Header>
    //         <Main>
    //             <div>
    //                 <SearchBar
    //                     main={true}
    //                     showSearch={false}
    //                     onChange={(e) => {
    //                         setSearchValue(e.target.value)
    //                     }}
    //                 />
    //             </div>
    //             {songs && songs.length !== 0 ? <SongCont>
    //                 {songs && songs.length !== 0 ? songs.map((o, i) => {

    //                     // console.log(o)
    //                     return (
    //                         <SongBar key={i}
    //                             title={o.title}
    //                             artist={o.artist}
    //                             cover={o.image_url}
    //                             showAdd={true}
    //                             onClick={() => {
    //                                 addSong(o.id)
    //                             }}
    //                         >

    //                         </SongBar>

    //                     )
    //                 }) : null}
    //                 {songs && songs.length !== 0 && songs.length >= 10 ? <Show onClick={() => {
    //                     setCount(count + 10)
    //                     console.log(count)
    //                     getSongs(searchValue, count)
    //                 }
    //                 }>
    //                     <h3>Show more</h3>
    //                 </Show> : null}
    //             </SongCont> : null}
    //             {playlistSongs && playlistSongs.length !== 0 ? <SongCont>
    //                 {playlistSongs && playlistSongs.length !== 0 ? playlistSongs.map((o, i) => {

    //                     // console.log(o)
    //                     return (
    //                         <SongBar key={i}
    //                             title={o.title}
    //                             artist={o.artist}
    //                             cover={o.image_url}
    //                             showAdd={false}
    //                         >

    //                         </SongBar>

    //                     )
    //                 }) : null}
    //             </SongCont> : null}
    //         </Main>
    //     </Page>
    // ) : id === 'view' && JSON.parse(user) !== auth.user.id ? (
    //     <div>
    //         {/* <h1>VIEW OTHER PLAYLIST</h1> */}
    //         <Page>
    //         <Gradient />
    //         {/* <h1>VIEW OWN PLAYLIST</h1> */}
    //         <Header>
    //             <Cover>
    //                 <img alt='' src={JSON.parse(play).image_url ? `${DB_URL}/playlistImage/${JSON.parse(play).image_url}` : '/Icons/default_playlist.png'} />
    //             </Cover>
    //             <Details>
    //                 <div style={{ display: 'flex', alignItems: 'center' }}>
    //                     <Avatar>
    //                         <img alt='' src={otherUser.image_url !== null ? `${DB_URL}/profileImage/${otherUser.image_url}` : '/Icons/default_profile.png'} />
    //                     </Avatar>
    //                     <h2>{otherUser.name}</h2>

    //                 </div>
    //                 <SubHeader>

    //                     <h1>{JSON.parse(play).name}</h1>

    //                 </SubHeader>
    //                 <TagWrap>
    //                     <TagArea
    //                         arr={JSON.parse(play).tags}
    //                         showClose={false}
    //                     />
    //                 </TagWrap>

    //             </Details>
    //             {/* <BsThreeDotsVertical
    //                 size={30}
    //                 fill={Theme.colors.white}
    //             //  onClick={() => {
    //             //    router.push({
    //             //      pathname: "/Profile/[id]/[profile]",
    //             //      query: {
    //             //        id: 'edit',
    //             //        profile: auth.user.id
    //             //      },
    //             //    })
    //             //  }}
    //             /> */}
    //         </Header>
    //         <Main>

    //             {songs && songs.length !== 0 ? <SongCont>
    //                 {songs && songs.length !== 0 ? songs.map((o, i) => {

    //                     // console.log(o)
    //                     return (
    //                         <SongBar key={i}
    //                             title={o.title}
    //                             artist={o.artist}
    //                             cover={o.image_url}
    //                             showAdd={true}
    //                             onClick={() => {
    //                                 addSong(o.id)
    //                             }}
    //                         >

    //                         </SongBar>

    //                     )
    //                 }) : null}
    //                 {songs && songs.length !== 0 && songs.length >= 10 ? <Show onClick={() => {
    //                     setCount(count + 10)
    //                     console.log(count)
    //                     getSongs(searchValue, count)
    //                 }
    //                 }>
    //                     <h3>Show more</h3>
    //                 </Show> : null}
    //             </SongCont> : null}
    //             {playlistSongs && playlistSongs.length !== 0 ? <SongCont>
    //                 {playlistSongs && playlistSongs.length !== 0 ? playlistSongs.map((o, i) => {

    //                     // console.log(o)
    //                     return (
    //                         <SongBar key={i}
    //                             title={o.title}
    //                             artist={o.artist}
    //                             cover={o.image_url}
    //                             showAdd={false}
    //                         >

    //                         </SongBar>

    //                     )
    //                 }) : null}
    //             </SongCont> : null}
    //         </Main>
    //     </Page>
    //     </div>
    // ) : id === 'view' && auth.status === "SIGNED_OUT" ? (
    //     <div>
    //         {/* <h1>NOT LOGGED IN VIEWING ANY PLAYLIST</h1> */}
    //     </div>
    // ) : id === 'edit' && JSON.parse(user) !== auth.user.id ? (
    //     <div>
    //         {/* <h1>EDIT OWN PLAYLIST</h1> */}
    //     </div>
    // ) : (
    //     <div>
    //         {/* <h1>SOMETHING WENT WRONG</h1> */}
    //     </div>
    // );
}

// This function gets called at build time
export async function getStaticProps({ params }) {

    const res = await axios.get(`${DB_URL}/api/single_playlist/${params.playlist}`)
    const playlist = res.data.result[0]

    const tags = await axios.get(`${DB_URL}/api/playlist_tags/${playlist.id}`)
    playlist.tags = tags.data.tags.map(o => o.tag = { tag: o.text })

    const songs = await axios.get(`${DB_URL}/api/playlist_songs/${playlist.id}`)
    const uniqueSongs = Array.from(new Set(songs.data.result));
    playlist.songs = uniqueSongs

    const profile = await axios.get(`${DB_URL}/api/profile_by_id/${playlist.user_id}`)
    playlist.creator = {
        name: profile.data.result[0].name,
        image: profile.data.result[0].image_url
    }

    // console.log(profile.data.result[0], 'songs')

    return {
        props: { playlist },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await axios.get(`${DB_URL}/api/playlists`)

    let playlists = res.data.playlists
    const paths = playlists.map((playlist) => ({
        params: { playlist: playlist.id.toString() },

    }))

    return { paths, fallback: false }
}


export default Playlist;
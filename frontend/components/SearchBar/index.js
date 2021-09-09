import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Icon } from './style'
import { useRouter } from "next/router";

import { AiOutlineSearch } from 'react-icons/ai'
import { Theme } from '../../styles/theme';

const SearchBar = ({ onChange, onSearch }) => {

    const router = useRouter();

    //not sure is router.patname([playlist]) will work
    //figure out a way to show different placeholder for users profile vs. another users profile

    if (router.route.startsWith('/Explore')) {
        return (
            <Container show={true}>
                <Input type="text" placeholder="Search for playlists by name, account, or tag"
                    onChange={onChange}
                />
                <Icon onClick={onSearch}>
                    <AiOutlineSearch size={22} fill={Theme.colors.white} />
                </Icon>
            </Container>
        )
    } else if (router.pathname.startsWith("/Profile")) {
        return (
            <Container show={true}>
                <Input type="text" placeholder="Search my playlists"
                    onChange={onChange}
                />
                <Icon onClick={onSearch}>
                    <AiOutlineSearch size={22} fill={Theme.colors.white} />
                </Icon>
            </Container>
        )
    } else if (router.pathname.startsWith("/[playlist]")) {
        return (
            <Container show={true}>
                <Input type="text" placeholder="Search songs"
                    onChange={onChange}
                />
                <Icon onClick={onSearch}>
                    <AiOutlineSearch size={22} fill={Theme.colors.white} />
                </Icon>
            </Container>
        )
    } else if (router.pathname.startsWith("/") && !router.pathname.startsWith("/CreatePlaylist")) {
        return (
            <Container show={true}>
                <Input type="text" placeholder="Search playlists"
                    onChange={onChange}
                />
                <Icon onClick={onSearch}>
                    <AiOutlineSearch size={22} fill={Theme.colors.white} />
                </Icon>
            </Container>
        )
    } else if (router.pathname.startsWith("/CreatePlaylist")) {
        return null
    }
}

SearchBar.defaultProps = {
    onSearch: () => { },
    onChange: () => { }
}

SearchBar.propTypes = {

}

export default SearchBar;
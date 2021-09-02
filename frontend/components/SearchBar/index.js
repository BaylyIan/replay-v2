import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Icon } from './style'
import { useRouter } from "next/router";

import { AiOutlineSearch } from 'react-icons/ai'
import { Theme } from '../../styles/theme';

const SearchBar = ({ onChange, onSearch}) => {

    const router = useRouter();

    //not sure is router.patname([playlist]) will work
    //figure out a way to show different placeholder for users profile vs. another users profile

    return (
        <Container>
            {router.pathname = "/" ?
                <Input type="text" placeholder="Search playlists"
                    onChange={onChange}
                />
            : router.pathname.startsWith("/Explore") ?
                <Input type="text" placeholder="Search for playlists by name, account, or tag"
                    onChange={onChange}
                />
            : router.pathname.startsWith("/Profile") ?
                <Input type="text" placeholder="Search my playlists"
                    onChange={onChange}
                />
            : router.pathname.startsWith("/[playlist]") ?
                <Input type="text" placeholder="Search playlist"
                    onChange={onChange}
                />
            : null }

            <Icon onClick={onSearch}>
                <AiOutlineSearch size={22} fill={Theme.colors.white} />
            </Icon>
        </Container>
    );
}

SearchBar.defaultProps = {
    onSearch: () => { }, 
    onChange:() => { }
}

SearchBar.propTypes = {

}

export default SearchBar;
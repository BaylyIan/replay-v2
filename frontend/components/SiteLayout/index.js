import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

//utills
import { Theme } from '../../styles/theme';
import { PageContext } from "../../utils/context";
import { useRouter } from "next/router";
import { useModal } from "../../utils/useModal"
import { useAuth } from "../../utils/authContext"

//comps
import { Container, Nav, Header, Page, NavHeader, Icon, ItemWrap, NavFooter, Slider, Indicator, ToggleCont, UserCont, HeaderGradient, SearchCont, PageTitle } from './style'
import NavItem from '../NavItem'
import Button from '../Button'
import Avatar from '../Avatar'
import SearchBar from '../SearchBar'
import { RiHomeLine, RiCompassLine, RiUserLine, RiAddLine } from 'react-icons/ri'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import CustomModal from '../../components/Modal'
import Form from '../Form'
import CreatePlaylist from '../../components/CreatePlaylist'

const SiteLayout = ({ children }) => {

    //context
    const { keyword, setKeyword, toggle, setToggle } = useContext(PageContext);
    const { auth, login, register } = useAuth()

    //modals
    const [showReg, setShowReg, toggleReg] = useModal()
    const [showCreate, setShowCreate, toggleCreate] = useModal()
    const [formToggle, setFormToggle] = useState()


    const router = useRouter()
    const { id, params } = router.query;
    // console.log(router.route.startsWith('/Profile'), 'params')
    // console.log(auth.user, 'siteLay auth')

    // const [toggle, setToggle] = useState(true)
    const [tabs, setTabs] = useState()
    const [pageName, setPageName] = useState("Home")

    const handleTabs = () => {
        if (router.route.startsWith("/Profile")) {
            setTabs(3)
        } else if (router.route.startsWith("/Explore")) {
            setTabs(2)
        }
        else if (router.route.startsWith("/CreatePlaylist")) {
            setTabs(4)
        } else if (router.route.startsWith("/")) {
            setTabs(1)
        }
    }

    const selectTab = (tab) => {
        switch (tab) {
            case tab = 1:
                setPageName("Home")
                router.push("/")
                console.log(tabs)
                break;
            case tab = 2:
                setPageName("Explore")
                router.push('/Explore')
                break;
            case tab = 3:
                setPageName("Profile")
                if (auth.status === "SIGNED_IN") {
                    router.push({
                        pathname: "/Profile/[id]/[profile]",
                        query: {
                            id: 'view',
                            profile: auth.user.id
                        },
                    });
                } else {
                    console.log('show')
                    setShowReg(true)
                }
                break;
        }
    }

    const handleKeyword = (e) => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        handleTabs()
        // console.log(user, 'new')
    })

    return (
        <>
            <Container>
                <Nav toggle={toggle}>
                    <NavHeader toggle={toggle}>
                        <Icon header={true}>
                            <img src={'/Icons/play.png'} />
                        </Icon>
                        {!toggle ? <h1>Replay</h1> : null}
                    </NavHeader>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <ItemWrap>
                            <NavItem
                                icon={<RiHomeLine size={25}
                                    fill={tabs === 1 ? Theme.colors.white : Theme.colors.lightGrey} />}
                                toggle={toggle}
                                selected={tabs === 1}
                                text={'Home'}
                                onClick={() => {
                                    setTabs(1)
                                    selectTab(1)
                                }}
                            >
                            </NavItem>
                            <NavItem
                                icon={<RiCompassLine size={25}
                                    fill={tabs === 2 ? Theme.colors.white : Theme.colors.lightGrey} />}
                                toggle={toggle}
                                selected={tabs === 2}
                                text={'Explore'}
                                onClick={() => {
                                    setTabs(2)
                                    selectTab(2)
                                }}
                            >
                            </NavItem>
                            <NavItem
                                icon={<RiUserLine size={25}
                                    fill={tabs === 3 ? Theme.colors.white : Theme.colors.lightGrey} />}
                                toggle={toggle}
                                selected={tabs === 3}
                                text={'Profile'}
                                onClick={() => {
                                    setTabs(3)
                                    selectTab(3)
                                }}
                            >
                            </NavItem>
                        </ItemWrap>
                        <Slider>
                            <Indicator slide={tabs} />
                        </Slider>
                    </div>
                    <NavFooter toggle={toggle}>
                        <Button
                            color={Theme.colors.orange}
                            icon={<RiAddLine size={24} fill={Theme.colors.white} />}
                            showIcon={true}
                            text={toggle ? null : 'Create Playlist'}
                            textColor={`${Theme.colors.white}`}
                            width={toggle ? '51px' : 'calc(100% - 25px)'}
                            height={'51px'}
                            onClick={() => {
                                setShowCreate(true)
                            }}
                        />
                        <UserCont toggle={toggle}>
                            <Avatar />
                            {!toggle && auth.status === "SIGNED_IN" ? <h3 style={{ color: `${Theme.colors.white}` }}>{auth.user.name}</h3> : null}
                        </UserCont>
                        <ToggleCont toggle={toggle} onClick={() => {
                            setToggle(!toggle)
                        }}>
                            {toggle ? <BsToggleOff size={30} fill={Theme.colors.white} /> :
                                <><p style={{ color: `${Theme.colors.lightGrey}`, marginRight: "18px" }}>Toggle Sidebar</p><BsToggleOn size={30} fill={Theme.colors.white} /></>}
                        </ToggleCont>
                    </NavFooter>
                </Nav>
                <Header toggle={toggle} >
                    <HeaderGradient>
                        <SearchCont>
                            <PageTitle><h3 style={{ color: `${Theme.colors.white}` }}>{router.pathname.startsWith("/CreatePlaylist") ? null : pageName}</h3></PageTitle>
                            <SearchBar onChange={(handleKeyword)} />
                        </SearchCont>
                    </HeaderGradient>
                </Header>


                <CustomModal
                    title="Create Playlist"
                    isActive={showCreate}
                    handleClose={() => {
                        setShowCreate(false)
                        console.log('hai')
                    }
                    }
                    children={<CreatePlaylist

                    />}
                />
                <CustomModal
                    title="Login or Signup to view the profile page"
                    isActive={showReg}
                    handleClose={() => setShowReg(false)}
                    children={<Form
                        toggle={formToggle}
                        onChangeToggle={() => {
                            setShowReg(!toggleReg)
                        }}
                    />}
                />
                <Page toggle={toggle}>
                    {children}
                </Page>

            </Container>
        </>
    );
}

SiteLayout.defaultProps = {

}

SiteLayout.propTypes = {

}

export default SiteLayout;
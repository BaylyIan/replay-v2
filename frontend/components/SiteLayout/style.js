import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE } from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    min-width:100%;
    min-height:100vh;
    flex-direction: column;
    overflow-y: hidden;
    /* border:1px solid green; */
`;
export const Nav = styled.div`
    min-width:${({ toggle }) => toggle ? '81px' : '300px'};
    height:100%;
    background-color:${Theme.colors.darkGrey};
    display:flex;
    flex-direction:column;
    position: absolute;
    z-index:1;
    padding:${({ toggle }) => toggle ? '0px 0px 0px 10px' : '0px 0px 0px 20px'};
    /* border:1px solid blue; */
    @media (max-width: ${SMALL}){
        min-width:${({ toggle }) => toggle ? '61px' : '300px'};
    }
    @media (max-width: ${MED}){
        min-width:${({ toggle }) => toggle ? '65px' : '300px'};
    }
`;
export const NavHeader = styled.div`
    width:100%;
    height:110px;
    display:flex;
    align-items:center;
    justify-content:${({ toggle }) => toggle ? 'center' : 'flex-start'};
    padding-left:${({ toggle }) => toggle ? null : '24px'};
    /* border:1px solid blue; */
    margin-right:${({ toggle }) => toggle ? '8px' : null};
    & > h1 {
        color:${Theme.colors.white};
        margin-left:16px;
    }
`;
export const Icon = styled.div`
    width:${({ header }) => header ? '24px' : '20px'};
    height:${({ header }) => header ? '24px' : '20px'};
    /* border:1px solid red; */
    display:flex;
    object-fit:cover;
    align-items:center;
    justify-content: center;
    & > img{
        width:100%;
        height:auto;
    }
`;
export const ItemWrap = styled.div`
    display:flex;
    flex-direction:column;
    height:175px;
    /* border:1px solid green; */
    justify-content: space-between;
    width:100%;

`;
export const NavFooter = styled.div`
    width:100%;
    height:244px;
    display:flex;
    flex-direction: column;
    justify-content:flex-end;
    align-items:${({ toggle }) => toggle ? 'center' : 'flex-start'};
    flex-grow:1;
    padding-right:${({ toggle }) => toggle ? '10px' : null};
    & > * {
        margin-bottom:10px;
    }
    `;
export const Slider = styled.div`
    width:4px;
    height:100%;
    `;
export const Indicator = styled.div`
    width:4px;
    height:51px;
    display:${({ slide }) => slide === 4 ? 'none' : 'block'};
    background-color:${Theme.colors.orange};
    transform:${({ slide }) => slide === 1 ? 'translateY(0)' : null || slide === 2 ? 'translateY(122%)' : null || slide === 3 ? 'translateY(242%)' : null};
    transition: transform 150ms ease-in-out;
    border-radius: 5px;
    @media (max-width: ${SMALL}){
        height:48px;
        transform:${({ slide }) => slide === 1 ? 'translateY(0)' : null || slide === 2 ? 'translateY(180%)' : null || slide === 3 ? 'translateY(280%)' : null};
    }
    @media (max-width: ${MED}){
        height:48px;
        transform:${({ slide }) => slide === 1 ? 'translateY(0)' : null || slide === 2 ? 'translateY(135%)' : null || slide === 3 ? 'translateY(265%)' : null};
    }
    `;
export const ToggleCont = styled.div`
    width:100%;
    display:flex;
    /* border:1px solid green; */
    margin-right:${({ toggle }) => toggle ? '5px' : null};
    align-items:center;
    justify-content:center;
    `;
export const UserCont = styled.div`
    width:100%;
    display:flex;
    align-items:Center;
    justify-content:${({ toggle }) => toggle ? 'center' : 'flex-start'};
    /* border:1px solid red; */
    margin-bottom:40px;
    margin-top:10px;
    /* margin-left:${({ toggle }) => toggle ? null : '8px'}; */
    & > :nth-child(2) {
        margin-left:${({ toggle }) => toggle ? null : '20px'}
    }
    `;
export const HeaderGradient = styled.div`
    width:100%;
    height:80px;
    background: linear-gradient(180deg, #050505 50%, rgba(18, 18, 18, 0) 100%, rgba(5, 5, 5, 0) 100%);
    `;
export const Header = styled.div`
    width:${({ toggle }) => toggle ? `calc(100% - 81px)` : `calc(100% - 300px)`};
    height: 58px;
    background-color:${Theme.colors.black};
    position:absolute;
    z-index:2;
    right:0;
    @media (max-width: ${SMALL}){
        width:${({ toggle }) => toggle ? `calc(100% - 61px)` : `calc(100% - 300px)`};
    }
    @media (max-width: ${MED}){
        width:${({ toggle }) => toggle ? `calc(100% - 71px)` : `calc(100% - 300px)`};
    }
`;
export const SearchCont = styled.div`
    display:flex;
    width:100%;
    height:58px;
    justify-content: center;
    align-items: center;
    padding:0px 30px 0px 0px;
    /* border:1px solid green; */
    @media (max-width: ${SMALL}){
        padding:0px 5px 0px 5px;
    }
    @media (max-width: ${MED}){
        padding:0px 18px 0px 18px;
    }
`;
export const PageTitle = styled.div`
    display:flex;
    height:100%;
    /* border:1px solid blue; */
    align-items:center;
    justify-content:center;
    min-width:140px;
    @media (max-width: ${MED}){
        display:none;
    }
`;
export const Page = styled.div`
    z-index: 0;
    height: 100%;
    overflow-y:scroll;
    position:relative;
    padding-top:58px;
    /* border:1px solid red; */
    background-color:${Theme.colors.medGrey};
    margin-left: ${({ toggle }) => toggle ? '81px' : '300px'};
    @media (max-width: ${SMALL}){
        margin-left:${({ toggle }) => toggle ? '52px' : '300px'};
    }
    @media (max-width: ${MED}){
        margin-left:${({ toggle }) => toggle ? '70px' : '300px'};
    }
`;
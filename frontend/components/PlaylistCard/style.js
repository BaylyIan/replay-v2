import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    border:1px solid red;
    padding: 10px 20px 10px 20px;
    background-size: cover;
    background-repeat: no-repeat;
    /* opacity: 0; */
    transition: opacity 0.4s ease-in;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    aspect-ratio:1/ 1.7;
    /* min-height:${({ toggle }) => toggle ? '650px' : '580px'}; */
    /* &:hover {
    opacity: 1 !important;
  } */
    `;

export const Header = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    border:1px solid blue;
    height:80px;
    & > h2 {
        margin-left:15px;
        color:${Theme.colors.white};
    }
`;
export const Avatar = styled.div`
    aspect-ratio:1/1;
    border-radius: 50%;
    border:1px solid green;
    width:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    object-fit:cover;
    border-radius: 50%;
    /* border:1px solid red; */
    & > img{
        width:100%;
        height:100%;
        border-radius: 50%;
    }
   @media (max-width: ${MED}){
        width:45px;
    }
    @media (max-width: ${SMALL}){
        width:35px;
    }
`;
export const Cover = styled.div`
    width:100%;
    aspect-ratio: 1 / 1;
    display:flex;
    object-fit:cover;
    overflow:hidden;
    border:1px solid purple;
    & > img {
        height:100%;
        width:100%;
        object-fit:cover;
        overflow: hidden;
    }
`;
export const TitleCont = styled.div`
    width:100%;
    display: flex;
    height: 10%;
    border:1px solid green;
    justify-content: space-between;
    align-items: center;
    & > h1 {
        margin-left:5px;
        color:${Theme.colors.white};
        font-size: 2vw;
        /* @media (max-width: ${MED}){
            font-size: 3vw;
        } */
        /* @media (max-width: ${SMALL}){
            font-size: 12px;
        } */
    }
`;
export const PlaylistButton = styled.button`
    width:120px;
    height:32px;
    color:${Theme.colors.white};
    display:flex;
    align-items:center;
    justify-content: center;
    background-color: ${Theme.colors.orange};
    border:none;
    border-radius: 7px;

`;
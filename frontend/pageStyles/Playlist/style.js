import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Page = styled.div`
    display:flex;
    flex-direction:column;
    padding:50px 10px 0px 10px;
    align-items:Center;
    position:relative;
    z-index:1;
    & > h1 {
        margin-top:40px;
        color:${Theme.colors.white};
        font-size:26px;
        z-index:4;
    }
    /* border:1px solid red; */
`;

export const Gradient = styled.div`
    width:100%;
    height: 30vh;
    background: linear-gradient(180deg, #423F46 0%, #1E1C21 100%);
    position:absolute;
    top:0;
    z-index:1;
    max-height:300px;
`;

export const Avatar = styled.div`
    aspect-ratio:1/1;
    border-radius: 50%;
    /* border:1px solid green; */
    width:40px;
    display:flex;
    justify-content:center;
    align-items:center;
    object-fit:cover;
    border-radius: 50%;
    margin-right:8px;
    /* border:1px solid red; */
    & > img{
        width:100%;
        height:100%;
        border-radius: 50%;
        object-fit:cover;
    }
   /* @media (max-width: ${MED}){
        width:45px;
    }
    @media (max-width: ${SMALL}){
        width:35px;
    } */
`;
export const Line = styled.div`
    width:2px;
    height:100%;
    background-color: ${Theme.colors.lightGrey};
    position:absolute;
    left:50%;
`;
export const Header = styled.div`
    display:flex;
    width:100%;
    height:auto;
    border:1px solid red;
    z-index:2;
    flex-wrap: wrap;
    display:flex;
    padding-left:20px;
    @media (max-width: ${MED}){
        flex-direction:column;
        align-items:center;
        padding-left:0px;
    }

`;
export const Cover = styled.div`
    width:250px;
    height:250px;
    display:flex;
    align-items:center;
    box-shadow: 0px 3px 32px 12px rgba(0, 0, 0, 0.25);
    /* border:1px solid blue; */
    & > img {
        width:100%;
        height:100%;
        object-fit:cover;
    }
`;
export const Details = styled.div`
    display:flex;
    flex-direction: column;
    /* border:1px solid green; */
    min-width:420px;
    padding:10px 0px 10px 20px;
    @media (max-width: ${MED}){
        margin-top:20px;
        min-width:100%;
        padding-right:20px;
    }
    & > div {
            & > h3 {
                color:${Theme.colors.white};
            }
    }
`;
export const SubHeader = styled.div`
    width:100%;
    display:flex;
    justify-items: space-between;
    /* border:1px solid magenta; */
    padding:39px 10px;
    & > h1 {
        color:${Theme.colors.white};
    }
    @media (max-width: ${MED}){
        padding:34px 10px;
    }
    @media (max-width: ${SMALL}){
        /* padding:10px 10px; */
    }
`;
export const TagWrap = styled.div`
    width:100%;
    height:70px;
    display:flex;
    flex-wrap: wrap;
    border-top:1px solid ${Theme.colors.lightGrey};
    /* border:1px solid red; */
    align-items:center;
`;
export const Main = styled.div`
    width:100%;
    height:auto;
    border:1px solid blue;
    padding:30px 0px 0px 0px;

`;
export const SongCont = styled.div`
    width:100%;
    height:auto;
    background: #121212;
    border-radius: 15px;
    margin:30px 0px 0px 0px;
`;
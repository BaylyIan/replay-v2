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
    /* padding:10px 20px 10px 20px; */
    border:1px solid red;
    z-index:2;
    flex-wrap: wrap;

`;
export const Cover = styled.div`
    min-width:250px;
    min-height:250px;
    display:flex;
    align-items:center;
    object-fit: cover;
    border:1px solid blue;
    & > img {
        width:100%;
        height:100%;
        object-fit:contain;
    }
`;
export const Details = styled.div`
    display:flex;
    flex-direction: column;
    border:1px solid green;
    min-width:400px;
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
    border:1px solid magenta;
    padding:50px 10px;
    & > h1 {
        color:${Theme.colors.white};
    }
`;
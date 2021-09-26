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
        color:${Theme.colors.white};
        font-size:26px;
        margin-top:40px;
        z-index:4;

    }
`;

export const Gradient = styled.div`
    width:100%;
    height: 30vh;
    background: linear-gradient(180deg, #423F46 0%, #1E1C21 100%);
    position:absolute;
    top:0;
    z-index:2;
    max-height:300px;
`;

export const Avatar = styled.div`
    /* aspect-ratio:1/1; */
    border-radius: 50%;
    border:4px solid ${Theme.colors.white};
    height:160px;
    width:160px;
    display:flex;
    justify-content:center;
    align-items:center;
    object-fit:cover;
    z-index:3;
    & > img{
        width:100%;
        height:100%;
        border-radius: 50%;
    }
   @media (max-width: ${MED}){
    height:140px;
    width:140px;
    }
`;

export const InfoCont = styled.div`
    width:185px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    /* border:1px solid red; */
    position:relative;
    margin-top:20px;
    z-index:4;

    & > h3 {
        color:${Theme.colors.lightGrey};
        display:flex;
        align-items:center;
    }
`;
export const Line = styled.div`
    width:2px;
    height:100%;
    background-color: ${Theme.colors.lightGrey};
    position:absolute;
    left:50%;
`;
export const Wrap = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: minmax(200px, auto);
    grid-gap: 20px;
    width: 100%;
    min-height: auto;
    margin-top:40px;
    /* & > * {
        margin:10px;
    } */
    @media (min-width: 550px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(2, minmax(200px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 750px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(3, minmax(200px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 980px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(4, minmax(200px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 1200px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(5, minmax(200px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 1650px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(6, minmax(200px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 1900px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(7, minmax(200px, 1fr))' : null};
        padding: 20px;
    }

    @media (min-width: 750px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(2, minmax(200px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1000px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(3, minmax(200px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1250px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(4, minmax(200px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1450px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(5, minmax(200px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1750px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(6, minmax(200px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 2090px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(7, minmax(200px, 1fr))'};
        padding: 20px;
    } 
`;
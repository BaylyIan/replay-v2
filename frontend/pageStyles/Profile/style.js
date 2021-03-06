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
    z-index:-1;
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
    overflow:hidden;
    z-index:3;
    & > img {
        height:100%;
        width:100%;
        object-fit:cover;
        overflow: hidden;
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

export const LoginCont = styled.div`
    width:50%;
    min-width:350px;
    max-width:500px;
    height:auto;
    padding:30px 20px 30px 20px;
    display:flex;
    border: 1px solid green;
    background-color:${Theme.colors.darkGrey};
    flex-direction: column;
    position:absolute;
    /* @media (max-width: ${MED}){
        margin-top:40%;
    } */
    & > h1 {
        color:${Theme.colors.white};
        font-size:26px;
        z-index:4;
        margin-bottom:100px;
    }
`;

export const NoUserWrap = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    border:1px solid red;
    width:100%;
    min-height:100%;
    max-height:100%;
    position:absolute;
    top:0;
`;

export const UserCont = styled.label`
    display:flex;
    width:180px;
    /* border:1px solid green; */
    height:auto;
    justify-content:flex-end;
    z-index:5;
`;
export const FileInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
`;

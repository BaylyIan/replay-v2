import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:100%;
    height:auto;
    background-color:${Theme.colors.black};
    display:flex;
    flex-direction:row;
    max-width:700px;
    /* padding:0px 20px 0px 20px; */
    /* border:1px solid red; */
    @media (max-width: ${MED}){
        /* padding:0px 20px 0px 20px; */
        flex-direction:column;
        max-width:700px;
    }
    & > h1 {
        color:${Theme.colors.white};
    }
`;
export const Wrap = styled.div`
    display:flex;
    width:100%;
    height:500px;
    min-height:200px;
    /* border:1px solid red; */
    flex-wrap: wrap;
    align-items: center;
    @media (max-width: ${MED}){
        height:auto;
    }
`;
export const PhotoWrap = styled.form`
    flex:3;
    height: auto;
    min-width:350px;
    display:flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center;; */
    position:relative;
    object-fit:cover;
    overflow:hidden;
    /* border:1px solid blue; */
    @media (max-width: ${MED}){
        min-width:calc(100% - 10px);
    }
    @media (max-width: ${SMALL}){
        min-width:calc(100% - 5px);
    }
`;
export const PhotoCont = styled.div`
    width:280px;
    height:280px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${Theme.colors.orange};
    & > img {
        height:100%;
        width:100%;
        object-fit:cover;
        overflow: hidden;
    }
`;
export const FileLabel = styled.label`
    width:150px;
    height:51px;
    /* background-color:${Theme.colors.orange}; */
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
    cursor:pointer;
    border:1px solid ${Theme.colors.orange};
    border-radius: 7px;
    @media (max-width: ${MED}){
    }
`;
export const FileInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
`;
export const FormWrap = styled.div`
    flex:4;
    height: 100%;
    min-width:300px;
    position:relative;
    /* border:1px solid red; */
    & > div {
        display:flex;
        height:100%;
        flex-direction: column;
        padding:0px 20px 0px 20px;
        /* border:1px solid green; */
        & > * {
            margin-bottom:8px;
        }
    }
    @media (max-width: ${MED}){
        min-width:300px;
    }
    @media (max-width: ${SMALL}){
        min-width:240px;
    }
`;
export const TagWrap = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-wrap: wrap;
    /* border:1px solid red; */

`;
export const ButtonWrap = styled.div`
    width:100%;
    height:auto;
    display:flex;
    /* border:1px solid red; */
    justify-content: flex-end;
    /* margin-top:35px; */
`;

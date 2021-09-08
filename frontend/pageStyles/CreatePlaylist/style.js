import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:100%;
    height:100%;
    background-color:${Theme.colors.medGrey};
    display:flex;
    align-items:Center;
    justify-content:center;
    flex-direction:column;
    padding:0px 20px 0px 20px;
    @media (max-width: ${SMALL}){
        padding:0px 10px 0px 10px;
    }
    & > h1 {
        color:${Theme.colors.white};
        margin-bottom: 30px;
    }
`;
export const Wrap = styled.div`
    display:flex;
    width:100%;
    height:60%;
    min-height:200px;
    /* border:1px solid red; */
    flex-wrap: wrap;
    align-items: center;

`;
export const PhotoWrap = styled.form`
    flex:3;
    height: 100%;
    min-width:350px;
    display:flex;
    flex-direction: column;
    /* background-color:red; */
    align-items: center;
    /* justify-content: center;; */
    position:relative;
    object-fit:cover;
    overflow:hidden;
    & > img {
        height:100%;
        width:100%;
        object-fit:cover;
        overflow: hidden;
        margin-top:20px;
    }
    & > :nth-child(3) {
            position:absolute;
            bottom:0;
        }
    & > :nth-child(2) {
        width:330px;
        height:330px;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-top:20px;
        background-color:${Theme.colors.orange};
    }
    @media (max-width: ${MED}){
        min-width:calc(100% - 10px);
    }
    @media (max-width: ${SMALL}){
        min-width:calc(100% - 5px);
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
        width:330px;
        height:330px;
    }
    @media (max-width: ${SMALL}){
        width:280px;
        height:280px;
    }
`;
export const FileInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
    border:1px solid red;

	/* position: absolute; */
	/* z-index: -1; */
`;
export const FormWrap = styled.div`
    flex:4;
    height: 100%;
    min-width:300px;
    position:relative;
    & > form {
        display:flex;
        height:100%;
        flex-direction: column;
        padding:0px 20px 0px 20px;
        /* border:1px solid blue; */
        justify-content: space-between;
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
    height:96px;
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
`;

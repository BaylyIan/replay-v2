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
export const PhotoWrap = styled.div`
    flex:3;
    height: 100%;
    min-width:350px;
    display:flex;
    flex-direction: column;
    background-color:red;
    align-items: center;
    justify-content: center;
    position:relative;
    & > button {
        position:absolute;
        bottom:0;
    }
    @media (max-width: ${MED}){
        min-width:calc(100% - 10px);
    }
    @media (max-width: ${SMALL}){
        min-width:calc(100% - 5px);
    }

`;
export const Photo = styled.div`
    width:330px;
    height:330px;
    background-color:${Theme.colors.orange};
    display:flex;
    align-items:center;
    justify-content:center;
    @media (max-width: ${MED}){
        width:330px;
        height:330px;
    }
    @media (max-width: ${SMALL}){
        width:280px;
        height:280px;
    }
`;
export const FormWrap = styled.div`
    flex:4;
    height: 100%;
    min-width:300px;
    & > form {
        display:flex;
        height:100%;
        flex-direction: column;
        padding:0px 20px 0px 20px;
        border:1px solid blue;
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
    border:1px solid red;
    justify-content: flex-end;
`;

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
    border:1px solid red;
    flex-wrap: wrap;

`;
export const PhotoWrap = styled.div`
    flex:3;
    height: 100%;
    min-width:200px;
    display:flex;
    flex-direction: column;
    background-color:red;
`;
export const Photo = styled.div`

`;
export const FormWrap = styled.div`
    flex:4;
    height: 100%;
    min-width:230px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:green;


`;
export const ButtonWrap = styled.div`
    width:100%;
    height:auto;
    display:flex;
    align-items: flex end;
`;
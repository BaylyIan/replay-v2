import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    flex:4;
    height:28px;
    display:flex;
    background-color: #57535C;
    border-radius: 7px;
    padding-left:30px;
    @media (max-width: ${MED}){
        padding-left:8px;
    }
`;
export const Input = styled.input`
    width:92%;
    height:100%;
    outline: none;
    border: none;
    background-color: #57535C;
    caret-color:${Theme.colors.white};
    /* border:1px solid blue; */
`;
export const Icon = styled.div`
    width:50px;
    height:100%;
    display:flex;
    align-items:Center;
    justify-content: center;
    /* border:1px solid red; */
`;
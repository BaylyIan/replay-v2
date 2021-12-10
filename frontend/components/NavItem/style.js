import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.button`
    width:${({ toggle }) => toggle ? 'calc(100% - 10px)' : 'calc(100% - 20px);'};
    height:51px;
    background-color:${({ selected }) => selected ? `${Theme.colors.medGrey}` : `${Theme.colors.darkGrey}`};
    display:flex;
    align-items:center;
    justify-content:${({ toggle }) => toggle ? ' center' : null};
    padding-left:${({ toggle }) => toggle ? null : '20px'};
    border-radius: 7px;
    position:relative;
    transition: transform 200ms ease-in-out;
    border:none;
    & > h3{
        color:${({ selected }) => selected ? `${Theme.colors.white}` : `${Theme.colors.lightGrey}`};
        margin-left:${({ toggle }) => toggle ? null : '16px'}
    }
    :hover{
        cursor:pointer;
    }
    @media (max-width: ${MED}){
        min-width:${({ toggle }) => toggle ? 'calc(100% - 5px)' : 'calc(100% - 20px)'};
        height:48px;
    }
`;
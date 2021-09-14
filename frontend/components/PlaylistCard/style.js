import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    border:1px solid red;
    flex: 1;
    min-width:300px;
    height:586px;
    display:flex;
    flex-direction:column;
    padding:0px 5px 0px 5px;
    box-sizing:border-box;
    @media (max-width:1100px){
        border:1px solid blue;
        min-width:270px;
        height:486px;

    }
    @media (max-width:675px){
        border:1px solid green;
        width:90%;
        height:486px;

    }
    /* @media (max-width: ${SMALL}){
        border:1px solid green;

    } */
`;

export const Header = styled.div`
    width:100%;
    display:flex;
    align-items:flex-start;
`;
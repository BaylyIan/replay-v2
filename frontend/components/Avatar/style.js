import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:45px;
    height:45px;
    display:flex;
    justify-content:center;
    align-items:center;
    object-fit:cover;
    border-radius: 50%;
    /* border:1px solid red; */
    & > img{
        width:100%;
        height:100%;
        border-radius: 50%;
        object-fit:cover;
    }
`;
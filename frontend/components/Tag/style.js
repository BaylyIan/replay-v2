import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:auto;
    padding:0px 5px 0px 5px;
    height:26px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border:1px solid #A1A1A1;
    border-radius: 50px;
    min-width:30px;
    text-align:center;
`;

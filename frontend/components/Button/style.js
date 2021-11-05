import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.button`
    width:${({ width }) => width};
    height:${({ height }) => height};
    border:1px solid ${Theme.colors.orange};
    box-sizing: border-box;
    border-radius: 7px;
    display:flex;
    align-items: center;
    justify-content:center;
    background-color:${({ color }) => color ? color : Theme.colors.black};
    /* background-color: transparent; */
    background-repeat: no-repeat;
    :hover {
        background-color: ${Theme.colors.orange};
        & > p {
            color: ${Theme.colors.white}
        }
    }
    & > p{
        color:${({ textColor }) => textColor};
        font-size: 16px;

        /* margin-left:${({ margin }) => margin ? null : '0px'}  */
    }
`;
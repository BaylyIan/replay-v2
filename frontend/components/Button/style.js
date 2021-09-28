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
    & > p{
        color:${({ textColor }) => textColor ? textColor : Theme.colors.orange};
        font-size: 16px;
        /* margin-left:${({ margin }) => margin ? null : '0px'}  */
    }
`;
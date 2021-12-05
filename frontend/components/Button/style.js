import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.button`
    width:${({ width }) => width};
    height:${({ height }) => height};
    border:1px solid ${({ border }) => border};
    box-sizing: border-box;
    border-radius: 7px;
    display:flex;
    align-items: center;
    justify-content:center;
    background-color:${({ bgColor }) => bgColor};
    /* background-color: transparent; */
    background-repeat: no-repeat;
    :hover {
        background-color:${({ hoverBgColor }) => hoverBgColor};
        & > p {
            color: ${({hoverTextColor}) => hoverTextColor};
        }
    }
    & > p{
        color:${({ textColor }) => textColor};
        font-size: 16px;

        /* margin-left:${({ margin }) => margin ? null : '0px'}  */
    }
`;
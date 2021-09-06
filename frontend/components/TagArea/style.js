import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:100%;
    height:${({ height}) => height};
    display:flex;
    flex-wrap: wrap;
    align-items:space-around;
    & > * {
        margin:5px;
    }
`;
import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
     width:100%;
    height:100%;
    background-color:${Theme.colors.medGrey};
    display:flex;
`;
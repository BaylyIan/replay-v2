import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Main = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:row;
    @media (max-width: ${MED}) {
    flex-direction:column;
}
`;

export const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    background-image: linear-gradient(to bottom right, ${Theme.colors.orange}, ${Theme.colors.green});
    @media (max-width: ${SMALL}){
        display:none;
    }
`;

export const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${Theme.colors.black}
`;


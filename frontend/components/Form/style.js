import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:70%;
    max-width:400px; 
     min-height:350px;
    display:flex;
    flex-direction:column;
    align-items:Center;
    justify-content:space-between;
    position:relative;
    /* border:1px solid red; */
    & > div {
        width:100%;
        /* border:1px solid red; */
        & > * {
            margin-bottom:20px;
        }
    }
    @media (max-width: ${MED}) {
    width:90%;
}
`;
export const Toggle = styled.div`
    width:100%;
    height:51px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    & > p {
        color:${Theme.colors.lightGrey};
        font-size:18px;
        padding-bottom:4px;
        :hover{
            cursor: pointer;
        }
    }
    p:first-child{
        border-bottom:${({ toggle }) => toggle ? `2px solid ${Theme.colors.orange}` : `2px solid ${Theme.colors.black}`}
    }
    p:last-child{
        border-bottom:${({ toggle }) => toggle ? `2px solid ${Theme.colors.black}` : `2px solid ${Theme.colors.orange}`}
    }
`;

export const Error = styled.p`
  color: red;
  font-size: 8pt;
  margin: 3px;
  margin-bottom: 0px;
  padding: 0px;
`;
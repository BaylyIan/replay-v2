import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    min-width:400px;
    width:auto; 
    height:400px;
    height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    /* justify-content:center; */
    /* border:1px solid red; */
    background-color:${Theme.colors.black};
    padding:0px 30px 10px 30px;
    z-index:4;
`;

export const Background = styled.div`
    width:100%;
    height:100%;
    background:rgba(0, 0, 0, 0.9);
    position: absolute;
    top:0;
    left:0;
    display:flex;   
    align-items:Center;
    justify-content:center;
    z-index:3;
`;
export const CloseWrap = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    z-index:4;
    /* border:1px solid red; */
    padding:30px 20px 40px 40px;
    position:relative;
    & > :nth-child(2){
        position:absolute;
        right:0;
    }
`;
export const Title = styled.div`
    /* border:1px solid red; */
    color:${Theme.colors.lightGrey};
    height:auto;
    max-width:220px;
`;
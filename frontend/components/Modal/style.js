import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    min-width:420px;
    width:auto; 
    height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    /* justify-content:center; */
    /* border:1px solid red; */
    background-color:${Theme.colors.black};
    padding:0px 10px 10px 10px;
    z-index:5;
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
    z-index:0;
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
        margin-right:10px;
        right:0;
    }
`;
export const Title = styled.div`
    /* border:1px solid red; */
    color:${Theme.colors.lightGrey};
    height:auto;
    max-width:220px;
`;

export const PageWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position: absolute;
    width:100%;
    height:100%;
`;
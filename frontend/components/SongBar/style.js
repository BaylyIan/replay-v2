import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:100%;
    height:auto;
    display:${({hide})=> hide ? "none" : "flex"};
    /* border:1px solid green; */
`;
export const Cover = styled.div`
    width:64px;
    height:64px;
    min-width:64px;
    min-height:64px;
    display:flex;
    align-items:center;
    /* border:1px solid blue; */
    & > img {
        width:100%;
        height:100%;
        object-fit:cover;
    }
    @media (max-width: ${MED}){
        width:52px;
        height:52px;
        min-width:52px;
        min-height:52px;
    }
    @media (max-width: ${SMALL}){
        width:42px;
        height:42px;
        min-width:42px;
        min-height:42px;
    }
`;
export const Left = styled.div`
    flex:2;
    display:flex;
    align-items:center;
    /* border:1px solid blue; */

    > * {
        margin:2px 10px 2px 10px;
    }
    > h3 {
        color:${Theme.colors.white};
        font-size: 16px;
    }
    @media (max-width: ${MED}){
        > * {
            margin:5px 8px 5px 8px;
            color:${Theme.colors.lightGrey}
        }
        > h3 {
            color:${Theme.colors.white};
            font-size: 14px;
    }
    }
    @media (max-width: ${SMALL}){
        > * {
            margin:5px 5px 5px 5px;
        }
        > h3 {
            color:${Theme.colors.white};
            font-size: 12px;
    }
    }
`;
export const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    /* border:1px solid green; */
    > h3 {
            color:${Theme.colors.lightGrey};
            font-size: 14px;
    }
    @media (max-width: ${MED}){
        > h3 {
            color:${Theme.colors.lightGrey};
            font-size: 12px;
    }
    }
    @media (max-width: ${SMALL}){
       display:none;
    }
`;
export const Spacer = styled.div`
    width:25px;
    min-width:25px;
    /* border:1px solid red; */
    @media (max-width: ${SMALL}){
        display:${({ showAdd }) => showAdd ? 'flex' : 'none'};
    }
`;
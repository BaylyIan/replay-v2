import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    /* border:1px solid red; */
    padding: 10px 10px 10px 10px;
    background-size: cover;
    background-repeat: no-repeat;
    transition: opacity 0.4s ease-in;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    aspect-ratio:1/ 1.3;
    border-radius: 20px;
    background-color: ${Theme.colors.darkGrey};
    @media (max-width: ${MED}){
        aspect-ratio:1/ 1.2;
    }
    & > p {
        color:${Theme.colors.lightGrey};
        font-size:16px;
    }
`;
export const Cover = styled.div`
    width:100%;
    aspect-ratio: 1 / 1;
    display:flex;
    object-fit:cover;
    overflow:hidden;
    border-radius:10px;
    /* border:1px solid purple; */
    & > img {
        height:100%;
        width:100%;
        object-fit:cover;
        overflow: hidden;
    }
`;
export const Info = styled.div`
    width:100%;
    height:40px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    /* border:1px solid purple; */
    & > h1 {
        font-size:22px;
        color:${Theme.colors.white};
        @media (max-width: ${XLARGE}){
            font-size:24px; 
        }
        @media (max-width: ${LARGE}){
            font-size:22px; 
        }
        @media (max-width: ${MED}){
            font-size:20px;   
        }
        @media (max-width: ${SMALL}){
            font-size:18px;        
        }
    }
`;

export const TagWrap = styled.div`
    width:100%;
    height:auto;
    min-height:30px;
    display:flex;
    flex-wrap: wrap;
    border:1px solid red;
`;

export const Cont = styled.div`
    width:100%;
    height:auto;
    display:flex;
    align-items: center;
    justify-content:space-between;
    & > p {
        color:${Theme.colors.lightGrey};
        font-size:16px;
    }
`;
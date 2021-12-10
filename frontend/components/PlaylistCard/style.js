import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    /* border:1px solid red; */
    padding: 10px 20px 10px 20px;
    background-size: cover;
    background-repeat: no-repeat;
    transition: opacity 0.4s ease-in;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    aspect-ratio:1/ 1.6;
    border-radius: 10px;
    background-color: ${Theme.colors.darkGrey};
    @media (max-width: ${MED}){
        aspect-ratio:1/ 1.5;
    }
    @media (max-width: ${SMALL}){
        aspect-ratio:1/ 1.5;
        min-height:250px;
    }

    `;

export const Header = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    /* border:1px solid blue; */
    height:70px;
    & > h2 {
        margin-left:15px;
        color:${Theme.colors.white};
    }
`;
export const Avatar = styled.div`
    aspect-ratio:1/1;
    border-radius: 50%;
    /* border:1px solid green; */
    width:50px;
    min-width:50px;
    min-height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    object-fit:cover;
    border-radius: 50%;
    /* border:1px solid red; */
    & > img{
        width:100%;
        height:100%;
        border-radius: 50%;
        object-fit:cover;
    }
   @media (max-width: ${MED}){
        width:45px;
    }
    @media (max-width: ${SMALL}){
        width:35px;
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
export const TitleCont = styled.div`
    width:100%;
    display: flex;
    height: 10%;
    /* border:1px solid green; */
    justify-content: space-between;
    align-items: center;
    @media (max-width: ${XLARGE}){
            margin-top:15px; 
        }
        @media (max-width: ${LARGE}){
            margin-top:12px; 
        }
        @media (max-width: ${MED}){
            margin-top:8px;  
        }
        @media (max-width: ${SMALL}){
            margin-top:5px;        
        }
    & > h1 {
        margin-left:5px;
        color:${Theme.colors.white};
        font-size:24px;
        @media (max-width: ${XLARGE}){
            font-size:2vw; 
        }
        @media (max-width: ${LARGE}){
            font-size:18px; 
        }
        @media (max-width: ${MED}){
            font-size:18px;   
        }
        @media (max-width: ${SMALL}){
            font-size:18px;        
        }
    }
`;
// export const PlaylistButton = styled.button`
//     height:32px;
//     width:auto;
//     color:${Theme.colors.white};
//     display:flex;
//     align-items:center;
//     justify-content: center;
//     background-color: ${Theme.colors.orange};
//     border:none;
//     border-radius: 7px;
//     margin-top:10px;
//     /* @media (max-width: ${XLARGE}){
//         width:140px;
//         }
//         @media (max-width: ${LARGE}){
//             width:120px;
//             background-color: ${Theme.colors.white};

//         }
//         @media (max-width: ${MED}){
//             width:100px;  
//         }
//         @media (max-width: ${SMALL}){
//             width:80px;        
//         } */
//     & > h2 {
//         @media (max-width: ${XLARGE}){
//             font-size:20px; 
//         }
//         @media (max-width: ${LARGE}){
//             font-size:14px; 
//         }
//         @media (max-width: ${MED}){
//             font-size:14px;   
//         }
//         @media (max-width: ${SMALL}){
//             font-size:12px;        
//         }
//     }
// `;

export const TagWrap = styled.div`
    width:100%;
    height:70px;
    display:flex;
    flex-wrap: wrap;
    /* border:1px solid red; */
`;
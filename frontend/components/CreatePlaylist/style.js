import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE} from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    width:100%;
    height:auto;
    display:flex;
    z-index:4;
`;

export const PhotoWrap = styled.form`
    flex:3;
    border:1px solid blue;

    & > img {
        height:100%;
        width:100%;
        object-fit:cover;
        overflow: hidden;
        margin-top:20px;
    }


`;
export const FileLabel = styled.label`
    width:150px;
    height:51px;
    /* background-color:${Theme.colors.orange}; */
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
    cursor:pointer;
    border:1px solid ${Theme.colors.orange};
    border-radius: 7px;
    @media (max-width: ${MED}){
   
    }
`;
export const FileInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
    border:1px solid red;

	/* position: absolute; */
	/* z-index: -1; */
`;
export const FormWrap = styled.div`
    flex:2;
    border:1px solid red;
`;
export const TagWrap = styled.div`

`;
export const ButtonWrap = styled.div`

`;

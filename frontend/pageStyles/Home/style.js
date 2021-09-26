import styled from 'styled-components'
import { SMALL, MED, LARGE, XLARGE } from '../../utils/constants'
import { Theme } from '../../styles/theme'

export const Container = styled.div`
    background-color:${Theme.colors.medGrey};
    display: grid;
    grid-template-columns: minmax(250px, auto);
    grid-gap: 20px;
    width: 100%;
    min-height: auto;
    & > * {
        margin:10px;
    }
    @media (min-width: 600px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(2, minmax(250px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 900px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(3, minmax(250px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 1200px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(4, minmax(250px, 1fr))' : null};
        padding: 10px;
    }
    @media (min-width: 1600px) {
        grid-template-columns:${({ toggle }) => toggle ? 'repeat(5, minmax(250px, 1fr))' : null};
        padding: 20px;
    }

    @media (min-width: 900px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(2, minmax(250px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1100px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(3, minmax(250px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1380px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(4, minmax(250px, 1fr))'};
        padding: 10px;
    }
    @media (min-width: 1600px) {
        grid-template-columns:${({ toggle }) => toggle ? null : 'repeat(5, minmax(250px, 1fr))'};
        padding: 20px;
    }
`;
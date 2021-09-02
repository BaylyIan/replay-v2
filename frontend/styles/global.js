import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    height: 100%;
    font-family: "Ideal Sans SSm A", "Ideal Sans SSm B";
    font-style: normal;
    font-weight: 300;
    overflow-x: hidden;
  }
  body {
    position: relative;
    background-color: rgb(247, 247, 247);
    a {
      cursor: pointer;
      &:visited{
        color: #000;
      }
    };
  }
  `;
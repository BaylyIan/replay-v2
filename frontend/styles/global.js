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
    font-family: 'Inter', sans-serif;    font-style: normal;
    font-weight: 300;
    overflow-x: hidden;
  }
  body {
    position: relative;
    a {
      cursor: pointer;
      &:visited{
        color: #000;
      }
    };
    body::-webkit-scrollbar-track {
  background: orange;        /* color of the tracking area */
}
  }
  h1 {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 800;
  }
  h2 {
    font-family: 'Inter', sans-serif;    font-style: normal;
    font-size: 19px;
    font-weight: 800;
  }
  h3 {
    font-family: 'Inter', sans-serif;    font-style: normal;
    font-weight: 500;
    font-size: 15px;
  }
  h4 {
    font-family: 'Inter', sans-serif;    font-style: normal;
    font-size: 10px;
    font-weight: normal;
  }
  h5 {
    font-family: 'Inter', sans-serif;    font-style: italic;
    font-weight: 500;
    font-size: 10px;
  }
  h6 {
    font-family: 'Inter', sans-serif;    font-style: bold;
    font-weight: 800;
    font-size: 12px;
    color: #00000050;
  }
  p {
    font-family: 'Inter', sans-serif;    font-style: normal;
    font-weight: 300;
    font-size: 13px;
  };
  `;
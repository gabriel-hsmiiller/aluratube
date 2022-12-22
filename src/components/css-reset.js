import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: ${({theme}) => theme.backgroundBase || '#f9f9f9'};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.backgroundLevel2 || "#222222"};
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.backgroundLevel1 || "#222222"};
    }
  }
  body {
    font-family: sans-serif;
    background-color: ${({theme}) => theme.backgroundBase || '#f9f9f9'};
          color: ${({ theme }) => theme.textColorBase || "#222222"};
  }
  /* NextJS */
  html {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  body {
    display: flex;
    flex: 1;
  }
  #__next {
    display: flex;
    flex: 1;
  }
  /* Globals */
  button,
  a {
    text-decoration: none;
    opacity: 1;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
  }
`;
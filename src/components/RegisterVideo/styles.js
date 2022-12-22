import styled from "styled-components";

export const StyledRegisterVideo = styled.div`
  .fab-container {
    bottom: 72px;
    right: 24px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > button {
      width: 32px;
      height: 32px;
      font-size: 20px;
      color: inherit;
      border: 0;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      border-radius: 50%;
      z-index: 99;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,.3);
      margin-bottom: 8px;
      position: relative;

      & > .tooltip {
        visibility: hidden;
        position: absolute;
        z-index: 100;
        right: 40px;
        font-size: 16px;
      }

      &:hover > .tooltip {
        visibility: visible;
      }
    }
  }
  .add-video {
    width: 50px;
    height: 50px;
    font-size: 20px;
    color: inherit;
    position: fixed;
    bottom: 16px;
    right: 16px;
    border: 0;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    cursor: pointer;

    & .rotate-icon > * {
      transform: rotateZ('45deg');
    }
  }
  .close-modal {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 8px;
    right: 16px;
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: red;
    padding: 8px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: inherit;

    &:disabled {
      background-color: #ababab;
      color: #666;
      cursor: default;
      &:hover {
        opacity: 1;
      }
    }
  }
  form {
    width: 100%;
    padding: 5%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    & > div {
      flex: 1;
      border-radius: 8px;
      max-width: 320px;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 40px;

      img {
        width: 100%;
      }
    }
  }
  input, select {
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.borderBase};
    padding: 8px 10px;
    margin-bottom: 10px;
    outline: none;
    color: #222222;
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
  }
`;
import React from "react";
import styled from "styled-components"
import { ColorModeContext } from "./color-mode";
import { FaMoon, FaSun } from 'react-icons/fa';

const StyledSwitch = styled.div`
  background-color: #333333;
  border: 0;
  padding: 3px;
  font-size: 12px;
  width: 50px;
  height: 25px;
  display: flex;
  justify-content: space-around;
  border-radius: 10000px;
  position: relative;
  label {
    width: 50px;
  }
  span { display: inline-flex; width: 20px; height: 20px; align-items: center; justify-content: center; }
  
  label:before {
    content: "";
    background-color: #fafafa;
    border: 1px solid #333333;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: .3s;
    cursor: pointer;
  }
  input[type="checkbox"] { display: none; }
  input[type="checkbox"]:checked + label:before { transform: translateX(100%); }
`;

export default function DarkModeSwitch() {
    const context = React.useContext(ColorModeContext);

    return (
        <StyledSwitch>
            <input id="darkmode" type="checkbox" onChange={() => context.toggleMode()} />
            <label htmlFor="darkmode" className="darkmode-switch">
                <span style={{ color: 'white' }}><FaMoon /></span>
                <span style={{ color: 'orange' }}><FaSun /></span>
            </label>
        </StyledSwitch>
    )
}
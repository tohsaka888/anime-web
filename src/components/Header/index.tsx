import React, { useContext } from "react";
import { BreakpointContext } from "../../Context/BreakpointContext";
import "./index.less";
import logo from "@/logo.svg";
import {
  BsGithub,
  BsMoonStarsFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";

function Header() {
  const { size } = useContext(BreakpointContext);
  return (
    <div className={`${size}-header-container`}>
      <div className={`${size}-logo-area`}>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="website-name">React Animation</div>
      </div>
      <div className={`${size}-input-area`}></div>
      <div className={`${size}-button-area`}>
        <BsMoonStarsFill size={24} />
        <BsGithub size={24} />
        <BsPersonFill size={24} />
      </div>
    </div>
  );
}

export default Header;

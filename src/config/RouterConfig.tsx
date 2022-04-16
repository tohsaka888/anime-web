import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useBreakPoint from "tohsaka888-use-breakpoint";
import Header from "../components/Header";
import { BreakpointContext } from "../Context/BreakpointContext";
import HomePage from "../pages/HomePage";

function RouterConfig() {
  const { deferedSize, deferedWidth } = useBreakPoint();
  return (
    <BreakpointContext.Provider
      value={{ breakpoint: deferedWidth, size: deferedSize }}
    >
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </BreakpointContext.Provider>
  );
}

export default RouterConfig;

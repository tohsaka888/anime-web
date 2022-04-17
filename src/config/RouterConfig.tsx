import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useBreakPoint from "tohsaka888-use-breakpoint";
import Header from "../components/Header";
import { BreakpointContext } from "../Context/BreakpointContext";
import HomePage from "../pages/HomePage";
import Search from "../pages/Search/Index";

function RouterConfig() {
  const { deferedSize, deferedWidth } = useBreakPoint();
  return (
    <BreakpointContext.Provider
      value={{ breakpoint: deferedWidth, size: deferedSize }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="search/:name" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </BreakpointContext.Provider>
  );
}

export default RouterConfig;

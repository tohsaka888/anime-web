import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import "./index.less";
import Result from "./Result";

function Search() {
  const { name } = useParams();

  return (
    <div>
      <div className="search-header">
        <span className="search-result">"{name}"</span>
        <span>搜索结果如下:</span>
      </div>
      <Result />
    </div>
  );
}

export default Search;

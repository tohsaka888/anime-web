import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";

type AnimationResults = {
  category: string;
  cover_url: string;
  description: string;
  module: string;
  score: number;
  title: string;
  url: string;
}[];

function Result() {
  const { name } = useParams();
  const [results, setResults] = useState<AnimationResults>([]);
  useEffect(() => {
    const getResult = async () => {
      const res = await fetch(`${baseUrl}/anime/search/${name}`);
      const data: AnimationResults = await res.json();
      setResults(data);
    };
    getResult();
  }, []);
  return (
    <div className="search-content">
      {results.map((result) => (
        <div className="search-item" key={result.url}>
          <img src={result.cover_url} alt={result.title} />
          <div>{result.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Result;

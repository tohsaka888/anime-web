import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../components/Content";
import { baseUrl } from "../../config/baseUrl";
import "./index.less";

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
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getResult = async () => {
      const res = await fetch(`${baseUrl}/anime/search/${name}`, {
        signal: signal,
      });
      const data: AnimationResults = await res.json();
      setResults(data);
      setLoading(false);
    };
    getResult();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <Content>
      <div className="search-content">
        {!loading &&
          (results.length !== 0 ? (
            results.map((result) => (
              <div className="search-item" key={result.url}>
                <img
                  src={result.cover_url}
                  alt={result.title}
                  className="cover-image"
                />
                <div>
                  <div className="search-name">{result.title}</div>
                  <div className="category">
                    分类:<span>{result.category || "暂无分类"}</span>
                  </div>
                  <div className="score">
                    评分:<span>{result.score}</span>
                  </div>
                  <div className="source">
                    播放源:<span>{result.module}</span>
                  </div>
                  <div className="description">
                    描述:<span>{result.description || "暂无相关描述"}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="search-item">没有找到相关动画</div>
          ))}
        {loading && <div>loading...</div>}
      </div>
    </Content>
  );
}

export default Result;

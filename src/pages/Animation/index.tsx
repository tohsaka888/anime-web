import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../components/Content";
import VideoPlayer from "tohsaka888-video-player";
import { baseUrl } from "../../config/baseUrl";
import "./index.less";

type AnimationDetail = {
  category: string;
  cover_url: string;
  description: string;
  module: string;
  play_lists: {
    name: string;
    num: number;
    video_list: { info: string; name: string; player: string }[];
  }[];
  title: string;
} | null;

type AnimationPlaylist = {
  format: string;
  lifetime: number;
  proxy_url: string;
  raw_url: string;
  size: number;
};

function Animation() {
  const { id } = useParams();
  const [animationDetail, setAnimationDetail] = useState<AnimationDetail>(null);
  const [animationPlaylist, setAnimationPlaylist] = useState<AnimationPlaylist>(
    {
      format: "",
      lifetime: 0,
      proxy_url: "",
      raw_url: "",
      size: 0,
    }
  );

  useEffect(() => {
    const getAnimationPlaylist = async () => {
      const res = await fetch(`${baseUrl}/anime/${id}`);
      const data: AnimationDetail = await res.json();
      setAnimationDetail(data);
    };
    getAnimationPlaylist();
  }, []);

  const getAnimation = async (url: string) => {
    const res = await fetch(url);
    const data: AnimationPlaylist = await res.json();
    setAnimationPlaylist(data);
  };

  const playlists = animationDetail && animationDetail.play_lists;
  return (
    <Content>
      <div style={{ display: "flex" }}>
        {animationPlaylist.raw_url !== "" ? (
          <VideoPlayer
            style={{ flex: 5, boxShadow: "0px 0px 10px 3px #cecece" }}
            options={{
              sources: [
                {
                  src: animationPlaylist.raw_url || "",
                  type:
                    animationPlaylist.format === "hls"
                      ? "application/x-mpegURL"
                      : "video/mp4",
                },
              ],
            }}
            onReady={() => console.log("ok")}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/ 9",
              background: "#666666",
              position: "relative",
              flex: 5,
              boxShadow: "0px 0px 10px 3px #cecece",
            }}
          ></div>
        )}
        <div className="playlist-selector">
          {playlists &&
            playlists.map((playlist, index) => (
              <React.Fragment key={index}>
                <div className="playlist-name">{playlist.name}</div>
                <div className="playlist">
                  {playlist.video_list.map((video, index) => (
                    <div key={index}>
                      <div
                        className="simple-button"
                        onClick={() => {
                          getAnimation(video.info);
                        }}
                      >
                        {video.name}
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {animationDetail && (
          <div className="info">
            <img
              className="cover"
              src={animationDetail.cover_url}
              alt={animationDetail.title}
            />
            <div className="text-area">
              <div className="animation-name">{animationDetail.title}</div>
              <div className="animation-source">{animationDetail.module}</div>
              <div className="animation-tag">{animationDetail.category}</div>
              <div className="animation-description">
                {animationDetail.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </Content>
  );
}

export default Animation;

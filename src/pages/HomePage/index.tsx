import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { baseUrl } from "../../config/baseUrl";
import moment from "moment";
import "./index.less";
import {
  BsFillCalendarPlusFill,
  BsFillCalendarMinusFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

type Updates = UpdatesAnimation[];
interface UpdatesAnimation {
  date: string;
  day_of_week: string;
  is_today: boolean;
  updates: Update[];
}
interface Update {
  cover_url: string;
  title: string;
  update_time: string;
  update_to: string;
}

function HomePage() {
  const [updates, setUpdates] = useState<Updates>([]);
  const [isAscend, setIsAscend] = useState<boolean>(true);
  
  useEffect(() => {
    const getRecentAnimation = async () => {
      const res = await fetch(`${baseUrl}/anime/bangumi/updates`);
      const data: Updates = await res.json();
      setUpdates(data);
    };
    getRecentAnimation();
  }, []);

  return (
    <>
      <div className="operation">
        <div>更新时刻表/{!isAscend ? "升序" : "降序"}</div>
        {isAscend ? (
          <BsFillCalendarPlusFill
            size={24}
            onClick={() => setIsAscend(false)}
          />
        ) : (
          <BsFillCalendarMinusFill
            size={24}
            onClick={() => setIsAscend(true)}
          />
        )}
      </div>
      <Content style={{ marginTop: "68px" }}>
        {updates
          .sort((pre, cur) =>
            isAscend
              ? +moment(pre.date).isBefore(cur.date)
                ? 1
                : -1
              : +moment(pre.date).isAfter(cur.date)
              ? 1
              : -1
          )
          .map((update, index) => (
            <React.Fragment key={index}>
              <div className="update-time">{update.date} 更新</div>
              <div className="animation-container">
                {update.updates.map((animation, index) => (
                  <div className="animation-item" key={index}>
                    <img
                      src={animation.cover_url}
                      alt={animation.title}
                      className="animation-cover"
                    />
                    <div className="animation-name">
                      <Link
                        to={`/search/${decodeURIComponent(animation.title)}`}
                      >
                        {animation.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
      </Content>
    </>
  );
}

export default HomePage;

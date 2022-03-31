import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Home.css";
import { bulkAsyncFetchApi } from "../helpers/fetcher";

function Home() {
  const [trendingList, setTrendingList] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);

  // const submitMedia = () => {
  //   console.log("upload media code");
  // };
  const fetchDetails = async () => {
    const requestData = [
      {
        path: "/photos",
        responseKey: "photos",
      },
      {
        path: "/todos",
        responseKey: "todos",
      },
    ];
    const apiResponse = await bulkAsyncFetchApi(requestData);
    setTrendingList(apiResponse.photos);
    setSuggestionList(apiResponse.todos);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  console.log({
    trendingList,
    suggestionList,
  });
  return (
    <div className={`Upload container`}>
      <div className="upload_card">
        <h4>Upload Your Content Now!</h4>
        <div className="upload_card_btn">
          <Link to="/content/create?content_type=audio"> <img style={{ width: "6vh", height: "6vh", margin: 7 }} src="/assets/audio.png" alt="image" /> </Link>
          <Link to="/content/create?content_type=video"> <img style={{ width: "6vh", height: "6vh", margin: 7 }} src="/assets/video.png" alt="image" /> </Link>
        </div>
      </div>
      {/* trending card */}
      {trendingList?.length > 0 && (
        <div className="list_card">
          <h4>
            <strong>Trending</strong>
          </h4>
          <div className="content_card">
            {trendingList.slice(0, 4).map((trendingItem) => (
              <div className="single_card">
                <div className="first_card">
                  <img
                    src={trendingItem.thumbnailUrl || "logo192.png"}
                    alt="Cinque Terre"
                    height={120}
                    width={180}
                  />
                </div>
                <div className="second_card">
                  <strong>{trendingItem.title}</strong>
                  <span>Created By 1</span>
                  <span>Date 1</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* suggestions card */}
      {suggestionList?.length > 0 && (
        <div className="list_card">
          <h4>
            <strong>Suggestions</strong>
          </h4>
          <div className="content_card">
            {suggestionList.slice(0, 4).map((suggestItem) => (
              <div className="single_card">
                <div className="first_card">
                  <img
                    src={suggestItem.thumbnailUrl || "logo192.png"}
                    alt="Cinque Terre"
                    height={120}
                    width={180}
                  />
                </div>
                <div className="second_card">
                  <strong>{suggestItem.title}</strong>
                  <span>Created By 1</span>
                  <span>Date 1</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Home.css";
import { bulkAsyncFetchApi } from "../helpers/fetcher";

function Home() {
  const [trendingList, setTrendingList] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);

  var randomImages = ["/assets/cover.jpg", "/assets/cover1.jpg", "/assets/cover2.jpg", "/assets/cover3.jpg", "/assets/cover4.jpg", "/assets/cover5.jpg"]
  const fetchDetails = async () => {
    const requestData = [
      {
        path: "/api/v1/contents",
        responseKey: "photos",
      },
      {
        path: "/api/v1/contents",
        responseKey: "videos",
      },
    ];
    const apiResponse = await bulkAsyncFetchApi(requestData);
    console.log({ apiResponse });
    setTrendingList(apiResponse.photos.data);
    setSuggestionList(apiResponse.videos.data);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  console.log({
    trendingList,
    suggestionList,
  });
  return (
    <div className={`Upload`}>
      <div className="upload_card">
        <h4 className="home_head">Upload your content here :</h4>
        <div className="upload_card_btn">
          <Link to="/content/create?content_type=audio">
            {" "}
            <img
              style={{ width: "2vw", height: "2vw", margin: "1vw" }}
              src="/assets/audio.png"
              alt="image"
            />{" "}
          </Link>
          <Link to="/content/create?content_type=video">
            {" "}
            <img
              style={{ width: "2vw", height: "2vw", margin: "1vw" }}
              src="/assets/video.png"
              alt="image"
            />{" "}
          </Link>
        </div>
      </div>
      {/* trending card */}
      {trendingList?.length > 0 && (
        <div className="list_card">
          <h4 style={{textAlign: "center"}} >
            <strong>Trending</strong>
          </h4>
          <div className="content_card">
            {trendingList.slice(0, 4).map((trendingItem) => (
              <Link to={`/content-detail/${trendingItem.id}`}>
                <div className="single_card">
                  <div className="first_card">
                    <img
                      src={trendingItem.thumbnailUrl || randomImages[Math.floor(Math.random()*randomImages.length)]}
                      alt="Cinque Terre"
                      height={120}
                      width={180}
                    />
                  </div>
                  <div className="second_card">
                    <strong>{trendingItem.title}</strong>
                    <span>{trendingItem.user.name}</span>
                    <span>{trendingItem.created_at}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* suggestions card */}
      {suggestionList?.length > 0 && (
        <div className="list_card">
          <h4 style={{textAlign: "center"}}>
            <strong>Suggestions</strong>
          </h4>
          <div className="content_card">
            {suggestionList.slice(0, 4).map((suggestItem) => (
              <Link to={`/content-detail/${suggestItem.id}`}>
                <div className="single_card">
                  <div className="first_card">
                    <img
                      src={suggestItem.thumbnailUrl || randomImages[Math.floor(Math.random()*randomImages.length)]}
                      alt="Cinque Terre"
                      height={120}
                      width={180}
                    />
                  </div>
                  <div className="second_card">
                    <strong>{suggestItem.title}</strong>
                    <span>{suggestItem.user.name}</span>
                    <span>{suggestItem.created_at}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

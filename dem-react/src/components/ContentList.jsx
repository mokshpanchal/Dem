/* eslint-disable */
import React, { useState, useEffect } from "react";
import { fetchApi } from "../helpers/fetcher";
import { Outlet, Link } from "react-router-dom";
import '../styles/Home.css'
export default function ContentList() {
  const [contentVideosList, setContentVideosList] = useState([]);
  const [contentAudiosList, setContentAudiosList] = useState([]);
  const [currentView, setCurrentView] = useState("PUBLISHED");
  var randomImages = ["/assets/cover.jpg", "/assets/cover1.jpg", "/assets/cover2.jpg", "/assets/cover3.jpg", "/assets/cover4.jpg", "/assets/cover5.jpg"]
  const fetchDetails = async () => {
    let contentData = [];
    const apiResponse = await fetchApi("/api/v1/contents");
    console.log({ apiResponse });
    if (apiResponse.status == 200) {
      contentData = apiResponse.data.data || [];
    }
    setContentVideosList(
      contentData.filter((content) => content.content_type == "video" && content.is_owner)
    );
    setContentAudiosList(
      contentData.filter((content) => content.content_type == "audio" && content.is_owner)
    );
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  console.log({ contentVideosList, contentAudiosList });
  return (
    <div className={`ContentList`}>
      {/* videos card */}
      {contentVideosList?.length > 0 && (
        <div className="list_card">
          <h4>
            <strong>Videos</strong>
          </h4>
          <div className="content_card">
            {contentVideosList.slice(0, 4).map((content) => (
              <Link to={`/content-detail/${content.id}`}>
                <div className="single_card">
                  <div className="first_card">
                    <img
                      src={content.thumbnailUrl || randomImages[Math.floor(Math.random()*randomImages.length)]}
                      alt="Cinque Terre"
                      height={120}
                      width={180}
                    />
                  </div>
                  <div className="second_card">
                    <strong>{content.title}</strong>
                    <span>{content.created_at}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* audios card */}
      {contentAudiosList?.length > 0 && (
        <div className="list_card">
          <h4>
            <strong>Audios</strong>
          </h4>
          <div className="content_card">
            {contentAudiosList.slice(0, 4).map((content) => (
              <Link to={`/content-detail/${content.id}`}>
                <div className="single_card">
                  <div className="first_card">
                    <img
                      src={content.thumbnailUrl || randomImages[Math.floor(Math.random()*randomImages.length)]}
                      alt="Cinque Terre"
                      height={120}
                      width={180}
                    />
                  </div>
                  <div className="second_card">
                    <strong>{content.title}</strong>
                    <span>{content.created_at}</span>
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

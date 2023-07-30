import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Sns.scss";

const SnsDetail = ({ onRequestClose, snsNo, writer }) => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const response = await axios.get(
          `http://localhost:8181/api/sns/${snsNo}?userNick=${writer}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPhoto(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("게시물 데이터를 불러오는데 실패했습니다.", error);
        setPhoto(null);
      }
    };

    fetchPhoto();
  }, [snsNo, writer]);

  if (!photo) {
    return <div>해당 사진을 찾을 수 없습니다.</div>;
  }




  return (
    <div>
      <div className="top-of-modal">
        <Link to={`/snsBoard/${writer}`} className="moveTo-btn">
            <p>유저 홈으로 이동</p>
        </Link>
        <button className='close-btn'type="button" onClick={onRequestClose}>X</button>
      </div>
      <ul className="sns-detail-list">
        
        {photo.snsList
          .filter((snsItem) => snsItem.snsNo === snsNo)
          .map((sns, index) => (
            <li key={index}>
              <img src={sns.snsImgs} alt={`photo-${index}`} />
              <div className="hashtags">
                {sns.hashTags.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
                ))}
              </div>
              <p>{sns.content}</p>
            </li>
          ))}
      </ul>
      
    </div>
  );
};

export default SnsDetail;

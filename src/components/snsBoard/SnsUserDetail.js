import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Sns.scss";

const SnsUserDetail = () => {
  const { snsNo, writer } = useParams();
  const [photo, setPhoto] = useState([]);

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
        setPhoto([]);
      }
    };

    fetchPhoto();
  }, [snsNo, writer]);

  if (!photo || photo.length === 0) {
    return <div>해당 사진을 찾을 수 없습니다.</div>;
  }




  return (
    <div>
      <ul className="sns-detail-list">
        {photo.snsList.map((sns, index) => (
          <li className="sns-li" key={index}>
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

export default SnsUserDetail;

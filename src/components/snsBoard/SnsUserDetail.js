import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import userImg from "../../image/user.png";
import "./Sns.scss";

const SnsUserDetail = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  const { writer } = useParams();
  const [photo, setPhoto] = useState([]);
  const [userProfileImg, setUserProfileImg] = useState("");
  const localProfileImg = localStorage.getItem("USER_PROFILE_IMG");

  useEffect(() => {
    if (!token) {
      // 회원에게만 서비스를 제공.
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }

    setUserProfileImg(localProfileImg);

    fetchPhoto();
  }, [token, writer]);

  const fetchPhoto = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8181/api/sns/?userNick=${writer}`,
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

  if (!photo || photo.length === 0) {
    return <div>해당 사진을 찾을 수 없습니다.</div>;
  }

  console.log(typeof userProfileImg);

  return (
    <div>
      <div className="user-title">
        <img
          className="profileImg"
          src={userProfileImg !== "null" ? userProfileImg : userImg}
          alt="프로필 이미지"
        />
        <p className="user-nick">{writer}의 농사일기</p>
      </div>
      <div className="line" />
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

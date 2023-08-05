import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// mui 아이콘 > 시작
import HomeIcon from "@mui/icons-material/Home";
// mui 아이콘 > 끝!
import userImg from "../../image/user.png";
import { API_BASE_URL as BASE, SNS } from "../../config/host-config";
import "./Sns.scss";

const SnsUserDetail = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  const { writer } = useParams();
  const [photo, setPhoto] = useState([]);
  const [userProfileImg, setUserProfileImg] = useState("");
  const localProfileImg = localStorage.getItem("USER_PROFILE_IMG");
  const API_BASE_URL = BASE + SNS;

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
      const response = await axios.get(`${API_BASE_URL}/0?userNick=${writer}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      <div className="sub-link sns-board-sub">
        <Link to="/">
          <HomeIcon />
        </Link>{" "}
        <span> &gt; </span>
        <Link to="/snsBoard">농사일기</Link> <span> &gt; </span>
        <span style={{ cursor: "pointer" }}> {writer}의 농사일기</span>
      </div>
      <div className="user-title">
        <img
          className="profileImg"
          src={userProfileImg !== "null" ? userProfileImg : userImg}
          alt="프로필 이미지"
        />
        <p className="user-nick">{writer}의 농사일기</p>
      </div>{" "}
      {/* user-title */}
      <div className="line" />
      <ul className="sns-detail-list">
        {photo.snsList.map((sns, index) => (
          <li className="sns-user-li" key={index}>
            <frame>
              <img src={sns.snsImgs} alt={`photo-${index}`} />
            </frame>
            <div className="sns-text-box">
              <p className="sns-content">{sns.content}</p>
              <div className="hashtags">
                <p className="hash-box"># &nbsp;</p>
                {sns.hashTags.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
                ))}
              </div>{" "}
              {/* hachtag END */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnsUserDetail;

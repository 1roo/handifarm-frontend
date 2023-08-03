import React, { useEffect, useState } from "react";
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Sns.scss";

const SnsDetail = ({ onRequestClose, snsNo, writer, regDate }) => {
  const [photo, setPhoto] = useState(null);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }

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
    <div className="sns-detail-box">

      <div className="top-of-modal">
        <div className="link-box moveTo-btn"> {/* 방문 버튼*/}
          <Link to={`/snsBoard/${writer}`} >
            <Button className="write-link-btn" variant="success">
             '{writer}'의 농사일기 방문하기&nbsp; &gt;
            </Button>
          </Link> </div> 
        <button className='close-btn'type="button" onClick={onRequestClose}>X</button>
      </div>


      <ul className="sns-detail-list">
        {photo.snsList
          .filter((snsItem) => snsItem.snsNo === snsNo)
          .map((sns, index) => (
            <li key={index}>
              <frame>
                <img src={sns.snsImgs} alt={`photo-${index}`} />
              </frame>
                <p className="sns-content">{sns.content}</p>
                <div className="hashtags">
                  <p className="hash-box"># &nbsp;</p>
                  {sns.hashTags.map((tag, idx) => (
                    <p key={idx}>{tag}</p>
                  ))}
                </div>
                <em>{writer}이(가) {sns.regDate} 에 작성</em>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SnsDetail;

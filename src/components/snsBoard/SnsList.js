import React, { useEffect, useState } from "react";
import "./Sns.scss";
import Modal from "react-modal";
import SnsRegist from "./SnsRegist";
import SnsDetail from "./SnsDetail";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import userImg from "../../image/user.png";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8181/api/sns";

const SnsList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [snsList, setSnsList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSns, setSelectedSns] = useState([]); // 선택된 SNS 항목을 저장하는 상태

  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  const [userProfileImg, setUserProfileImg] = useState("");
  const localProfileImg = localStorage.getItem("USER_PROFILE_IMG");

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    setUserProfileImg(localProfileImg);

    fetchPhotos();
  }, [page]);

  // 사진 데이터 가져오기
  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_URL}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("API로부터 데이터를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      setSnsList(() => [...data.snsList]);
    } catch (error) {
      console.error("사진 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  // 모달 열기
  const handleOpenRegistModal = () => {
    setModalOpen(true);
  };

  // 모달 닫기
  const handleCloseRegistModal = () => {
    fetchPhotos();
    setModalOpen(false);
  };

  // SNS 항목을 클릭하여 SnsDetail 모달 열기
  const handleOpenDetailModal = (sns) => {
    setSelectedSns(sns);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
  };

  useEffect(() => {}, [selectedSns]);

  const handleMoveToMyHome = () => {
    const userNick = localStorage.getItem("USER_NICK");
    navigate(`/snsBoard/${userNick}`);
  };

  return (
    <div>
      <div className="sub-link sns-board-sub">
        <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
        <Link to="/snsBoard">농사일기</Link>
      </div>
      <h2 className="menu-title">농사일기</h2>
      <div className="user-profile">
        <span>내 정보 </span>
        <img
          className="profileImg"
          src={userProfileImg !== "null" ? userProfileImg : userImg}
        />
        <span className="user-nick">{localStorage.getItem("USER_NICK")}</span>

        <button className="moveToMy-btn" onClick={handleMoveToMyHome}>
          내 홈으로 이동
        </button>
        <button className="modal-btn" onClick={handleOpenRegistModal}>
          게시글 등록
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseRegistModal}
          ariaHideApp={false}
          contentLabel="게시글 등록 모달"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <SnsRegist onRequestClose={handleCloseRegistModal} />
        </Modal>
      </div>
      <div className="line" />
      <p className="sub-title">핸디파머들의 농사일기</p>
      <ul className="sns-list">
        {snsList.map((sns, index) => (
          <li key={index}>
            <div onClick={() => handleOpenDetailModal(sns)}>
              {/* 클릭 핸들러 추가 */}
              {sns.snsImgs.map((img, imgIndex) => (
                <div key={imgIndex}>
                    <img src={img} alt={`photo-${index}-${imgIndex}`} />
                  <div className="sns-text">
                    <span><AccountCircleIcon />{sns.writer}</span>
                    <p>{sns.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* SnsDetail 모달 열기 */}
      {selectedSns && (
        <Modal
          isOpen={isDetailModalOpen} // isDetailModalOpen 상태를 사용하여 모달의 열림/닫힘을 제어합니다.
          onRequestClose={handleCloseDetailModal}
          ariaHideApp={false}
          contentLabel="게시글 상세 모달"
          className="modal-detail"
          overlayClassName="modal-overlay"
        >
          {/* writer를 URL 파라미터로 전달 */}
          <SnsDetail
            onRequestClose={handleCloseDetailModal}
            snsNo={selectedSns.snsNo}
            writer={selectedSns.writer}
          />
        </Modal>
      )}
    </div>
  );
};

export default SnsList;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SnsRegist from "./SnsRegist";
import SnsDetail from "./SnsDetail";
import "./Sns.scss";
import userImg from "../../image/user.png";
import { Link } from "react-router-dom";
import { fontWeight } from "@mui/system";

const API_URL = "http://localhost:8181/api/sns";

const SnsList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [snsList, setSnsList] = useState([]);
  const [page, setPage] = useState(1);
  const [profileImg, setProfileImg] = useState(userImg);
  const [selectedSns, setSelectedSns] = useState([]); // 선택된 SNS 항목을 저장하는 상태

  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    initializeProfileImg();
    fetchPhotos();
  }, [page]);

  // 사용자 프로필 이미지 초기화
  const initializeProfileImg = () => {
    const userProfileImg = localStorage.getItem("USER_PROFILE_IMG");
    if (userProfileImg) {
      setProfileImg(userProfileImg);
    }
  };

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
      setSnsList((prevSnsList) => [...prevSnsList, ...data.snsList]);
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
    setModalOpen(false);
  };

  // SNS 항목을 클릭하여 SnsDetail 모달 열기
  const handleOpenDetailModal = (sns) => {
    setSelectedSns(sns);
    setDetailModalOpen(true);
    console.log("snsno:", selectedSns.snsNo);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
  };

  useEffect(() => {
  }, [selectedSns]);
  

  return (
    <div>
      <h2 className="menu-title">SNS게시판</h2>
      <div className="user-profile">
        <span>내 정보 </span>
        <img className="profileImg" src={profileImg} />
        <span className="user-nick">{localStorage.getItem("USER_NICK")}</span>
      

        <button className="modal-btn" onClick={handleOpenRegistModal}>게시글 등록</button>
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
      <ul className="sns-list">
        {snsList.map((sns, index) => (
          <li key={index}>
            <div onClick={() => handleOpenDetailModal(sns)}> {/* 클릭 핸들러 추가 */}
              {sns.snsImgs.map((img, imgIndex) => (
                <div key={imgIndex}>
                  <img src={img} alt={`photo-${index}-${imgIndex}`} />
                  <div>
                    <span>{sns.writer}</span>
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
        {/* snsNo와 writer를 URL 파라미터로 전달 */}
        <SnsDetail onRequestClose={handleCloseDetailModal} snsNo={selectedSns.snsNo} writer={selectedSns.writer} />
        
      </Modal>
    )}
  </div>
  );
};

export default SnsList;

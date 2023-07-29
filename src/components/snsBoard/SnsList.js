import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SnsRegist from "./SnsRegist";
import "./Sns.scss";
import userImg from "../../image/user.png";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8181/api/sns";

const SnsList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [snsList, setSnsList] = useState([]);
  const [page, setPage] = useState(1);
  const [profileImg, setProfileImg] = useState(userImg);

  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    initializeProfileImg();
    fetchPhotos();
  }, [page]);

  const initializeProfileImg = () => {
    const userProfileImg = localStorage.getItem("USER_PROFILE_IMG");
    if (userProfileImg) {
      setProfileImg(userProfileImg);
    }
  };

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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="menu-title">SNS게시판</h2>
      <div className="user-profile">
        <span>내 정보 </span>
        <img className="profileImg" src={profileImg} />
        <span className="user-nick">{localStorage.getItem("USER_NICK")}</span>
      

        <button className="modal-btn" onClick={handleOpenModal}>게시글 등록</button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          ariaHideApp={false}
          contentLabel="게시글 등록 모달"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <SnsRegist onRequestClose={handleCloseModal} />
        </Modal>
      </div>
      <ul className="sns-list">
      {snsList.map((sns, index) => (
  <li key={index}>
    {sns.snsImgs.map((img, imgIndex) => (
      <Link to={`/snsBoard/${sns.snsNo}`} key={imgIndex}>
        <img
          src={img}
          alt={`photo-${index}-${imgIndex}`}
        />
      </Link>
    ))}
  </li>
))}
      </ul>
    </div>
  );
};

export default SnsList;

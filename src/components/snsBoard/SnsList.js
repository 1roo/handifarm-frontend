import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import SnsRegist from "./SnsRegist";
import "./Sns.scss";

const API_URL = "/api/cboards"; // 본인의 API 엔드포인트로 교체해주세요.

const SnsList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("사진 데이터를 가져오는데 실패했습니다:", error));
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>게시글 등록</button>
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
      <ul className="sns-list">
        {photos.map((photo) => (
          <li key={photo.snsNo}>
            <Link to={`/snsBoard/snsDetail/${photo.snsNo}`}>
              <img src={photo.imageUrl} alt={photo.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnsList;
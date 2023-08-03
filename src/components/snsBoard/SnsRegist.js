import React, { useEffect, useState } from "react";
import axios from "axios";
import registImg from "../../image/add-image.png";
import { Container } from "react-bootstrap";
import { API_BASE_URL as BASE, SNS } from "../../config/host-config";
import { useNavigate } from "react-router";

const SnsRegist = ({ onRequestClose }) => {
  const [content, setContent] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [imageFile, setImageFile] = useState(null); // 단일 이미지 파일 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기를 위한 상태

  const API_BASE_URL = `${BASE}${SNS}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // 이미지가 없을 때 빈 배열로 설정
      const formData = new FormData();
      formData.append("content", content);
      hashTags.forEach((tag) => formData.append("hashTags", tag));
      formData.append("snsImgs", imageFile || []); // 이미지 파일이 없을 경우 빈 배열로 설정

      // const formData = new FormData();
      // const snsContent = {
      //   content: content,
      //   hashTags: hashTags,
      // };
      // formData.append("snsContent");
      // formData.append("snsImgs", imageFile || []); // 이미지 파일이 없을 경우 빈 배열로 설정

      console.log(formData);

      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      alert("게시글이 등록되었습니다.");

      onRequestClose();
    } catch (error) {
      console.error("폼 제출 중 에러 발생:", error);
      // 에러 처리 또는 사용자에게 에러 메시지 표시
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  return (
    <Container maxwidth="300px">
      <form onSubmit={handleFormSubmit}>
        <div>
          <h2>게시글 등록</h2>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="이미지 미리보기"
              style={{ width: "200px", height: "200px", margin: "0 40px 20px" }}
            />
          ) : (
            <label htmlFor="itemImg" style={{ cursor: "pointer" }}>
              <img
                src={registImg}
                alt="이미지 아이콘"
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "0 40px 20px",
                }}
              />
            </label>
          )}
          <input
            type="file"
            id="itemImg"
            onChange={handleFileInputChange}
            accept="image/*" // 이미지 파일만 선택 가능하도록 지정
            style={{ display: "none" }}
          />
        </div>
        <div className="regist-content">
          <div>
            <label htmlFor="content">내용:</label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="hashTags">해시태그:</label>
            <input
              type="text"
              id="hashTags"
              value={hashTags.join(",")}
              onChange={(e) => setHashTags(e.target.value.split(","))}
            />
          </div>
        </div>
        <button className="regist-btn" type="submit">
          등록
        </button>
        <button className="exit-btn" type="button" onClick={onRequestClose}>
          취소
        </button>
      </form>
    </Container>
  );
};

export default SnsRegist;

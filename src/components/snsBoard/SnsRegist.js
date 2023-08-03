import React, { useEffect, useState } from "react";
import axios from "axios";
import registImg from "../../image/add-image.png";
import { Container } from "react-bootstrap";
import { API_BASE_URL as BASE, SNS } from "../../config/host-config";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";

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
    <Container className="container">
      <form onSubmit={handleFormSubmit} className="sns-regist-form">
        
        <h2>게시글 등록</h2>
        <div className="image-content">
          {imagePreview ? (
            <label htmlFor="itemImg" style={{ cursor: "pointer" }}>
              <img
                src={imagePreview}
                alt="이미지 미리보기"
              />
            </label>
          ) : (
            <label htmlFor="itemImg" style={{ cursor: "pointer" }}>
              <img
                src={registImg}
                alt="이미지 아이콘"
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
        </div> {/* image-content */}

        <div className="regist-content">
          <div>
            <label htmlFor="content">내용</label>
            {/* <TextField
              placeholder="내용을 작성해주세요."
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // required
              multiline
              rows={2}
              className="content-box"
            /> */}

            <input
              placeholder="내용을 작성해주세요."
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="hashTags">해시태그</label>
            <input
              placeholder="#농사, #즐거움, #힐링"
              type="text"
              id="hashTags"
              value={hashTags.join(",")}
              onChange={(e) => setHashTags(e.target.value.split(","))}
            />
          </div>
        </div> {/* regist-content */}

        <div className="sns-btn">
          <button className="regist-btn sns-btn" type="submit">
            등록
          </button>
          <button className="exit-btn sns-btn" type="button" onClick={onRequestClose}>
            취소
          </button>
        </div>
      </form>
    </Container>
  );
};

export default SnsRegist;

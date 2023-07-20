import React, { useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import "./Sns.scss";
import addImage from "../../image/add-image.png";

const SnsRegist = ({ onRequestClose }) => {
  const [formData, setFormData] = useState({
    content: "",
    fileUp: null,
    hashTags: "",
    previewUrl: null, // 추가: 파일 미리보기 URL 저장
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, fileUp: file });

    // 파일 미리보기 생성
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, previewUrl: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, previewUrl: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { content, fileUp, hashTags } = formData;

    // FormData를 사용하여 파일 업로드를 위한 데이터 전송
    const formDataToSend = new FormData();
    formDataToSend.append("content", content);
    formDataToSend.append("fileUp", fileUp);
    formDataToSend.append("hashTags", hashTags);

    // 서버로 데이터 전송
    axios
      .post("/api/cboard", formDataToSend) // 실제 API 엔드포인트로 변경해야 합니다.
      .then((response) => {
        console.log("게시글 등록 완료:", response.data);
        onRequestClose(); // 등록 성공 시 모달 닫기
      })
      .catch((error) => {
        console.error("게시글 등록 실패:", error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <div>
        <p className="menu-title">게시글 등록</p>
        <form onSubmit={handleSubmit}>
          <div className="photo-upload">
            {formData.previewUrl ? (
              <img src={formData.previewUrl} alt="미리보기" />
            ) : (
              <label htmlFor="fileUp">
                <img src={addImage} alt="사진 업로드" />
              </label>
            )}
            <input
              type="file"
              id="fileUp"
              name="fileUp"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <label htmlFor="content">내용:</label>
            <input type="text" name="content" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="hashTags">해시태그:</label>
            <input type="text" name="hashTags" onChange={handleChange} />
          </div>
          <button type="submit">등록</button>
        </form>
      </div>
    </Container>
  );
};

export default SnsRegist;

import React, { useState } from 'react';
import axios from 'axios';
import registImg from '../../image/add-image.png';
import { Container } from "react-bootstrap";

const SnsRegist = () => {
  const [content, setContent] = useState('');
  const [hashTags, setHashTags] = useState([]);
  const [itemImgs, setItemImgs] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기를 위한 상태

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('content', content);

      hashTags.forEach((tag) => formData.append('hashTags', tag));
      itemImgs.forEach((img) => formData.append('itemImgs', img));

      const response = await axios.post('/api/cboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      // 성공 시 응답 데이터 처리 또는 다른 페이지로 리다이렉션 처리
    } catch (error) {
      console.error('폼 제출 중 에러 발생:', error);
      // 에러 처리 또는 사용자에게 에러 메시지 표시
    }
  };

  const handleFileInputChange = (e) => {
    setItemImgs(e.target.files);
    // 이미지 미리보기를 위해 선택한 이미지 파일의 URL을 생성
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImagePreview(imageUrl);
  };

  return (
    <Container maxwidth="300px">
      <form onSubmit={handleFormSubmit}>
        <div>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="이미지 미리보기"
              style={{ width: '200px', height: '200px', margin: '0 40px 20px' }}
            />
          ) : (
            <label htmlFor="itemImgs" style={{ cursor: 'pointer' }}>
              <img
                src={registImg}
                alt="이미지 아이콘"
                style={{ width: '200px', height: '200px', margin: '0 40px 20px' }}
              />
            </label>
          )}
          <input
            type="file"
            id="itemImgs"
            onChange={handleFileInputChange}
            multiple
            style={{ display: 'none' }}
          />
        </div>
        <div className='regist-content'>
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
          <div>
            <label htmlFor="hashTags">해시태그:</label>
            <input
              type="text"
              id="hashTags"
              value={hashTags.join(',')}
              onChange={(e) => setHashTags(e.target.value.split(','))}
            />
          </div>
        </div>
        <button className='regist-btn' type="submit">등록</button>
      </form>
    </Container>
  );
};

export default SnsRegist;

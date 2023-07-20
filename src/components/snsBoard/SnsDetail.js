// src/components/snsBoard/SnsDetail.js

import React from "react";
import { useParams } from "react-router-dom";

// 가상의 사진 데이터
const photoData = [
  {
    snsNo: 1,
    title: "사진 1",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    snsNo: 2,
    title: "사진 2",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    snsNo: 3,
    title: "사진 3",
    imageUrl: "https://via.placeholder.com/300",
  },
];

const SnsDetail = () => {
  const { snsNo } = useParams();
  const photo = photoData.find((item) => item.snsNo === parseInt(snsNo));

  if (!photo) {
    return <div>해당 사진을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{photo.title}</h2>
      <img src={photo.imageUrl} alt={photo.title} />
    </div>
  );
};

export default SnsDetail;

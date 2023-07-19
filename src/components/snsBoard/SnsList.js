import React from "react";
import { Link } from "react-router-dom";
import "./Sns.scss";

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

const SnsList = () => {
  return (
    <div>
      <ul className="sns-list">
        {photoData.map((photo) => (
          <li key={photo.id}>
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

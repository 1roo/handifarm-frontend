import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SnsDetail = () => {
  const { snsNo } = useParams();
  const [photo, setPhoto] = useState(null);


  useEffect(() => {
    axios
      .get(`/api/cboard/${snsNo}`) // 실제 API 엔드포인트로 변경해야 합니다.
      .then((response) => {
        setPhoto(response.data);
      })
      .catch((error) => {
        console.error("게시물 데이터를 불러오는데 실패했습니다.", error);
        setPhoto(null);
      });
  }, [snsNo]);

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

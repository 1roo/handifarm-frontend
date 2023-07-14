import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { Container } from "react-bootstrap";

function BoardDetail() {
  const { boardNo } = useParams();
  const API_BASE_URL = `${BASE}${BOARD}/${boardNo}`;
  const [board, setBoard] = useState(null);

  console.log(API_BASE_URL);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    fetch(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoard(data);
        console.log("data: " + data);
      })
      .catch((error) => {});
  }, [API_BASE_URL]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <div className="cateTitle">
        <div className="category">{board.category == "notice" && "[공지]"}</div>
        <div className="category">{board.category == "free" && "[자유]"}</div>
        <div className="category">
          {board.category == "information" && "[정보]"}
        </div>
        <div>{board.title}</div>
      </div>
      <div className="info">
        <div className="writerInfo">
          <div className="writer">작성자{board.userNick}</div>
          <div className="regDate">{board.createDate}</div>
        </div>
        <div className="viewReply">
          <div className="viewCount">조회 {board.views}</div>
          <div className="replyCount">댓글</div>
        </div>
      </div>
      <hr />
      <div className="content">
        <p>{board.content}</p>
      </div>

      <hr />
    </Container>
  );
}

export default BoardDetail;

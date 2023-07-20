import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BoardReply from "./BoardReply";

function BoardDetail() {
  const { boardNo } = useParams();
  const API_BASE_URL = `${BASE}${BOARD}/${boardNo}`;
  const redirection = useNavigate();
  const [board, setBoard] = useState(null);
  const [replyUpdated, setReplyUpdated] = useState(false);

  const localUserNick = localStorage.getItem("USER_NICK");

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
        console.log("data: ", data);
      })
      .catch((error) => {});
  }, [API_BASE_URL, replyUpdated]);

  if (!board) {
    return <div>Loading...</div>;
  }

  // 게시글 삭제
  const deleteBoardHandler = (boardNo) => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      const apiUrl = `${BASE}${BOARD}/${boardNo}`;

      const token = localStorage.getItem("ACCESS_TOKEN");

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("게시글 삭제 실패");
          }
          console.log("게시글 삭제 성공");

          redirection("/board");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  // 게시글 수정 페이지로 이동
  const redirectToBoardModify = () => {
    redirection(`/boardModify/${boardNo}`);
  };

  // 댓글이 등록되면 호출되는 함수
  const handleReplySubmission = () => {
    // 댓글이 등록된 것을 알리기 위해 replyUpdated 상태를 변경합니다.
    setReplyUpdated(!replyUpdated);
  };

  return (
    <Container maxwidth="sm">
      <div className="cateTitle">
        <div className="category">{board.category === "NOTICE" && "[공지]"}</div>
        <div className="category">{board.category === "FREE" && "[자유]"}</div>
        <div className="category">{board.category === "INFORMATION" && "[정보]"}</div>
        <div>{board.title}</div>
      </div>
      <div className="info">
        <div className="writerInfo">
          <div className="writer">{board.userNick}</div>
          <div className="regDate">{board.createDate}</div>
          {board.userNick === localUserNick && (
            <button className="delete-board-btn" onClick={() => deleteBoardHandler(board.boardNo)}>
              삭제
            </button>
          )}
          {board.userNick === localUserNick && (
            <button className="modify-board-btn" onClick={redirectToBoardModify}>
              수정
            </button>
          )}
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
      <BoardReply
        boardNo={boardNo}
        onReplySubmitted={handleReplySubmission} // 댓글 등록 시 콜백 함수를 전달합니다.
      />
    </Container>
  );
}

export default BoardDetail;

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function BoardDetail() {
  const { boardNo } = useParams();
  const API_BASE_URL = `${BASE}${BOARD}/${boardNo}`;
  const redirection = useNavigate();
  const [board, setBoard] = useState(null);
 
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
        console.log("data: " , data);
      })
      .catch((error) => {});
  }, [API_BASE_URL]);

  
  if (!board) {
    return <div>Loading...</div>;
  }

  


  // 게시글 삭제
  const deleteBoardHandler = (boardNo) => {
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
  };


  // 게시글 수정 
  const modifyBoardHandler = (boardNo) => {
  };




  return (
    <Container maxwidth="sm">
      <div className="cateTitle">
        <div className="category">{board.category === "NOTICE" && "[공지]"}</div>
        <div className="category">{board.category === "FREE" && "[자유]"}</div>
        <div className="category">
          {board.category === "INFORMATION" && "[정보]"}
        </div>
        <div>{board.title}</div>
      </div>
      <div className="info">
        <div className="writerInfo">
          <div className="writer">{board.userNick}</div>
          <div className="regDate">{board.createDate}</div>
          {board.userNick === localUserNick && (
            <button
              className="delete-board-btn"
              onClick={() => deleteBoardHandler(board.boardNo)}
            >
              삭제
            </button>
          )}  
          {board.userNick === localUserNick && (
            <button
              className="modify-board-btn"
              onClick={() => modifyBoardHandler(board.boardNo)}
            >
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
      <div className="reply-box">
        <div className="reply-info">
          <div>
            <span className="user-nick">홍길동</span>
            <span className="reg-time">방금 전</span>
          </div>
          <div>
            <button className="reply-modify-btn">수정</button>
            <button className="reply-delete-btn">삭제</button>
          </div>
        </div>
        <span className="reply-content">쯔쯔가무시는 일본말인가요?</span>
      </div>
      <div className="reply-regist-box">
        <span className="regist-user-nick">홍홍홍</span>
        <div className="reply-content-box">
          <input
            className="reply-content"
            placeholder="댓글을 남겨보세요"
          />
          <button className="reply-regist-btn" >
            등록
          </button>
        </div>
      </div>
    </Container>
  );
}

export default BoardDetail;

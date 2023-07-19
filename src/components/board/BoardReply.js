import React, { useEffect, useState } from "react";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BoardReply = ({ boardNo }) => {
  const API_BASE_URL = `${BASE}${BOARD}/${boardNo}/boardReply`;
  const redirection = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState({
    boardReplies: [],
    totalPages: 0,
  });

  const [replyValue, setReplyValue] = useState({
    userNick: "",
    reply: "",
  });

  const saveInputState = ({ key, inputValue }) => {
    setReplyValue({
      ...replyValue,
      [key]: inputValue,
    });
  };

  const replyHandler = (e) => {
    const inputValue = e.target.value;
    saveInputState({
      ...replyValue,
      key: "reply",
      inputValue,
    });
  };

  const fetchRegistPost = () => {
    const API_BASE_URL = `${BASE}${BOARD}/${boardNo}/boardReply`; // 수정된 API_BASE_URL
    const token = localStorage.getItem("ACCESS_TOKEN");

    const requestData = {
      reply: replyValue.reply,
      boardNo: boardNo,
      userNick: localStorage.getItem("USER_NICK"),
    };

    fetch(API_BASE_URL, {
      method: "POST", // 댓글 등록을 위한 POST 요청으로 수정
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestData),
    }).then((res) => {
      if (res.status === 200) {
        alert("댓글 등록이 완료되었습니다.");
        console.log("로그로구" + JSON.stringify(requestData));
        redirection(`/board/${boardNo}`);
      } else {
        console.error();
      }
    });
  };

  const registButtonClickHandler = (e) => {
    e.preventDefault();
    fetchRegistPost();
  };

  // 댓글 리스트 불러오기
  const fetchBoardReplies = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await fetch(
        `${API_BASE_URL}?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setData(responseData); // API 결과로 받은 데이터를 상태에 저장
      console.log(data);
    } catch (error) {
      console.error("게시글 목록을 불러오는 중 에러 발생:", error);
    }
  };

  // 댓글 목록을 가져와서 상태에 저장
  useEffect(() => {
    fetchBoardReplies();
  }, []);

  // 댓글 수정
  const [editingState, setEditingState] = useState({});

  const handleEditClick = (replyNo) => {
    setEditingState({
      ...editingState,
      [replyNo]: true,
    });
  };

  const handleCancelEdit = (replyNo) => {
    setEditingState({
      ...editingState,
      [replyNo]: false,
    });
  };

  const handleSaveEdit = (replyNo) => {
    const replyToUpdate = data.boardReplies.find((reply) => reply.replyNo === replyNo);

    if (!replyToUpdate) {
      console.error("댓글을 찾을 수 없습니다.");
      return;
    }

    const API_BASE_URL = `${BASE}${BOARD}/${boardNo}/boardReply/${replyNo}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const requestData = {
      reply: replyToUpdate.reply,
      replyNo: replyNo
    };

    fetch(API_BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => {
        console.log(requestData);
        if (res.status === 200) {
          setEditingState({
            ...editingState,
            [replyNo]: false,
          });
          fetchBoardReplies();
        } else {
          console.error("댓글 수정 실패");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };


  //댓글 삭제
  // 댓글 삭제 요청 보내는 함수
const deleteReplyHandler = (replyNo) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  
  fetch(`${API_BASE_URL}/${replyNo}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("댓글 삭제 성공");
        // 댓글 삭제 후 댓글 목록을 다시 불러옴
        fetchBoardReplies();
      } else if (res.status === 401) {
        console.error("인증 실패");
        // 인증 실패 처리
      } else {
        console.error("댓글 삭제 실패");
        // 기타 실패 처리
      }
    })
    .catch((error) => {
      console.error("댓글 삭제 중 오류 발생:", error);
    });
};

// 댓글 삭제 버튼 클릭 핸들러
const handleDeleteClick = (replyNo) => {
  if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
    deleteReplyHandler(replyNo);
  }
};

  return (
    <Container maxwidth="sm">
      {data.boardReplies &&
        data.boardReplies.map((reply) => (
          <div className="reply-box" key={reply.replyNo}>
            {editingState[reply.replyNo] ? (
              // 수정 모드일 때
              <div className="reply-info">
                <div>
                  <div className="reply-info">
                    <div className="nick-time">
                    <span className="user-nick">{reply.userNick}</span>
                    <span className="reg-time">{reply.updateDate}</span>
                  </div>
                  <div className="save-cancel">
                    <button
                      className="reply-save-btn"
                      onClick={() => handleSaveEdit(reply.replyNo)}
                    >
                      저장
                    </button>
                    <button
                      className="reply-cancel-btn"
                      onClick={() => handleCancelEdit(reply.replyNo)}
                    >
                      취소
                    </button>
                  
                  </div>
                  </div>
                  <div className="margin-div">
                    <input
                      type="text"
                      value={reply.reply}
                      onChange={(e) => {
                        const updatedReplies = [...data.boardReplies];
                        const index = updatedReplies.findIndex(
                          (r) => r.replyNo === reply.replyNo
                        );
                        console.log(updatedReplies);
                        if (index !== -1) {
                          updatedReplies[index].reply = e.target.value;
                          setData({
                            ...data,
                            boardReplies: updatedReplies,
                          });
                        }
                      }}
                    />
                  </div>
                </div>
                
              </div>
            ) : (
              // 일반 모드일 때
              <div className="reply-info">
                <div>
                <div className="nick-time">
                  <span className="user-nick">{reply.userNick}</span>
                  <span className="reg-time">{reply.updateDate ? reply.updateDate : reply.createDate}</span>
                </div>
                <div className="margin-div">
                <span className="reply-content">{reply.reply}</span>
                  
                </div>
                </div>
                <div>
                  
                  <button
                    className="reply-edit-btn"
                    onClick={() => handleEditClick(reply.replyNo)}
                  >
                    수정
                  </button>
                  <button className="reply-delete-btn" onClick={() => handleDeleteClick(reply.replyNo)}>삭제</button>
                </div>
              </div>
            )}
          </div>
        ))}
      <div className="reply-regist-box">
        <span className="regist-user-nick">{localStorage.getItem("USER_NICK")}</span>
        <div className="reply-content-box">
          <input
            className="reply-content"
            placeholder="댓글을 남겨보세요"
            onChange={replyHandler}
          />
          <button className="reply-regist-btn" onClick={registButtonClickHandler}>
            등록
          </button>
        </div>
      </div>
    </Container>
  );
};

export default BoardReply;

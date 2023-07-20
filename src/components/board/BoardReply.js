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

  const [replyValues, setReplyValues] = useState({});

  const saveInputState = ({ key, inputValue, replyNo }) => {
    setReplyValues((prevValues) => ({
      ...prevValues,
      [replyNo]: {
        ...prevValues[replyNo],
        [key]: inputValue,
      },
    }));
  };

  const replyHandler = (e, replyNo) => {
    const inputValue = e.target.value;
    saveInputState({
      key: "reply",
      inputValue,
      replyNo,
    });
  };

  const fetchRegistPost = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    const requestData = {
      reply: replyValues[boardNo] ? replyValues[boardNo].reply : "",
      boardNo: boardNo,
      userNick: localStorage.getItem("USER_NICK"),
    };

    fetch(API_BASE_URL, {
      method: "POST",
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

  const fetchBoardReplies = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await fetch(
        `${BASE}${BOARD}/${boardNo}/boardReply?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setData(responseData); // API 결과로 받은 데이터를 상태에 저장
    } catch (error) {
      console.error("게시글 목록을 불러오는 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchBoardReplies();
  }, [boardNo, currentPage, pageSize]);

  // 댓글 수정과 관련된 코드
  const [editingState, setEditingState] = useState({});

  const handleEditClick = (replyNo) => {
    setEditingState((prevEditingState) => ({
      ...prevEditingState,
      [replyNo]: true,
    }));
  };

  const handleCancelEdit = (replyNo) => {
    setEditingState((prevEditingState) => ({
      ...prevEditingState,
      [replyNo]: false,
    }));
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
      reply: replyValues[replyNo] ? replyValues[replyNo].reply : replyToUpdate.reply,
      replyNo: replyNo,
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
        if (res.status === 200) {
          setEditingState((prevEditingState) => ({
            ...prevEditingState,
            [replyNo]: false,
          }));
          fetchBoardReplies();
        } else {
          console.error("댓글 수정 실패");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // 댓글 삭제와 관련된 코드
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
          fetchBoardReplies();
        } else if (res.status === 401) {
          console.error("인증 실패");
        } else {
          console.error("댓글 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("댓글 삭제 중 오류 발생:", error);
      });
  };

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
                      value={
                        replyValues[reply.replyNo] && replyValues[reply.replyNo].reply
                          ? replyValues[reply.replyNo].reply
                          : reply.reply
                      }
                      onChange={(e) => replyHandler(e, reply.replyNo)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // 일반 모드일 때
              <div className="reply-info">
                <div className="nick-time">
                  <span className="user-nick">{reply.userNick}</span>
                  <span className="reg-time">
                    {reply.updateDate ? reply.updateDate : reply.createDate}
                  </span>
                </div>
                <div className="margin-div">
                  <span className="reply-content">{reply.reply}</span>
                </div>
                <div>
                  <button
                    className="reply-edit-btn"
                    onClick={() => handleEditClick(reply.replyNo)}
                  >
                    수정
                  </button>
                  <button
                    className="reply-delete-btn"
                    onClick={() => handleDeleteClick(reply.replyNo)}
                  >
                    삭제
                  </button>
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
            onChange={(e) => replyHandler(e, boardNo)}
          />
          <button
            className="reply-regist-btn"
            onClick={registButtonClickHandler}
          >
            등록
          </button>
        </div>
      </div>
    </Container>
  );
};

export default BoardReply;

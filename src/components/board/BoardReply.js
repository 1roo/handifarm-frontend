import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BoardReply = ({ boardNo, onReplySubmitted }) => {

  const API_BASE_URL = `${BASE}${BOARD}/${boardNo}/boardReply`;
  const redirection = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState({
    boardReplies: [],
    totalPages: 0,
  });

  // 입력 창(input element)에 대한 참조를 저장하기 위한 useRef
  const replyInputRef = useRef(null);

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

    const requestData = {
      reply: replyValues[boardNo] ? replyValues[boardNo].reply : "",
      boardNo: boardNo,
      userNick: localStorage.getItem("USER_NICK"),
    };

    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestData),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("댓글 등록이 완료되었습니다.");
          console.log(requestData);
          // 댓글 등록이 성공하면 입력 창을 초기화
          replyInputRef.current.value = "";
          fetchBoardReplies();
          onReplySubmitted(); // 이 부분에서 바로 콜백 함수 호출
        } else {
          console.error();
        }
      })
      .catch((error) => {
        console.error("댓글 등록 중 에러 발생:", error);
      });
  };

  const registButtonClickHandler = (e) => {
    e.preventDefault();
    fetchRegistPost();
  };

  const fetchBoardReplies = async () => {
    try {
      // 페이지 번호와 사이즈를 설정하여 댓글 목록을 요청합니다.
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
    if(!token){ //로그인한 회원에게만 서비스 제공
      alert('로그인이 필요한 서비스입니다.')
      redirection('/login')
    }

    // 페이지 번호가 변경될 때마다 해당 페이지에 맞는 댓글 목록을 가져오도록 수정합니다.
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
                <div className="reply-info-top">
                  <div className="nick-time">
                    <span className="user-nick">{reply.userNick}</span>
                    <span className="reg-time">
                      {reply.updateDate ? reply.updateDate : reply.createDate}
                    </span>
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

                <div className="reply-content">
                  <span className="reply-content">{reply.reply}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      <div className="reply-regist-box">
        <span className="regist-user-nick">{localStorage.getItem("USER_NICK")}</span>
        <div className="reply-content-box">
          {/* 입력 창(input element)에 ref를 사용하여 참조를 설정합니다 */}
          <input
            className="reply-content"
            placeholder="댓글을 남겨보세요"
            onChange={(e) => replyHandler(e, boardNo)}
            ref={replyInputRef}
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

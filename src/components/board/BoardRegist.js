// BoardRegist.js

import "./Board.scss";
import React, { useState } from "react";
import { MenuItem, Grid, CssBaseline, FormControl, Select, Container, TextField, Button } from "@mui/material";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { useNavigate } from "react-router-dom";

function BoardRegist({ userNick }) {
  const redirection = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState("all");
  const handleTopicChange = (event) => {
    const selectedValue = event.target.value;
    // "관리자"가 아닌 경우 "selectedTopic"을 "all"로 설정하여 "공지" 옵션을 숨깁니다.
    if (userNick !== "관리자" && selectedValue === "NOTICE") {
      setSelectedTopic("all");
    } else {
      setSelectedTopic(selectedValue);
    }
  };

  const [boardValue, setBoardValue] = useState({
    userNick: "",
    category: "",
    title: "",
    content: "",
  });

  const saveInputState = ({ key, inputValue }) => {
    setBoardValue({
      ...boardValue,
      [key]: inputValue,
    });
  };

  const titleHandler = (e) => {
    const inputValue = e.target.value;
    saveInputState({
      ...boardValue,
      key: "title",
      inputValue,
    });
  };

  const contentHandler = (e) => {
    const inputValue = e.target.value;
    saveInputState({
      ...boardValue,
      key: "content",
      inputValue,
    });
  };

  const fetchRegistPost = () => {
    const API_BASE_URL = BASE + BOARD;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const requestData = {
      category: selectedTopic,
      title: boardValue.title,
      content: boardValue.content,
    };

    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestData),
    }).then((res) => {
      if (res.status === 200) {
        alert("게시글 등록이 완료되었습니다.");
        console.log(JSON.stringify(requestData));
        redirection("/board");
      } else {
        console.error();
      }
    });
  };

  const registButtonClickHandler = (e) => {
    e.preventDefault();
    fetchRegistPost();
  };

  const cancelButtonClickHandler = () => {
    redirection("/board");
  };

  return (
    <>
      <p className="menu-title">게시글 작성</p>
      <Container component="main" maxWidth="ml">
        <CssBaseline />
        <Grid
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <Select id="topic" value={selectedTopic} onChange={handleTopicChange}>
                <MenuItem value={"all"}>
                  <em>말머리</em>
                </MenuItem>
                {userNick === "관리자" && <MenuItem value={"NOTICE"}>공지</MenuItem>}
                <MenuItem value={"INFORMATION"}>정보</MenuItem>
                <MenuItem value={"FREE"}>자유</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField placeholder="제목" variant="outlined" onChange={titleHandler} />
          </Grid>
        </Grid>
        <br />
        <hr />
        <FormControl sx={{ minWidth: 700, alignItems: "center", justifyContent: "center" }}>
          <textarea placeholder="내용을 입력하세요" onChange={contentHandler} />
        </FormControl>
        <Container
          component="main"
          maxWidth="sm"
          spacing={1}
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="registBtns">
            <Button className="green-btn" type="submit" fullWidth onClick={registButtonClickHandler}>
              등록하기
            </Button>

            <Button id="exitBtn" type="button" fullWidth onClick={cancelButtonClickHandler}>
              취소
            </Button>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default BoardRegist;

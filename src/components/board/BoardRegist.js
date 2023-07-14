import "./Board.scss";

import { React, useState } from "react";
import {
  MenuItem,
  Grid,
  CssBaseline,
  Box,
  FormControl,
  Select,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";

function BoardRegist() {
  const [selectedTopic, setSelectedTopic] = useState("all"); // 기본값으로 'all'을 선택
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  //회원 가입 처리 서버 요청
  const fetchRegistPost = () => {
    const API_BASE_URL = BASE + BOARD;

    const requestData = {};

    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(requestData),
    }).then((res) => {
      if (res.status === 200) {
        alert("게시글 등록이 완료되었습니다.");
      } else {
        alert("서버와의 통신이 원활하지 않습니다.");
        console.log(JSON.stringify(requestData));
      }
    });
  };

  // 회원 가입 버튼 클릭 핸들러
  const registButtonClickHandler = (e) => {
    e.preventDefault();

    fetchRegistPost();
  };

  return (
    <>
      <p className="menu-title">게시글 작성</p>
      <Container component="main" maxWidth="ml">
        <CssBaseline />
        <Grid
          container
          spacing={0}
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="topic"
                value={selectedTopic}
                onChange={handleTopicChange}
              >
                <MenuItem value={"all"}>
                  <em>말머리</em>
                </MenuItem>
                <MenuItem value={"notice"}>공지</MenuItem>
                <MenuItem value={"information"}>정보</MenuItem>
                <MenuItem value={"free"}>자유</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField placeholder="제목" variant="outlined" />
          </Grid>
        </Grid>
        <br />
        <hr />

        <Grid
          item
          xs={12}
          sm={12}
          container
          spacing={0}
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <textarea maxRows={13} placeholder="내용을 입력하세요" />
          </FormControl>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={3} sm={3}>
            <Button
              className="green-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "300px" }}
              onClick={registButtonClickHandler}
            >
              등록하기
            </Button>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Button
              id="exitBtn"
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "300px" }}
            >
              취소
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BoardRegist;

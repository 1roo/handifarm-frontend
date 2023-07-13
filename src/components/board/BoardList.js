import "./Board.scss";

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  FormControl,
  Grid,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Stack,
  Pagination
} from "@mui/material";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";

function BoardList() {
  const [data, setData] = useState([]);


  const API_BASE_URL = BASE + BOARD;

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    fetch(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.postList);
        console.log(data);
        console.log(data.postList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  

  const [selectedTopic, setSelectedTopic] = useState("all"); // 기본값으로 'all'을 선택
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const [selectedCondition, setSelectedCondition] = useState("all"); // 기본값으로 'all'을 선택
  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;
  const pageCount = Math.ceil(data.length / itemsPerPage);


  //공지글이 제일 최상단에 고정되도록
  const sortedData = [...data].sort((a, b) => {
    if (a.category === "notice" && b.category !== "notice") return -1;
    if (a.category !== "notice" && b.category === "notice") return 1;
    return 0;
  });
  
  const displayedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <p className="menu-title">게시판</p>
      <Container maxWidth="ml">
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="condition"
                value={selectedCondition}
                onChange={handleConditionChange}
              >
                <MenuItem value={"all"}>
                  <em>검색조건</em>
                </MenuItem>
                <MenuItem value={"title"}>제목</MenuItem>
                <MenuItem value={"content"}>내용</MenuItem>
                <MenuItem value={"userNick"}>작성자</MenuItem>
                <MenuItem value={"titleContent"}>글+내용</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField variant="outlined" />
            <Button className="searchBtn" variant="contained">
              검색
            </Button>
          </Grid>
        </Grid>
        <br />
        <hr />
        <Grid maxWidth="1200px" margin="0 auto">
          <Table bordered size="xl">
            <thead>
              <tr>
                <th>말머리</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row) => (
                <tr
                  style={
                    row.category == "notice"
                      ? { backgroundColor: "gainsboro" }
                      : { backgroundColor: "none" }
                  }
                  key={row.boardNo}
                >
                  <td className="td">
                    <div
                      style={
                        row.category == "notice"
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {row.category == "information" && "정보"}
                      {row.category == "free" && "자유"}
                    </div>
                    <div
                      className="notice-box"
                      style={
                        row.category == "notice"
                          ? { display: "block", color: "red" }
                          : { display: "none" }
                      }
                    >
                      {row.category == "notice" && "공지"}
                    </div>
                  </td>
                  <td
                    className="td td-title"
                    style={
                      row.category == "notice"
                        ? { color: "red", fontWeight: "bold" }
                        : { color: "black" }
                    }
                  >
                    {row.title}
                  </td>
                  <td className="td">{row.userNick}</td>
                  <td className="td">{row.createDate}</td>
                  <td className="td">{row.views}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid>
        <Grid>
          <Stack spacing={2}>
          <Pagination
      count={pageCount}
      page={currentPage}
      color="success"
      onChange={(event, page) => setCurrentPage(page)} />
          </Stack>
        </Grid>
      </Container>
    </>
  );
}

export default BoardList;

import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";
import { useNavigate } from "react-router-dom";
import CustomPagination from "./CustomPagination";

function BoardList() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    boards: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");

  const API_BASE_URL = BASE + BOARD;

  const token = localStorage.getItem("ACCESS_TOKEN");

  // API 호출을 통해 게시글 목록을 가져오는 함수
  const fetchBoardsByPage = async () => {
    try {
      console.log(
        "API 호출 URL:",
        `${API_BASE_URL}?page=${currentPage}&size=${pageSize}&category=${selectedTopic}&condition=${selectedCondition}`
      );
      const response = await fetch(
        `${API_BASE_URL}?page=${currentPage}&size=${pageSize}&category=${selectedTopic}&condition=${selectedCondition}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("API 응답 데이터:", responseData);
      setData(responseData); // API 결과로 받은 데이터를 상태에 저장
    } catch (error) {
      console.error("게시글 목록을 불러오는 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    // if(!token){ //회원에게만 서비스를 제공.
    //   alert('로그인이 필요한 서비스입니다.')
    //   navigate('/login')
    // }

    // 페이지가 변경되거나 "Topic" 또는 "Search Condition"이 변경되면 API 호출을 수행하여 데이터 업데이트.
    fetchBoardsByPage();
  }, [currentPage, pageSize, token]);

  // 게시글 데이터가 변경될 때마다 공지와 일반 게시글로 분리하여 업데이트
  const [noticeBoards, setNoticeBoards] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const noticeBoards =
      data.boards && data.boards.filter((board) => board.category === "NOTICE");
    const otherBoards =
      data.boards && data.boards.filter((board) => board.category !== "NOTICE");

    setNoticeBoards(noticeBoards || []);
    setBoards(otherBoards || []);
  }, [data]);

  // 페이지 변경 시 호출되는 콜백 함수
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  // API 호출을 통해 게시물 검색하는 함수
  const searchBoardList = async (category, condition, searchWord) => {
    try {
      console.log(
        "검색 요청 URL : ",
        `${API_BASE_URL}/search?category=${selectedTopic}&condition=${selectedCondition}&searchWord=${searchKeyword}`
      );
      const response = await fetch(
        `${API_BASE_URL}/search?category=${selectedTopic}&condition=${selectedCondition}&searchWord=${searchKeyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setData({
        boards: responseData,
        totalPages: [...responseData].length / 20,
      });
      console.log("data: ", data);
    } catch (error) {
      console.error("검색 중 에러 발생:", error);
    }
  };

  // 검색 버튼을 클릭할 때 호출되는 함수
  const handleSearchButtonClick = async () => {
    try {
      console.log("검색 버튼 클릭됨!");

      setCurrentPage(1);

      searchBoardList(selectedTopic, selectedCondition, searchKeyword);
    } catch (error) {
      console.error("게시글 목록을 불러오는 중 에러 발생:", error);
    }
  };

  useEffect(() => {}, [selectedTopic, selectedCondition]);

  return (
    <>
      <p className="menu-title">게시판</p>
      <Container maxwidth="ml">
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
            <FormControl sx={{ m: 1 }}>
              <Select
                id="topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                <MenuItem value={"all"}>
                  <em>말머리</em>
                </MenuItem>
                <MenuItem value={"NOTICE"}>공지</MenuItem>
                <MenuItem value={"INFORMATION"}>정보</MenuItem>
                <MenuItem value={"FREE"}>자유</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="condition"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
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
            <TextField
              variant="outlined"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button
              className="searchBtn"
              variant="contained"
              onClick={handleSearchButtonClick}
            >
              검색
            </Button>
          </Grid>
        </Grid>
        <br />
        <hr />
        <Grid maxwidth="1200px" margin="0 auto">
          <Table bordered size="xl">
            <thead>
              <tr>
                <th>글번호</th>
                <th>말머리</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {!!data.boards &&
                data.boards.map((row) => (
                  <tr
                    style={
                      row.category === "NOTICE"
                        ? { backgroundColor: "gainsboro" }
                        : { backgroundColor: "none" }
                    }
                    key={row.boardNo}
                  >
                    <td className="td">{row.boardNo}</td>
                    <td className="td">
                      <div
                        style={
                          row.category === "NOTICE"
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        {row.category === "INFORMATION" && "정보"}
                        {row.category === "FREE" && "자유"}
                      </div>
                      <div
                        className="notice-box"
                        style={
                          row.category === "NOTICE"
                            ? { display: "block", color: "red" }
                            : { display: "none" }
                        }
                      >
                        {row.category === "NOTICE" && "공지"}
                      </div>
                    </td>
                    <td
                      className="td td-title"
                      style={
                        row.category === "NOTICE"
                          ? { color: "red", fontWeight: "bold" }
                          : { color: "black" }
                      }
                      onClick={() => {
                        navigate(`/board/${row.boardNo}`);
                      }}
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
          <div className="regist-btn-div">
            <Button
              className="regist-btn"
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/boardRegist")}
            >
              글 작성
            </Button>
          </div>
        </Grid>
        <Grid>
          <Stack spacing={2}>
            <CustomPagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </Container>
    </>
  );
}

export default BoardList;

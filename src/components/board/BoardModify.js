import { MenuItem, Grid, CssBaseline, FormControl, Select, Container, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL as BASE, BOARD } from "../../config/host-config";

function BoardRegist() {
  const { boardNo } = useParams();
  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const token = localStorage.getItem("ACCESS_TOKEN");
  const redirection = useNavigate();

  useEffect(() => {
    if(!token){ //회원에게만 서비스를 제공.
      alert('로그인이 필요한 서비스입니다.')
      redirection('/login')
    }

    if (boardNo) { // boardNo가 존재할 때만 fetch 요청
      const token = localStorage.getItem("ACCESS_TOKEN");
      const API_BASE_URL = `${BASE}${BOARD}/${boardNo}`;
  
      fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBoard(data);
          console.log("data: ", data);
          // 데이터를 불러온 후에 title과 content 값을 설정
          setTitle(data.title);
          setContent(data.content);
        })
        .catch((error) => {});
    }
  }, [boardNo]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUpdateBoard = () => {
    const result = window.confirm("정말 수정하시겠습니까?");
    if(result) {
        if (!board) {
            console.error("게시글 정보가 없습니다.");
            return;
          }
        
          const token = localStorage.getItem("ACCESS_TOKEN");
          const apiUrl = `${BASE}${BOARD}/${boardNo}`;
        
          // 사용자가 수정한 내용이 없을 경우 기존의 값을 그대로 사용하도록 처리
          const updatedCategory = board.category;
          const updatedTitle = title.trim() !== "" ? title : board.title;
          const updatedContent = content.trim() !== "" ? content : board.content;
        
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
              category: updatedCategory,
              title: updatedTitle,
              content: updatedContent,
            }),
          };
          
          fetch(apiUrl, requestOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error("게시글 수정 실패");
              }
              console.log("게시글 수정 성공");
              redirection(`/board/${boardNo}`);
            })
            .catch((error) => {
              console.error(error.message);
            });
        } else {
            alert("수정을 취소합니다.")
            redirection(`/board/${boardNo}`);
        }
        
    } 
    const handleCancelUpdate = () => {
        redirection(`/board/${boardNo}`);
      };

    

  return (
    <>
    <div className="sub-link sns-board-sub">
      <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
      <Link to="/board">게시판</Link> <span> &gt; </span> 
      <span style={{ cursor: "pointer" }}>게시글 수정</span>
    </div>
      <p className="menu-title">게시글 수정</p>
      <Container component="main" maxWidth="ml">
        <CssBaseline />
        <Grid sx={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Grid>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <Select id="topic" value={board?.category || ""} disabled>
                <MenuItem value={""}><em>말머리</em></MenuItem>
                <MenuItem value={"NOTICE"}>공지</MenuItem>
                <MenuItem value={"INFORMATION"}>정보</MenuItem>
                <MenuItem value={"FREE"}>자유</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField placeholder="제목" variant="outlined" value={title || board?.title} onChange={handleTitleChange} />
          </Grid>
        </Grid>
        <br />
        <hr />
        <FormControl sx={{ minWidth: 700, alignItems: "center", justifyContent: "center" }}>
          <textarea value={content || board?.content} onChange={handleContentChange}></textarea>
        </FormControl>
        <Container component="main" maxWidth="sm" spacing={1} sx={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="registBtns">
            <Button className="green-btn" type="button" fullWidth onClick={handleUpdateBoard}>수정하기</Button>
            <Button id="exitBtn" type="button" fullWidth onClick={handleCancelUpdate}>취소</Button>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default BoardRegist;
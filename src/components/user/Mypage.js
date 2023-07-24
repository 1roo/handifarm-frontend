import { useState, useEffect } from "react";
import "./Join.scss";

import * as React from "react";
import {
  Select,
  MenuItem,
  Button,
  FormControl,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mypage = () => {


  const redirection = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN");
  const API_BASE_URL = "http://localhost:8181/api/user";

  useEffect(() => {
    // daum 객체 전역 범위에 선언
    window.daum = window.daum || {};

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
        document.body.removeChild(script);
      };
  }, []);


  const [userValue, setUserValue] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userNick: "",
    userEmail: "",
    userPhone: "",
    userAddrBasic: "",
    userAddrDetail: "",
    userPostcode: "",
  });


  useEffect(() => {
    // API를 호출하여 사용자 정보 가져오기
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/mypage`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUserValue(response.data); // 가져온 사용자 정보를 상태 변수에 저장
        } else {
          throw new Error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserData(); // API 호출 함수 실행
  }, []); // useEffect의 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  console.log("userValue: " + JSON.stringify(userValue));


  //이름변경 함수
  const [valueUserName, setValueUserName] = useState(userValue.userName);
  const nameChangeHandler = (e) => {
    const inputValue = e.target.value;
    setValueUserName(inputValue);
  }


  //주소검색 입력 변수
  const handlePostcode = () => {
    let flag = true;
    new window.daum.Postcode({
      oncomplete: function (data) {
        const { zonecode, roadAddress } = data;
        let extraRoadAddr = "";
        console.log("zonecode: ", zonecode);

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (zonecode) {
          // flag = true;
          setUserValue({
            ...userValue,
            userPostcode: zonecode,
            userAddrBasic: roadAddress,
          });
        }
      },
    }).open();
  };

  //상세주소 입력 변수
  const addrDetailHandler = (e) => {
    const inputValue = e.target.value;
       setUserValue({
      ...userValue,
      userAddrDetail: inputValue,
    });
  };

  const defaultTheme = createTheme();

  return (
    <>
      <h2 className="menu-title">마이페이지</h2>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="off"
                    name="userId"
                    fullWidth
                    id="userId"
                    disabled
                    label={localStorage.getItem("USER_ID")}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="userPw"
                    fullWidth
                    id="userPw"
                    type="password"
                    label="비밀번호"
                  />

                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="pwCheck"
                    type="password"
                    fullWidth
                    id="pwCheck"
                    label="비밀번호 확인"
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="이름"
                    value={valueUserName}
                    onChange={nameChangeHandler}
                  />
   
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="userNick"
                    fullWidth
                    id="userNick"
                    label="닉네임"
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    autoComplete="off"
                    name="email1"
                    required
                    fullWidth
                    id="email1"
                    label="이메일"
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <span className="at">@</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      id="email2"
                      fullWidth
                      displayEmpty
                    >
                      <MenuItem value="gmail.com">gmail.com</MenuItem>
                      <MenuItem value="naver.com">naver.com</MenuItem>
                      <MenuItem value="hanmail.net">hanmail.net</MenuItem>
                      <MenuItem value="daum.net">daum.net</MenuItem>
                      <MenuItem value="nate.com">nate.com</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <TextField
                    autoComplete="off"
                    name="phone1"
                    fullWidth
                    id="phone1"
                    label="010"
                    disabled
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    autoComplete="off"
                    name="phone2"
                    required
                    fullWidth
                    id="phone2"
                    inputProps={{ maxLength: 4 }}
                  />
                </Grid>

                <Grid item xs={3} sm={3}>
                  <TextField
                    autoComplete="off"
                    name="phone3"
                    required
                    fullWidth
                    id="phone3"
                    label=""
                    inputProps={{ maxLength: 4 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    className="green-btn"
                    id="phoneCheckBtn"
                    type="button"
                    fullWidth
                    variant="contained"
                  >
                    인증번호전송
                  </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    autoComplete="off"
                    name="phoneCheck"
                    required
                    fullWidth
                    id="inputPhoneCheckNum"
                    label="인증번호 4자리"
                    inputProps={{ maxLength: 4 }}
                  />

                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    className="green-btn"
                    id="CheckBtn"
                    type="button"
                    fullWidth
                    variant="contained"
                  >
                    인증하기
                  </Button>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <TextField
                    type="text"
                    id="sample4_postcode"
                    name="Postcode"
                    placeholder="우편번호"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    className="green-btn"
                    variant="contained"
                    fullWidth
                    onClick={handlePostcode}
                  >
                    우편번호 찾기
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    id="sample4_roadAddress"
                    name="roadAddress"
                    placeholder="도로명주소"
                    value={userValue.userAddrBasic}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    type="text"
                    id="sample4_detailAddress"
                    name="detailAddress"
                    placeholder="상세주소"
                    onBlur={addrDetailHandler}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Button
                    className="green-btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    회원정보수정
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    id="exitBtn"
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    취소
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Mypage;

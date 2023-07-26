import { useState, useEffect } from "react";
import "./Join.scss";
import userImg from "../../image/user.png";

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
  NativeSelect,
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
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  useEffect(() => {
    let isMounted = true;

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
          console.log('data: ', response.data);
          if(isMounted) {
            setUserValue(response.data); // 가져온 사용자 정보를 상태 변수에 저장
            setEmail1(response.data.userEmail.split('@')[0]);
            setEmail2(response.data.userEmail.split('@')[1]);
            setPhone2(response.data.userPhone.substr(3,4));
            setPhone3(response.data.userPhone.substr(7,4));
          }
        } else {
          throw new Error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserData(); // API 호출 함수 실행

    return () => {
      isMounted = false;
    }

  }, []); // useEffect의 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함




  //이름변경 함수
  const nameChangeHandler = (e) => {
    const inputValue = e.target.value;
    console.log('nameChangeHandler called! inputValue: ', inputValue);
    setUserValue({...userValue, userName: inputValue})
  }

  //닉네임변경 함수
  const nickChangeHandler = (e) => {
    const inputValue = e.target.value;
    console.log('nickChangeHandler called! inputValue: ', inputValue);
    setUserValue({...userValue, userNick: inputValue})
  }

  //이메일변경 함수
  console.log('email1: ', email1);
  console.log('email2: ', email2);
  
  const email1ChangeHandler = (e) => {
    const inputValue = e.target.value;
    console.log('email1ChangeHandler called! inputValue: ', inputValue);
    setEmail1(inputValue);
  }
  
  const email2ChangeHandler = (e) => {
    const inputValue = e.target.value;
    console.log('email1ChangeHandler called! inputValue: ', inputValue);
    setEmail2(inputValue);
  }

  //핸드폰변경 함수
  let [isPhoneChanged, setIsPhoneChanged] = useState(false);

  console.log('phone2: ', phone2);
  console.log('phone3: ', phone3);

  const phone2ChangeHandler = (e) => {
    const inputValue = e.target.value;
    setPhone2(inputValue);
    setIsPhoneChanged(true);
  }

  const phone3ChangeHandler = (e) => {
    const inputValue = e.target.value;
    setPhone3(inputValue);
    setIsPhoneChanged(true);
  }


  //인증번호 받기
  const [phoneCheckNum, setPhoneCheckNum] = useState("");

  const phoneHandler = () => {
    const $phone2 = document.getElementById("phone2").value;
    const $phone3 = document.getElementById("phone3").value;
    let fullPhoneNum = "010" + $phone2 + $phone3;
    if (!isPhoneChanged) {
      alert("휴대전화가 변경되지 않았습니다.");
      console.log(fullPhoneNum);
    } else if (isPhoneChanged) {
      alert("인증번호가 전송되었습니다.")
    } else {
      alert("휴대폰번호를 입력하세요");
    }
    const phoneData = {
      sendTo: fullPhoneNum,
    };

    //인증번호 요청
    fetch(`${API_BASE_URL}/phoneNumAuthenticate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(phoneData),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        setPhoneCheckNum(data);
        console.log(data);
      });
  };

  //인증번호가 입력값과 일치하는지 검증
  const phoneCheckNumHanlder = (e) => {
    const inputValue = document.getElementById("inputPhoneCheckNum").value;
    if (inputValue && inputValue === phoneCheckNum) {
      alert("인증되었습니다.");
    } else if (!inputValue) {
      alert("인증번호를 입력해주세요.");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };



  //주소검색 입력 변수
  const handlePostcode = () => {
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
    setUserValue({...userValue, userAddrDetail: inputValue})
  };

  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userId: data.get("userId"),
      userPw: data.get("userPw"),
    });
  };

  const defaultTheme = createTheme(); //ㄴ

  // 닉네임 통과 여부를 검사
  const isValid = () => {
    if(userValue.userNick === '관리자') {
      alert("관리자는 사용할 수 없는 닉네임입니다.")
      return false;
    }
    return true;
  };

  
// 이미지 업로드 처리 함수
const uploadImage = async () => {
  if (imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile); // "image"는 서버에서 이미지를 처리하는 필드명에 맞춰서 변경하세요.

    try {
      const response = await axios.post(`${API_BASE_URL}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("이미지 업로드 성공");
      } else {
        console.log("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
    }
  }
};

// 회원 정보 수정 처리 서버 요청
const fetchModifyPost = async () => {
  try {
    const response = await axios.put(`${API_BASE_URL}/modifyUser`, userValue, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("회원 수정에 성공했습니다!");
      // redirection("/login"); // 원하는 경로로 리디렉션
    } else {
      console.log("서버와의 통신이 원활하지 않습니다.");
    }
  } catch (error) {
    console.error("회원 수정 에러:", error);
  }
};

// 회원수정 버튼 클릭 핸들러
const modifyButtonClickHandler = async (e) => {
  e.preventDefault();
  if (isValid()) {
    await uploadImage(); // 이미지 업로드를 먼저 처리
    await fetchModifyPost(); // 회원 정보 수정 서버 요청
  }
};
  
  const [imageFile, setImageFile] = useState(null); // 단일 이미지 파일 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기를 위한 상태

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };
  



  return (
    <>
      <h2 className="menu-title">마이페이지</h2>
      



      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          
            
          
          <div className="profile-img-box">
          {imagePreview ? (
            <img
              className="user-img"
              src={imagePreview}
              alt="이미지 미리보기"
              style={{ width: '100px', height: '100px', margin: '0' }}
            />
          ) : (
            <label htmlFor="itemImg" style={{ cursor: 'pointer' }}>
              <img
                src={userImg}
                alt="이미지 아이콘"
                style={{ width: '100px', height: '100px', margin: '0' }}
              />
            </label>
          )}
          <input
            type="file"
            id="itemImg"
            onChange={handleFileInputChange}
            accept="image/*" // 이미지 파일만 선택 가능하도록 지정
            style={{ display: 'none' }}
          />

          <span>{localStorage.getItem("USER_ID")}</span>
        </div>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
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
                    value={userValue.userName}
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
                    value={userValue.userNick}
                    onChange={nickChangeHandler}
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
                    value={email1}
                    onChange={email1ChangeHandler}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <span className="at">@</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    < Select
                      value={email2}
                      id="email2"
                      fullWidth
                      displayEmpty
                      onChange={email2ChangeHandler}
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
                    value={phone2}
                    onChange={phone2ChangeHandler}
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
                    value={phone3}
                    onChange={phone3ChangeHandler}
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
                    disabled={!isPhoneChanged}
                    onClick={phoneHandler}
                  >
                    인증번호전송
                  </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    autoComplete="off"
                    name="phoneCheck"
                    required={isPhoneChanged}
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
                    disabled={!isPhoneChanged}
                    onClick={phoneCheckNumHanlder}
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
                    value={userValue.userPostcode}
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
                    value={userValue.userAddrDetail}
                    onChange={addrDetailHandler}
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
                    onClick={modifyButtonClickHandler}
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

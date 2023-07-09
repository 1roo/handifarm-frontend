import React, { useContext, useEffect, useState } from 'react';
import './Login.scss';
import kakaoImg from '../../image/kakao.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import AuthContext from '../util/AuthContext';

const Login = () => {
  const redirection = useNavigate();

  console.log('bring onLogin in AuthContext!');
  // AuthContext에서 onLogin 함수를 가져옵니다.
  const { onLogin, isLoggedIn } = useContext(AuthContext);
  console.log('isLoggedIn: ', isLoggedIn);

  const [open, setOpen] = useState(false);

  useEffect(() => {
      console.log('Login useEffect Called!');
      if (localStorage.getItem('ACCESS_TOKEN')) {
          console.log('isLoggedIn True!');
          setOpen(true);
          setTimeout(() => {
              redirection('/');
          }, 3000);
      }
  }, []);

  

  const REQUEST_URL = BASE + USER + '/login';
  
//서버에 비동기 로그인 요청
    //함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴합니다.
    const fetchLogin = async() => {

      //사용자가 입력한 아이디, 비밀번호 입력 태그 얻어오기
      const $userId = document.getElementById('userId');
      const $userPw = document.getElementById('userPw');

      //await는 async로 선언된 함수에서만 사용이 가능합니다.
      //await는 프로미스 객체가 처리될 때까지 기다립니다. 
      //프로미스 객체의 반환값을 바로 활용할 수 있게 도와줍니다.
      //then()을 활용하는 것보다 가독성이 좋고 쓰기도 쉽습니다.
      const res = await fetch(REQUEST_URL, {
          method: 'POST',
          headers: { 'content-type' : 'application/json' },
          body: JSON.stringify({
              userId: $userId.value,
              userPw: $userPw.value
           })
      });
      console.log('login fetch complete!');

      if (res.status === 400) {
          const text = await res.text();
          alert(text);
          return;
      }

      const { token } = await res.json();
    

      console.log('setting login data in Context!');
      // Context API를 사용하여 로그인 상태를 업데이트합니다.
      onLogin(token);

      console.log('로그인 성공 제발!');

      //홈으로 리다이렉트
      redirection('/');
    }


      //로그인 요청 핸들러
      const loginHandler = e => {
        e.preventDefault();
        
          // 서버에 로그인 요청 전송
          fetchLogin();
          
      }

      
 

  const defaultTheme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userId: data.get('userId'),
      userPw: data.get('userPw'),
    });
  }
  


  //Kakao Login
  const Rest_api_key='38942666792fea4c80c24cdac16be341' //REST API KEY
  const redirect_uri = 'http://localhost:3000/api/user/auth' //Redirect URI
  // auth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = ()=>{
    window.open(kakaoURL, '카카오 로그인', 'width=500,height=600');
  }

  //Naver Login
  const { naver } = window;
  const naverLogin = new naver.LoginWithNaverId({
    clientId: "0rgKKooFAROCjSXfGI_2",
    callbackUrl: "http://localhost:3000/login",
    isPopup: true,
    loginButton: {
      color: "green",
      type: 1,
      height: 50,
    },
  });

  useEffect(() => {
    naverLogin.init();
    console.log("init!");
  }, []);

  const [user, setUser] = useState(null);
  
  const getUser = async () => {
    await naverLogin.getLoginStatus((status) => {
      console.log(`로그인?: ${status}`);
      if (status) {
        setUser({ ...naverLogin.user });
        window.opener.location.href = "http://localhost:3000";
        window.close();
      }
    });


  };

  const redirect = (e) => {
    redirection('/');
  }
  

  return (
    <>
      <p className='menu-title'>로그인</p>
      <ThemeProvider theme={defaultTheme}>
      <Container id="login-coniatiner" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="아이디"
              name="userId"
              autoComplete="userId"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="userPw"
              label="비밀번호"
              type="password"
              id="userPw"
              autoComplete="current-password"
            />
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Button
                    className='loginBtn'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={loginHandler}
                >
                    로그인
                </Button>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button
                    className='loginExitBtn'
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={redirect}
                >
                    취소
                </Button>
              </Grid>
            </Grid>           
            <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <div className='sns-box'>
                <p>SNS 로그인</p>
                <div className='sns-list'>
                  <img src={kakaoImg} onClick={handleLogin} />
                  <div id="naverIdLogin"></div>
                  
                </div>
              </div>  
            </Grid>
          </Grid>      
          
        </form>

        
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

          
      
    </>  
  );
};

export default Login;
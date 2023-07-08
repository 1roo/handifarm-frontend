import React, { useEffect, useState } from 'react';
import './Login.scss';
import kakaoImg from '../../image/kakao.png';
import naverImg from '../../image/naver.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSns, setSelectedSns] = useState('');

 

  const defaultTheme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('userId'),
      password: data.get('userPw'),
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
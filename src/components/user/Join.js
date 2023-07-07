import {useState, useEffect} from 'react';
import './Join.scss';

import * as React from 'react';
import { Avatar, Select, SelectChangeEvent, MenuItem, Button, FormControl, CssBaseline, FormHelperText, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



const Join = () => {
    
    const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [selectedEmail, setselectedEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [addrBasic, setAddrBasic] = useState('');
    const [addrDetail, setAddrDetail] = useState('');
    const [Postcode, setPostcode] = useState('');
    
    useEffect(() => {
        window.daum = window.daum || {}; // daum 객체 전역 범위에 선언

        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);



    //회원가입 입력값 관리용 상태변수
    const [userValue, setUserValue] = useState({
        userId: '',
        userPw: '',
        userName: '',
        userNick: '',
        userEmail: '',
        userPhone: '',
        userAddrBasic: '',
        userAddrDetail: '',
    });

    //검증 메세지 상태변수 관리
    const [message, setMessage] = useState({
        userId: '',
        userPw: '',
        pwCheck: '',
        userName: '',
        userNick: '',
        userEmail: '',
        userPhone: '',
        userAddrBasic: '',
        userAddrDetail: '',
    });

    //검증완료 상태변수 관리
    const [correct, setCorrect] = useState({
        userId: false,
        idCheck: false,
        userPw: false,
        pwCheck: false,
        userName: false,
        userNick: false,
        userEmail: false,
        userPhone: false,
        userAddrBasic: false,
        userAddrDetail: false,
    });

    
    //검증 데이터를 상태변수에 저장하는 함수
    const saveInputState = ({key, inputValue, msg, flag}) => {       

        inputValue !== 'pass' && setUserValue({
            ...userValue,
            [key]: inputValue
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setCorrect({
            ...correct,
            [key]: flag
        });

    };


    //아이디 입력 이벤트 핸들러
    const idHandler = e => {
        const idRegex = /^[a-zA-Z0-9]{6,15}$/;

        const inputValue = e.target.value;
        let msg, flag = false;

        if(!idRegex.test(inputValue)) {
            msg = '6~15글자 사이의 영문 및 숫자로 작성하세요.';
        } else if(inputValue){
            flag = true;
        }
        saveInputState({
            key: 'userId',
            inputValue,
            msg,
            flag
        });
    };

    const idCheck = e => {
        fetch(`/api/checkUserId?userId=${userValue.userId}`)
            .then(reponse => Response.json())
            .then(data => {
                const isAvailable = data.isAvailable;
                setIsUserIdAvailable(isAvailable);
                
            })
            .catch(error => {
                console.error('중복 검사 요청 에러:', error);
            });

        if(isUserIdAvailable) {
            saveInputState({
                key: 'idCheck',
                inputValue: 'pass'
            })
            console.log('아이디 제출됨, userId');
        } else {
            console.log('중복검사 통과X');
        }
    };

    //이름 입력 이벤트 핸들러
    const nameHandler = e => {
        const nameRegex = /^[가-힣]{2,5}$/;

        const inputValue = e.target.value;
        
        let msg, flag = false; 

        if(!inputValue) {
            msg = '유저 이름은 필수입니다.';
        } else if(!nameRegex.test(inputValue)) {
            msg = '2~5글자 사이의 한글로 작성하세요!';
        } else {
            flag = true;
        }
        saveInputState({
            key: 'userName',
            inputValue,
            msg,
            flag
        });
    };

    //닉네임 입력 이벤트 핸들러
    const nickHandler = e => {
        const inputValue = e.target.value;
        saveInputState({
            key: 'userNick',
            inputValue
        });
    }

    //이메일 입력 이벤트 핸들러
    const email1Handler = e => {
        setEmail1(e.target.value);
        // selectedEmailHandler();
    }

    const email2Handler = (e) => {
        setEmail2(e.target.value);
        // selectedEmailHandler();
    };

    
    const selectedEmailHandler = () => {
        let fullEmail = document.getElementById('email1').value + '@' + email2;

        setUserValue({
            ...userValue,
            email: fullEmail
        });
        console.log(fullEmail);
    };
    

    //비밀번호 입력 이벤트 핸들러
    const pwHandler = e => {

       
        document.getElementById('pwCheck').value = '';
        document.getElementById('pwCheck').textContent = '';

        setMessage({...message, pwCheck: ''});
        setCorrect({...correct, pwCheck: false});


        const inputValue = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        //검증 시작
        let msg, flag = false;
        if(!pwRegex.test(inputValue)) {
            msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.';
        } else if(inputValue) {
            flag = true;
        }

        saveInputState({
            key: 'userPw',
            inputValue,
            msg,
            flag
        });       
    };

    const pwCheckHandler = e => {
        //검증 시작
        let msg, flag = false;
        if(userValue.userPw !== e.target.value) {
            msg = '비밀번호가 일치하지 않습니다.';
        } else if(e.target.value) {
            flag = true;
        }
        saveInputState({
            key: 'pwCheck',
            inputValue: 'pass',
            msg,
            flag
        });

    }

    //휴대폰번호 입력 이벤트 핸들러
    const phone1Handler = e => {
        const inputValue = e.target.value;
        setPhone1(inputValue);
        phoneHandler();
    }
    const phone2Handler = e => {
        const inputValue = e.target.value;
        setPhone2(inputValue);
        phoneHandler();
    }
    const phone3Handler = e => {
        const inputValue = e.target.value;
        setPhone3(inputValue);
        phoneHandler();
    }

    const phoneHandler = () => {
        const $phone1 = document.getElementById('phone1').value;
        const $phone2 = document.getElementById('phone2').value;
        const $phone3 = document.getElementById('phone3').value;
        let fullPhoneNum = $phone1+$phone2+$phone3;
       
        setUserValue({
            ...userValue,
            userPhone: fullPhoneNum
        });
        console.log(fullPhoneNum);
    };


    //주소검색 입력 변수
    const handlePostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const { zonecode, roadAddress, buildingName, apartment } = data;
                let extraRoadAddr = '';

                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                setPostcode(zonecode);
                setAddrBasic(roadAddress);
                setAddrDetail('');
            },
        }).open();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const defaultTheme = createTheme(); //


    return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
                <Grid item xs={8} sm={8}>
                <TextField
                    autoComplete="ID"
                    name="userId"
                    required
                    fullWidth
                    id="userId"
                    label="아이디"
                    autoFocus
                    onChange={idHandler}
                />
                <span style={
                                correct.userId
                                ? {color : 'black'}
                                : {color : 'red'}
                            }>{message.userId}</span>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Button type="button" fullWidth variant="contained">
                    중복체크
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="PASSWORD"
                    name="userPw"
                    required
                    fullWidth
                    id="userPw"
                    type="password"
                    label="비밀번호"
                    autoFocus
                    onChange={pwHandler}
                />
                <span style={
                                correct.userId
                                ? {color : 'black'}
                                : {color : 'red'}
                            }>{message.userPw}</span>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="PASSWORD"
                        name="pwCheck"
                        required
                        type="password"
                        fullWidth
                        id="pwCheck"
                        label="비밀번호 확인"
                        autoFocus
                        onChange={pwCheckHandler}
                    />
                    <span id='pwCheck' style={
                                correct.userId
                                ? {color : 'black'}
                                : {color : 'red'}
                            }>{message.pwCheck}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="NAME"
                        name="userName"
                        required
                        fullWidth
                        id="userName"
                        label="이름"
                        autoFocus
                        onClick={nameHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="NICKNAME"
                        name="userNick"
                        required
                        fullWidth
                        id="userNick"
                        label="닉네임"
                        autoFocus
                        onClick={nickHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        autoComplete="EMAIL1"
                        name="email1"
                        required
                        fullWidth
                        id="email1"
                        label="이메일"
                        autoFocus
                        onChange={email1Handler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <span>@</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select id='email2' value={email2} onChange={email2Handler} fullWidth displayEmpty>
                        <MenuItem value='gmail.com'>gmail.com</MenuItem>
                        <MenuItem value='naver.com'>naver.com</MenuItem>
                        <MenuItem value='hanmail.net'>hanmail.net</MenuItem>
                        <MenuItem value='daum.net'>daum.net</MenuItem>
                        <MenuItem value='nate.com'>nate.com</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TextField
                        autoComplete="PHONE1"
                        name="phone1"
                        required
                        fullWidth
                        id="phone1"
                        label=""
                        autoFocus
                        inputProps={{ maxLength: 3 }}
                        onChange={phone1Handler}
                    />
                </Grid>
                <Grid item xs={1} sm={1}>
                    <span>-</span>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TextField
                        autoComplete="PHONE2"
                        name="phone2"
                        required
                        fullWidth
                        id="phone2"
                        label=""
                        autoFocus
                        inputProps={{ maxLength: 4 }}
                        onChange={phone2Handler}
                    />
                </Grid>
                <Grid item xs={1} sm={1}>
                    <span>-</span>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TextField
                        autoComplete="PHONE3"
                        name="phone3"
                        required
                        fullWidth
                        id="phone3"
                        label=""
                        autoFocus
                        inputProps={{ maxLength: 4 }}
                        onChange={phone3Handler}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button id='phoneCheckBtn' type="button" fullWidth variant="contained">
                    인증번호전송
                    </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        autoComplete="PHONECHECK"
                        name="phoneCheck"
                        required
                        fullWidth
                        id="phoneCheckNum"
                        label="인증번호 4자리"
                        autoFocus
                        inputProps={{ maxLength: 4 }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button id='phoneCheckBtn' type="button" fullWidth variant="contained">
                    인증하기
                    </Button>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                <TextField
                    type="text"
                    id="sample4_postcode"
                    name="Postcode"
                    placeholder="우편번호"
                    value={Postcode}
                    fullWidth
                    disabled
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Button variant="contained" fullWidth onClick={handlePostcode}>
                    우편번호 찾기
                </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        id="sample4_roadAddress"
                        name="roadAddress"
                        placeholder="도로명주소"
                        value={addrBasic}
                        fullWidth
                        disabled
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        id="sample4_detailAddress"
                        name="detailAddress"
                        placeholder="상세주소"
                        value={addrDetail}
                        onChange={(e) => setAddrDetail(e.target.value)}
                        fullWidth
                    />
                </Grid>




                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allow" color="primary" />}
                    label="개인정보 수집 및 이용에 동의합니다."
                />
                </Grid>
            </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    회원가입
                </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                <Button
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
    );
        
}

export default Join;
import {useState, useEffect} from 'react';
import './Join.scss';

import * as React from 'react';
import { Select, MenuItem, Button, FormControl, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Container, createTheme, ThemeProvider } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';


const Join = () => {

    //리다이렉트 사용하기
    const redirection = useNavigate();
    
    const API_BASE_URL = 'http://localhost:8181/api/user';

    const [agreeChecked, setAgreeChecked] = useState(false);
    

    const [phoneCheckNum, setPhoneCheckNum] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [userAddrBasic, setUserAddrBasic] = useState('');
    const [userPostcode, setUserPostcode] = useState('');
    
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
        userPostcode: '',
    });

    //검증 메세지 상태변수 관리
    const [message, setMessage] = useState({
        userId: '',
        userPw: '',
        pwCheck: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        userAddrBasic: '',
        userAddrDetail: '',
        phoneCheckNum: '',
    });

    //검증완료 상태변수 관리
    const [correct, setCorrect] = useState({
        userId: false,
        idCheck: false,
        userPw: false,
        pwCheck: false,
        userName: false,
        userEmail: false,
        userNick: true,
        userPhone: false,
        userAddrBasic: false,
        userAddrDetail: false,
        userPostcode: false,
        phoneCheckNum: false,
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

    //아이디 중복체크
    const idCheck = () => {
        const userId = document.getElementById('userId').value;
        let msg = '', flag = false;
        fetch(`${API_BASE_URL}/idCheck?userId=${userId}`)
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                console.log(json);
                if(json) {
                    msg='중복된 id입니다.';
                } else if(userId){
                    alert('사용 가능한 아이디입니다.');
                    flag = true;
                }
                saveInputState({
                    key: 'idCheck',
                    inputValue: 'pass',
                    msg,
                    flag
                });

            })
            .catch(error => {
                console.log('서버 통신이 원활하지 않습니다.');
            });
    };

    //이름 입력 이벤트 핸들러
    const nameHandler = e => {
        const nameRegex = /^[가-힣]{2,5}$/;

        const inputValue = e.target.value;
        
        let msg, flag = false; 

        if(!nameRegex.test(inputValue)) {
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
        let flag = true;
        saveInputState({
            key: 'userNick',
            inputValue,
            flag
        });
    }

    //이메일 입력 이벤트 핸들러

    const selectedEmailHandler = (e) => {
        const selectedEmailValue = e.target.value;
        setEmail2(selectedEmailValue);
        let fullEmail = document.getElementById('email1').value + '@' + selectedEmailValue;
        let flag = false;
        if(document.getElementById('email1').value && selectedEmailValue) {
            flag = true;
        }
        saveInputState({
            key: 'userEmail',
            inputValue: fullEmail,
            flag
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
    const phone2Handler = e => {
        const inputValue = e.target.value;
        setPhone2(inputValue);
 
    }
    const phone3Handler = e => {
        const inputValue = e.target.value;
        setPhone3(inputValue);
    
    }

 
    const phoneHandler = () => {
        const $phone2 = document.getElementById('phone2').value;
        const $phone3 = document.getElementById('phone3').value;
        let fullPhoneNum = '010'+$phone2+$phone3;
        let flag = false;
        if($phone2 && $phone3) {
            alert('인증번호가 전송되었습니다.')
            console.log(fullPhoneNum);
            flag = true;
        }
        else {
            alert('휴대폰번호를 입력하세요')
        }
        saveInputState({
            key: 'userPhone',
            inputValue: fullPhoneNum,
            flag
        });
        const phoneData = {
            'sendTo': fullPhoneNum
        };

        //인증번호 요청
        fetch(`${API_BASE_URL}/phoneNumAuthenticate`, {
            method : 'POST',
            headers : { 'content-type' : 'application/json' },
            body : JSON.stringify(phoneData)
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            setPhoneCheckNum(data);
            console.log(data);
        })
        
        
        

    
    };

    //인증번호가 입력값과 일치하는지 검증
    const phoneCheckNumHanlder = (e) => {
        let flag = false;
        const inputValue = document.getElementById('inputPhoneCheckNum').value;
        if(inputValue && inputValue === phoneCheckNum) {
            alert('인증되었습니다.');
            flag = true;            
        } else if (!inputValue) {
            alert('인증번호를 입력해주세요.');
        } else {
            alert('인증번호가 일치하지 않습니다.');
        }
        saveInputState({
            ...userValue,
            key: 'phoneCheckNum',
            flag
        });    
        
    }


    //주소검색 입력 변수
    const handlePostcode = () => {
        let flag = true;
        new window.daum.Postcode({
            oncomplete: function (data) {
                const { zonecode, roadAddress, buildingName, apartment } = data;
                let extraRoadAddr = '';
                console.log('zonecode: ', zonecode);

                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(zonecode) {
                    // flag = true;
                    setUserValue({...userValue, 'userPostcode': zonecode, 'userAddrBasic': roadAddress});
                    setCorrect({...correct, 'userPostcode': !correct.userPostcode, 'userAddrBasic' : !correct.userAddrBasic});
                }
                
            },
        }).open();
          
    };

    //상세주소 입력 변수
    const addrDetailHandler = e => {
        const inputValue = e.target.value;
        let flag = false;
        if(inputValue) {
            flag = true;
        }
        setUserValue({
            ...userValue,
            'userAddrDetail': inputValue,
        });
        setCorrect({...correct, 'userAddrDetail' : !correct.userAddrDetail})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            userId: data.get('userId'),
            userPw: data.get('userPw'),
        });
    };

    const defaultTheme = createTheme(); //

    // 필수 입력칸이 모두 검증에 통과했는지 여부를 검사
    const isValid = () => {
        console.log(correct);
        for(const key in correct) {
            const flag = correct[key];
            if(!flag) return false;
        }
        return true;
    }


    // 체크박스 변경 이벤트 핸들러
    const handleAgreeChange = (event) => {
        setAgreeChecked(event.target.checked);
    };


    //회원 가입 처리 서버 요청
    const fetchJoinPost = () => {
        console.log(userValue.userPhone);
        const requestData = {
            'userId': userValue.userId,
            'userPw': userValue.userPw,
            'userName': userValue.userName,
            'userNick': userValue.userNick,
            'userEmail': userValue.userEmail,
            'userPhoneNum': userValue.userPhone,
            'addrBasic': userValue.userAddrBasic,
            'addrDetail': userValue.userAddrDetail,
            'userZipCode': userValue.userPostcode,
          };

        fetch(API_BASE_URL, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(requestData)
        })
        .then(res => {
            if(res.status === 200) {
                alert('회원가입에 성공했습니다!');
                redirection('/login');
            } else {
                alert('서버와의 통신이 원활하지 않습니다.');
                console.log(JSON.stringify(requestData));
            }
        })
    }



    // 회원 가입 버튼 클릭 핸들러
    const joinButtonClickHandler = (e) => {
        e.preventDefault();
        if (isValid()) {
        if (agreeChecked) {
            // fetchJoinPost 함수 호출
            fetchJoinPost();
        } else {
            alert('개인정보 수집 및 이용에 동의해야 합니다.');
        }
        } else {
        alert('입력란을 다시 확인해 주세요!');
        console.log(JSON.stringify(correct));
        }
    };
    



    return (
    <>
    <h2 className='menu-title'>회원가입</h2>
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
                        autoComplete="off"
                        name="userId"
                        required
                        fullWidth
                        id="userId"
                        label="아이디"
                        onChange={idHandler}
                    />
                    <span style={
                                    correct.userId
                                    ? {color : 'black'}
                                    : {color : 'red'}
                                }>{message.userId}</span>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Button className='green-btn' type="button" fullWidth variant="contained" onClick={idCheck}>
                    중복체크
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="off"
                        name="userPw"
                        required
                        fullWidth
                        id="userPw"
                        type="password"
                        label="비밀번호"
                        onChange={pwHandler}
                    />
                    <span style={
                                    correct.userId
                                    ? {color : 'red'}
                                    : {color : 'black'}
                                }>{message.userPw}</span>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="off"
                        name="pwCheck"
                        required
                        type="password"
                        fullWidth
                        id="pwCheck"
                        label="비밀번호 확인"
                        onChange={pwCheckHandler}
                    />
                    <span id='pwCheck' style={
                                correct.userId
                                ? {color : 'red'}
                                : {color : 'black'}
                            }>{message.pwCheck}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="off"
                        name="userName"
                        required
                        fullWidth
                        id="userName"
                        label="이름"
                        onChange={nameHandler}
                    />
                    <span style={
                                    correct.userName
                                    ? {color : 'black'}
                                    : {color : 'red'}
                                }>{message.userName}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="off"
                        name="userNick"
                        fullWidth
                        id="userNick"
                        label="닉네임"
                        onChange={nickHandler}
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
                    <span className='at'>@</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select id='email2' value={email2} fullWidth displayEmpty onChange={selectedEmailHandler}>
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
                        label=""
                        inputProps={{ maxLength: 4 }}
                        onChange={phone2Handler}
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
                        onChange={phone3Handler}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button className='green-btn' id='phoneCheckBtn' type="button" fullWidth variant="contained" onClick={phoneHandler}>
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
                    <span style={
                                    correct.phoneCheckNum
                                    ? {color : 'black'}
                                    : {color : 'red'}
                                }>{message.phoneCheckNum}</span>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button className='green-btn' id='CheckBtn' type="button" fullWidth variant="contained" onClick={phoneCheckNumHanlder}>
                    인증하기
                    </Button>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                <TextField
                    type="text"
                    id="sample4_postcode"
                    name="Postcode"
                    placeholder="우편번호"
                    value={userValue.userPostcode}
                    fullWidth
                    disabled
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Button className='green-btn' variant="contained" fullWidth onClick={handlePostcode}>
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
                        autoComplete='off'
                        type="text"
                        id="sample4_detailAddress"
                        name="detailAddress"
                        placeholder="상세주소"
                        onBlur={addrDetailHandler}
                        fullWidth
                    />
                </Grid>




                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                            value="allow"
                            color="primary"
                            checked={agreeChecked} // 체크 여부를 상태 변수와 연결
                            onChange={handleAgreeChange} // 체크박스 변경 이벤트 핸들러 설정
                            />
                        }
                        label="개인정보 수집 및 이용에 동의합니다."
                    />
                </Grid>
            </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Button
                    className='green-btn'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={joinButtonClickHandler}
                >
                    회원가입
                </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                <Button
                    id='exitBtn'
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
        
}

export default Join;
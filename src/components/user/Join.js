import React, {useState} from 'react';
import './Join.scss';
import KakaoAddress from '../util/KakaoAddress';


const Join = () => {
    
    const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [addrBasic, setAddrBasic] = useState('');
    const [addrDetail, setAddrDetail] = useState('');
    
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
        const inputValue = e.target.value;
        setEmail1(inputValue);
        emailHandler();
    }

    const email2Handler = e => {
        const inputValue = e.target.value;
        setEmail2(inputValue);
        emailHandler();
    }

    const selectedEmailHandler = e => {
        const inputValue = e.target.value;
        const $email2 = document.getElementById('email2');
        if(inputValue !== 'direct') {
            setEmail2(inputValue);
            $email2.value = inputValue;
            $email2.setAttribute('readonly','true');
            emailHandler();
            return;
        }
        $email2.removeAttribute('readonly','true');
        $email2.value = '';
    }
        
    const emailHandler = () => {
        const $email1 = document.getElementById('email1').value;
        const $email2 = document.getElementById('email2').value;
        let fullEmail = '';
        const $selected = document.getElementById('selectEmail').value;
        console.log($selected);
        if($selected === 'direct') {
            fullEmail = $email1 + '@' + $email2;
        } else {
            fullEmail = $email1 + '@' + $selected;
        }

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
            inputVal: 'pass',
            msg,
            flag
        });

    }

    //휴대본번호 입력 이벤트 핸들러
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


    //주소 입력 이벤트 핸들러
    const addr2Handler = e => {
        const inputValue = e.target.value;
        setAddrDetail(inputValue);
        setUserValue({
            ...userValue,
            userAddrDetail: inputValue
        });
    }



    //주소검색 입력 변수
    const [enroll_company, setEnroll_company] = useState({
        address:'',
    });
    
    const [popup, setPopup] = useState(false);
    
    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]:e.target.value,
        })
    }
    
    const handleComplete = (data) => {
        document.getElementById('addrDetail').value='';
        setPopup(!popup);
    }

        
        
    
    return (
    
        <>
            <div className='.container'>
                <h3>회원가입</h3>
                <form action='/login' name='joinForm'>
                    <div className='input-id'>
                        <input type='text' name='userId' id='userId' placeholder='아이디' onChange={idHandler}/>
                    <button id='idCheckBtn' className='idCheckBtn' type='button' onClick={idCheck}>중복확인</button>  
                    <span>{message.userId}</span>  
                    </div>
                    <div className='input-pw'>
                        <input type='password' name='userPw' id='userPw' placeholder='비밀번호' onChange={pwHandler}/>
                        <span>{message.userPw}</span>
                        <input type='password' name='pwCheck' id='pwCheck' placeholder='비밀번호 재입력' onChange={pwCheckHandler}/>
                        <span id='pwCheck'>{message.pwCheck}</span>
                    </div>
                    <div className='input-nameAndNick'>
                        <input type='text' name='userName' id='userName' placeholder='이름' onClick={nameHandler} />
                        <input type='text' name='userNick' id='userNick' placeholder='닉네임' onClick={nickHandler}/>
                    </div>
                    <div className='input-email'>
                        <input type='text' name='email1' id='email1' placeholder='이메일' onChange={email1Handler} />
                        <p>@</p>
                        <input type='text' name='email2' id='email2' placeholder='직접입력' onChange={email2Handler} />

                        <select className='selectEmail' name='selectEmail' id='selectEmail' onChange={selectedEmailHandler}>
                            <option value='direct'>직접입력</option>
                            <option value='gmail.com'>gmail.com</option>
                            <option value='naver.com'>naver.com</option>
                            <option value='hanmail.com'>hanmail.com</option>
                        </select>
                    </div>
                    <div className='input-phone'>
                        <input type='text' name='phone1' maxlength="3" id='phone1' onChange={phone1Handler}/>
                        <p>-</p>
                        <input type='text' name='phone2' maxlength="4" id='phone2' onChange={phone2Handler}/>
                        <p>-</p>
                        <input type='text' name='phone3' maxlength="4" id='phone3'onCanPlay={phone3Handler}/>
                        <button id='phoneCheckBtn' className='phoneCheckBtn' type='button'>인증번호받기</button>
                        <input type='text' name='phoneCheckNum' id='phoneCheckNum' maxlength="4" placeholder='문자로 발송된 인증번호 4자리를 입력하세요' />
                        <button id='phoneCheckNumBtn' className='phoneCheckNumBtn' type='button'>인증하기</button>
                    </div>
                    <div className='input-address'>
                        <input type='text' id='addrBasic' placeholder='주소를 검색하세요' required={true} name="addrBasic" onChange={handleInput} value={enroll_company.address}/>
                        <button type='button' onClick={handleComplete} id='searchBtn' className='searchBtn'>주소검색</button>
                        {popup && <KakaoAddress company={enroll_company} setcompany={setEnroll_company} setPopup={setPopup}></KakaoAddress>}
                        <input type='text' className='addrDetail' id='addrDetail' placeholder='상세주소' />
                    </div>
                
                    <div className='submit-btns'>
                        <button className="join-check-btn" type="submit" >회원가입</button>
                        <button className='exit-btn'>취소</button>
                    </div>
                    
                </form>

            </div>
        </>
            
    );

        
}

export default Join;
import React, {useState, useEffect} from 'react';


import './Join.scss';
import KakaoAddress from '../util/KakaoAddress';

const Join = () => {
  
    //회원가입 입력값 관리용 상태변수
    const [userValue, setUserValue] = useState({
        userId: '',
        userPw: '',
        userName: '',
        userNick: '',
        userEmail: '',
        userPhone: '',
        userAddr: '',
        userDetailAddr: '',
        userZip: ''
    });

    //검증메세지 상태변수
    const [msg, setMsg] = useState({
        userId: '',
        userPw: '',
        pwCheck: '',
        userName: '',
        userNick: '',
        userEmail: '',
        userPhone: '',
        userAddr: '',
        userDetailAddr: '',
        userZip: ''
    });

    //검증완료 상태변수
    const [correct, setCorrect] = useState({
        userId: false,
        userPw: false,
        pwCheck: false,
        userName: false,
        userNick: false,
        userEmail: false,
        userPhone: false,
        userAddr: false,
        userDetailAddr: false,
        userZip: false
    });

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
        setPopup(!popup);
    }

    
   
    return (
    
        <>
            <div className='.container'>
                <h3>회원가입</h3>
                <form action='/login' name='joinForm'>
                    <div className='input-id'>
                        <input type='text' name='userId' id='userId' placeholder='ID를 입력하세요' />
                    <button id='idCheckBtn' className='idCheckBtn' type='button'>중복확인</button>    
                    </div>
                    <div className='input-pw'>
                        <input type='password' name='userPw' id='userPw' placeholder='비밀번호를 입력하세요' />
                        <input type='password' name='pwCheck' id='pwCheck' placeholder='비밀번호를 다시 한 번 입력하세요' />
                    </div>
                    <div className='input-nameAndNick'>
                        <input type='text' name='userName' id='userName' placeholder='이름' />
                        <input type='text' name='userNick' id='userNick' placeholder='닉네임' />
                    </div>
                    <div className='input-email'>
                        <input type='text' name='email1' id='email1' placeholder='이메일' />
                        <p>@</p>
                        <input type='text' name='email2' id='email2' placeholder='직접입력' />

                        <select className='selectEmail' name='selectEmail' id='selectEmail'>
                            <option value='direct'>직접입력</option>
                            <option value='gmail.com'>gmail.com</option>
                            <option value='naver.com'>naver.com</option>
                            <option value='hanmail.com'>hanmail.com</option>
                        </select>
                        <button id='emailCheckBtn' className='emailCheckBtn' type='button'>인증번호받기</button>
                        <input type='text' name='emailCheckNum' id='emailCheckNum' maxlength="6" placeholder='이메일로 발송된 인증번호 6자리를 입력하세요' />
                        <button id='emailCheckNumBtn' className='emailCheckNumBtn' type='button'>인증하기</button>
                    </div>
                    <div className='input-phone'>
                        <input type='text' name='phone1' maxlength="3" id='phone1'/>
                        <p>-</p>
                        <input type='text' name='phone2' maxlength="4" id='phone2'/>
                        <p>-</p>
                        <input type='text' name='phone3' maxlength="4" id='phone3'/>
                        <button id='phoneCheckBtn' className='phoneCheckBtn' type='button'>인증번호받기</button>
                        <input type='text' name='phoneCheckNum' id='phoneCheckNum' maxlength="4" placeholder='문자로 발송된 인증번호 4자리를 입력하세요' />
                        <button id='phoneCheckNumBtn' className='phoneCheckNumBtn' type='button'>인증하기</button>
                    </div>
                    <div className='input-address'>
                        <input type='text' id='address' placeholder='주소를 검색하세요' required={true} name="address" onChange={handleInput} value={enroll_company.address}/>
                        <button onClick={handleComplete} id='searchBtn' className='searchBtn'>우편번호 검색</button>
                        {popup && <KakaoAddress company={enroll_company} setcompany={setEnroll_company}></KakaoAddress>}
                        <input type='text' className='extraAddress' id='extraAddress' placeholder='상세주소' />
                    </div>
                  
                    <div className='submit-btns'>
                        <button className="join-check-btn" type="submit">회원가입</button>
                        <button className='exit-btn'>취소</button>
                    </div>
                    
                </form>

            </div>
        </>
            
    );

};

export default Join;
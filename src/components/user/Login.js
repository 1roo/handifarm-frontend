import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import kakaoImg from '../../image/kakao.png';
import naverImg from '../../image/naver.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSns, setSelectedSns] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  }

  const handleSnsClick = (sns) => {
    setSelectedSns(sns);
    setShowModal(true);
  };

  return (
    <>
      <div className='container'>
        <div className='inner-container'>
          <h3>로그인</h3>
          <form>
            <div className='login-box'>
              <div className='login-input'>
                <input type="text" id="username" value={username} placeholder='ID를 입력하세요' />
                <input type="password" id="password" value={password} placeholder='비밀번호를 입력하세요'/>
              </div>
              <button className="login-btn" type="submit">로그인</button>
            </div>
            <div className='join-box'>
              <div className='span-div'>
                <span>아직 계정이 없으세요?</span>
                <span>지금 바로 회원가입 해 보세요!</span>
              </div>
              <Link to='/login' className='button-link join-btn'>
                회원가입
              </Link>
            </div>
            </form>
          </div>
          
          <form>
          <div className='sns-box'>
            <p>SNS 로그인</p>
            <div className='sns-list'>
              <img src={kakaoImg} id='kakao' className='sns-select kakao' onClick={() => handleSnsClick('kakao')} />
              <img src={naverImg} id='naver' className='sns-select naver' onClick={() => handleSnsClick('naver')} />
            </div>
          </div>
        </form>
      


      {showModal && selectedSns === 'kakao' && (
        <div className="modal-container">
          <div className="modal">
            <h3>카카오로그인</h3>
            <p>아이디: {username}</p>
            <p>비밀번호: {password}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}

      {showModal && selectedSns === 'naver' && (
        <div className="modal-container">
          <div className="modal">
            <h3>네이버로그인</h3>
            <p>아이디: {username}</p>
            <p>비밀번호: {password}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
      </div>
    </>  
  );
};

export default Login;
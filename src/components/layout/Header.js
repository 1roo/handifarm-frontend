import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';
import logoSmall from '../../image/logo-small.png';
import './Header.css';

import { isLogin } from '../util/login-utils';
import AuthContext from '../util/AuthContext';

const Header = () => {

  const redirection = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {isLoggedIn, onLogout} = useContext(AuthContext);

  //로그아웃 핸들러
  const logoutHandler = e => {
      // AuthContext의 onLogout 함수를 호출하여 로그인 상태를 업데이트합니다.
      onLogout();
      redirection('/login');
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 600;

  return (
    <div className='header'>
      <div className='green-bar'></div>
      <div className='inner-header'>
        <div className='logo-container'>
          <Link to='/' className='logo-link'>
            <img src={isMobile ? logoSmall : logo} alt='로고' className='logo' />
          </Link>
        </div>
        <div className='button-container'>
        {isLogin () ?
                                
          (
            <>
              <Link to='/mypage' className='button-link'>
              마이페이지
              </Link>
              <Link to='/' className='button-link'
                  onClick={logoutHandler}>
                  로그아웃
              </Link>
            </>
          )
          :
          (
              <>
                  <Link to='/login' className='button-link'>
                    로그인
                  </Link>
                  <Link to='/join' className='button-link'>
                    회원가입
                  </Link>
              </>
          )

        }
          
        </div>
      </div>
      <div className='gray-bar'></div>
    </div>
  );
};

export default Header;
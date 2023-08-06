import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import logoSmall from '../../image/logo-small.png';
import './header.css';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
          <Link to='/login' className='button-link'>
            로그인
          </Link>
          <Link to='/join' className='button-link'>
            회원가입
          </Link>
        </div>
      </div>
      <div className='gray-bar'></div>
    </div>
  );
};

export default Header;
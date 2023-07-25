import React, { useState } from "react";
import "./Market.scss";
import "../.././Custom.scss";
import HomeMarketBody from "../HomeMarketBody";
// mui 아이콘 > 시작
import CreateIcon from "@mui/icons-material/Create"; //작성 아이콘
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_BASE_URL } from "../../config/host-config";
import { getLoginUserInfo } from "../util/login-utils";

const MarketList = () => {

  const redirection = useNavigate();

  const [token, setToken] = useState(getLoginUserInfo().token); //토큰
  // setToken('eyJhbGciOiJIUzUxMiJ9.eyJuaWNrIjoi6rOw64-M6rOw64-MIiwiaXNzIjoiSGFuZGlGYXJtIiwiaWF0IjoxNjkwMjUzODA4LCJleHAiOjE2OTAyNjgyMDgsInN1YiI6ImFiYzEyMzQifQ.85UFUUEJVynQRGDxB8k0z3DRYuSU4Lh2k_iiIf0305qvHudOWVSc0cR7DZ80UxDGFE9B4oocq2LjFNysUBbCXA')
  const requestHeader = {
    // 'content-type' : 'application/json',
    'Authorization' : 'Bearer ' + token
  };


  const [list, setList] = useState([]);

  fetch(`${API_BASE_URL}/api/market`, {headers : requestHeader})
  .then(res => {
    if(res.ok) {
      console.log('등록된 물품: ', res);
      
    } else if(res.status === 403) {
      alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
      redirection('/');
      return;
    }
  })

  

  const MarketList = [
    {
      marketName: "주말농장 토마토", //상품명
      userName: "누구누구", //판매자
      price: "24000", //가격
      imgSrc:
        "https://static6.depositphotos.com/1046511/631/i/600/depositphotos_6310141-stock-photo-bountiful-harvest.jpg", //이미지 링크
    }
  ];

  return (
    <>
      <div className="container market">
        <div className="sub-link">
          <Link to="/"><HomeIcon/></Link> <span>> </span> 
          <Link to="/market">거래장터</Link>
        </div>
        <h1>거래장터</h1>
        <div className="searchVar">최신순 │ 이런거 │ 들어가지않나 </div>
        <div className="market-list">
          {MarketList.map((ma) => (
            <Link to="/marketDetail">
              <HomeMarketBody market={ma} />
            </Link>
          ))}
        </div>
        {/* market-group END */}
        <Button className="more-btn" type="button" variant="light">
          더 보기
        </Button>
        <hr />
        <div className="link-box">
          <Link to="/marketRegist">
            <Button className="write-link-btn" variant="success">
              <CreateIcon />내 농작물 판매하기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MarketList;

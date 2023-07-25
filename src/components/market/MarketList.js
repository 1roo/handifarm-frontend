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
import { useEffect } from "react";

const MarketList = () => {

  const redirection = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  const [marketList, setMarketList] = useState([]);
  useEffect(() => {

    const requestHeader = {
      // 'content-type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    };

    fetch(`${API_BASE_URL}/api/market`, {
      headers : requestHeader
    })
    .then(res => {
      if(!res.ok) {
        if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
        else alert('로딩 중 문제가 발생하였습니다. 관리자에게 문의바랍니다.')
        redirection('/');
        return;
      }
  
      console.log('헤헤');
      res.json().then(data => { 
        setMarketList(data.marketItems);
        console.log(data.marketItems);
      })
    })

    //로딩 완료함!
    setLoading(false)
    
  }, []) //useEffect END

  /*
    const MarketList = [ //임시 데이터
      {
        marketName: "주말농장 토마토", //상품명
        userName: "누구누구", //판매자
        price: "24000", //가격
        imgSrc:
          "https://static6.depositphotos.com/1046511/631/i/600/depositphotos_6310141-stock-photo-bountiful-harvest.jpg", //이미지 링크
      }
    ];
   */


  const loadingPage = (
    <div id="loading">
      <img id="loadingElement" 
          src="https://cdn-icons-png.flaticon.com/512/189/189768.png"/>
    </div>   
  )


  return (
    <>
       { loading ? loadingPage : 
          <div className="container market">
            <div className="sub-link">
              <Link to="/"><HomeIcon/></Link> <span>> </span> 
              <Link to="/market">거래장터</Link>
            </div>
            <h1>거래장터</h1>
            <div className="searchVar">최신순 │ 이런거 │ 들어가지않나 </div>
            <div className="market-list">
              {marketList.map((ma) => (
                  <HomeMarketBody market={ma} />
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
        }
    </>
  );
};

export default MarketList;

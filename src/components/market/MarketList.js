import React from "react";
import "./Market.scss";
import "../.././Custom.scss";
import HomeMarketBody from "../HomeMarketBody";
// mui 아이콘 > 시작
import CreateIcon from "@mui/icons-material/Create"; //작성 아이콘
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const MarketList = () => {
  const MarketList = [
    {
      marketName: "주말농장 토마토", //상품명
      userName: "누구누구", //판매자
      price: "24000", //가격
      imgSrc:
        "https://static6.depositphotos.com/1046511/631/i/600/depositphotos_6310141-stock-photo-bountiful-harvest.jpg", //이미지 링크
    },
    {
      marketName: "주말농장 토마토", //상품명
      userName: "먼지", //판매자
      price: "9230", //가격
      imgSrc:
        "https://www.nongmin.com/-/raw/srv-nongmin/data2/content/image/2022/06/16/.cache/512/20220616196317.jpg", //이미지 링크
    },
    {
      marketName: "당근", //상품명
      userName: "당근공갈협박단", //판매자
      price: "8000", //가격
      imgSrc: "https://src.hidoc.co.kr/image/lib/2021/9/3/1630652987056_0.jpg", //이미지 링크
    },
    {
      marketName: "청주햇감자", //상품명
      userName: "말티즈", //판매자
      price: "5000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "토마토 같은 사과", //상품명
      userName: "벨루가", //판매자
      price: "9800", //가격
      imgSrc:
        "https://shop.shouse.garden/data/goods/302/2022/06/_tmp_f2fe2dc5b4ce8345ecd5133bf984c2e89119view.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
    {
      marketName: "멋쟁이 토마토", //상품명
      userName: "토마토", //판매자
      price: "999000", //가격
      imgSrc:
        "https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg", //이미지 링크
    },
  ];

  return (
    <>
      <div className="container market">
        <div className="sub-link">
          <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
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

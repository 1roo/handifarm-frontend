import React from "react";
import "./Market.scss";
import "../.././Custom.scss";
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Box, Button, Grid, Rating } from "@mui/material";
import { StarBorderRounded } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

// 필요 데이터: 상품명, 판매내용, 가격, 이미지번호-(이미지 링크), 등록일, 판매여부

const MarketDetail = () => {
  const buyBtn = (e) => {
    //구매버튼
    console.log("구매하기 버튼 클릭!");
  };

  return (
    <>
      <div className="container market-detail">
        <div className="sub-link">
          <Link to="/"><HomeIcon/></Link> <span>> </span>
          <Link to="/market">거래장터</Link> <span>> </span>
          <Link to="#">상세보기</Link>
        </div> 
        <h1>거래장터</h1>
        <hr className="h1-bottom" />

        <div className="content">
          <Grid className="content-img">
            <article>
              <img
                src="https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg"
                alt="#"
              />
            </article>
          </Grid>
          <Grid className="content-content">
            <Button className="green-btn" variant="contained" disabled>
              판매 중
            </Button>
            <div className="title">
              <strong>상품명 이름</strong> <span>yyyy.MM.dd</span>
            </div>
            {/* <div className="score">
              <Rating
                defaultValue={2} //별점데이터
                size="large"
                readOnly
                emptyIcon={<StarBorderRounded fontSize="inherit" />}
              />
              <em>2n개 상품평</em>
            </div> */}

            
            <div className="from">
              <span>
                판매자: 누구누구 농부 <br />
              </span>
            </div>
            <div className="text">
              <p>
                <em>
                  ~~에서 키운 맛있는 꿀사과 팝니다. 150자 제한 둬야될듯 Why do
                  we use it? It is a long established fact that a reader will be
                  distracted by the readable c
                </em>
              </p>
            </div>
            <div className="price">
              <strong>8,600원</strong>
              <p>우체국 택배 10,000원 이상 무료 배송!</p>
            </div>

            <div className="btn-center">
              <Button
                className="green-btn center"
                id="buy-btn"
                type="button"
                variant="contained"
                onClick={buyBtn}
              >
                바로 구매 <ChevronRightIcon />
              </Button>
            </div>
          </Grid>
          {/* content-content END */}
        </div>
      </div>
    </>
  );
};

export default MarketDetail;

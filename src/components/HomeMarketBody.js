
import React from 'react'
import "./market/MarketBody.scss";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

// import AgricultureIcon from '@mui/icons-material/Agriculture';
// 판매자 아이콘 후보

const HomeTableBody = (market) => {
  const { seller, itemName, price, imgLinks, itemNo, done } = market.market;

  return (
    <>
      <div className="market-img">
        <Link to="/marketDetail" state={{ itemNo:itemNo }}>
        <div className='market-box'>
          {done ? ( //판매 여부에 따라 출력 구분
            <Button className="green-btn red marketBody" variant="contained" disabled> 판매 완료 </Button> 
            ) : (
            <Button className="green-btn marketBody" variant="contained" color="error" disabled > 판매 중 </Button>
          )}
          <figure>
            <img src={(imgLinks[0]) ? 
                imgLinks[0] : require('../image/no-image.jpg')} 
                alt="사진이 등록되지 않았습니다."/>
          </figure>
          <div className="product">
            <p>
              <strong>{itemName}</strong><br/>
              <StorefrontIcon />{seller}
            </p>
            <div className="price">{price}원</div>
          </div>
        </div>
        </Link>
      </div>

    </>
  );
};

export default HomeTableBody;

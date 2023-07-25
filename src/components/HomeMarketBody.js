
import React from 'react'
import "./market/MarketBody.scss";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';

// import AgricultureIcon from '@mui/icons-material/Agriculture';
// 판매자 아이콘 후보

const HomeTableBody = (market) => {
  const { seller, itemName, price, imgLinks, itemNo } = market.market;
  console.log(itemNo);

  return (
    <>
    <Link to="/marketDetail" itemNo={itemNo}>
      <div className="market-img">
        <figure>
          <img src={(imgLinks[0]) ? imgLinks[0] : require('../image/no-image.jpg')} alt="사진이 등록되지 않았습니다."/>
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
    </>
  );
};

export default HomeTableBody;

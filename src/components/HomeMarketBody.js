
import React from 'react'
import cn from 'classnames'
import StorefrontIcon from '@mui/icons-material/Storefront';

// import AgricultureIcon from '@mui/icons-material/Agriculture';
// 판매자 아이콘 후보

const HomeTableBody = (market) => {
  const { marketName, userName, price, imgSrc } = market.market;

  return (
    <>
      <div className="market-img">
        <figure>
          <img src={imgSrc} alt="거래장터 사진" />
        </figure>
        <div className="product">
          <p>
            <strong>{marketName}</strong> <br />
            <StorefrontIcon /> {userName}
          </p>
          <div className="price">{price}원</div>
        </div>
      </div>
    </>
  );
};

export default HomeTableBody;

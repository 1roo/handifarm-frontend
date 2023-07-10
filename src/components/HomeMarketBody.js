import React from 'react'
import cn from 'classnames'

const HomeTableBody = (market) => {

  const {marketName, userName, price, imgSrc} = market.market;

  return (
    <>
         <div className='market-img'>
            <figure><img src={imgSrc} alt="거래장터 사진"/></figure>
            <div className="product">
              <p>
                <strong>{marketName}</strong> <br/>
                판매자: {userName}
              </p>
              <div className='price'>{price}원</div>
            </div>
        </div>
    </>
  )
}

export default HomeTableBody
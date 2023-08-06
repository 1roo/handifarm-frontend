import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { API_BASE_URL as BASE } from "../../config/host-config";
import { TOSS_KEY as clientKey } from "../../config/key-config";

const selector = "#payment-widget";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

const MarketPayment = (props) => {
  const location = useLocation();
  const itemNo = location.state.itemNo;
  const productName = location.state.productName;
  const productPrice = location.state.productPrice;
  const customerName = location.state.customerName;
  const buyer = location.state.buyer;
  const seller = location.state.seller;

  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(productPrice);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: productPrice }
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [productPrice]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  const handleBuyBtnClick = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: productName,
        customerName: customerName,
        customerEmail: "customer123@gmail.com",
        successUrl: `${BASE}/success?itemNo=${itemNo}&seller=${seller}&buyer=${buyer}`,
        failUrl: `${BASE}/fail`,
      });
    } catch (error) {
      // handle error
    }
  };

  return (
    <div>
      <h1>주문서</h1>
      <span>상품명: {productName}</span>
      <span>{`${price.toLocaleString()}원`}</span>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setPrice(
                event.target.checked ? productPrice - 5000 : productPrice
              );
            }}
          />
          5,000원 할인 쿠폰 적용
        </label>
      </div>
      <div id="payment-widget" />
      <button onClick={handleBuyBtnClick}>결제하기</button>
    </div>
  );
};

export default MarketPayment;

import axios from "axios";
import { useEffect, useState } from "react";
import "./Payment.scss";
import "../.././Custom.scss";
import { Link, useSearchParams } from "react-router-dom";
import { TOSS_SECRET_KEY as secretKey } from "../../config/key-config";
import { API_BASE_URL } from "../../config/host-config";
import { getLoginUserInfo } from "../util/login-utils";
import { Button } from "@mui/material";

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  const [paymentData, setPaymentData] = useState(null);
  const orderId = searchParams.get("orderId");
  console.log(orderId);

  const itemNo = searchParams.get("itemNo");
  console.log(itemNo);

  // buyer와 seller를 URL 매개변수로 받아오기

  const seller = searchParams.get("seller");
  const buyer = searchParams.get("buyer");

  const amount = Number(searchParams.get("amount"));

  const sendPaymentDataToServer = async () => {
    if (!paymentData) {
      console.log("Payment data is not available yet.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        itemNo: itemNo,
        orderId: orderId,
        price: amount,
        buyer: buyer,
        seller: seller,
        orderName: paymentData.orderName,
      }),
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/market/savePaymentData`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // const responseData = await response.json();
      // console.log(responseData); // 서버로부터 받은 응답 (선택사항)
    } catch (error) {
      console.error("전송 실패", error);
    }
  };

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  useEffect(() => {
    if (paymentData) {
      sendPaymentDataToServer();
    }
  }, [paymentData]);

  const fetchPaymentInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.tosspayments.com/v1/payments/orders/` + orderId,
        {
          headers: {
            Authorization:
              "Basic dGVzdF9za19LbWE2MFJaYmxycU1xN2QyZFdFcnd6WVdCbjE0Og==",
          },
        }
      );
      setPaymentData(response.data);
    } catch (error) {
      // handle error
    }
  };

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container payment-result res-suc">
      <h1 className="payment-title">결제 성공</h1>
      <div className="result-box">
        <div className="result-text">거래가 완료되었습니다.</div>
        <div>{`주문 아이디: ${orderId}`}</div>
        <div>{`결제 금액: ${amount.toLocaleString()}원`}</div>
        <div>{`구매자: ${buyer}`}</div>
        <div>{`판매자: ${seller}`}</div>
        <div>{`거래 물품: ${paymentData.orderName}`}</div>
      </div>
      <div className="link-box">
        <Link to="/market">
          <Button
            className="market-link-btn"
            variant="success"
            style={{ fontFamily: "SUITE-Regular" }}
          >
            마켓장터로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

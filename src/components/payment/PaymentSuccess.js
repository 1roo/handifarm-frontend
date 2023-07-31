import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TOSS_SECRET_KEY as secretKey } from "../../config/key-config";

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const [paymentData, setPaymentData] = useState(null);
  const orderId = searchParams.get("orderId");
  console.log(orderId);

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

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
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>

      <div>{paymentData.orderName}</div>
    </div>
  );
}

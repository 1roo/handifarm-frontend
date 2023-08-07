import { useSearchParams } from "react-router-dom";
import "./Payment.scss";
import "../.././Custom.scss";

export function PaymentFail() {
  const [searchParams] = useSearchParams();

  return (
    <div className="container payment-fail">
      <h1>결제 실패</h1>
      <div>{`사유: ${searchParams.get("message")}`}</div>
    </div>
  );
}

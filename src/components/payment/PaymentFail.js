import { Link, useSearchParams } from "react-router-dom";
import "./Payment.scss";
import "../.././Custom.scss";

export function PaymentFail() {
  const [searchParams] = useSearchParams();

  return (
    <div className="container payment-result res-fail">
      <h1>결제 실패</h1>
      <div className="result-box">
        <div className="result-text">거래에 실패하였습니다.</div>
        <div>{`사유: ${searchParams.get("message")}`}</div> 
      </div>
        <Link to="/market" className="link-btn"> 목록으로 돌아가기 </Link>
    </div>
  );
}

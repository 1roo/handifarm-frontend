import { Link, useSearchParams } from "react-router-dom";
import "./Payment.scss";
import "../.././Custom.scss";
import { Button } from "@mui/material";

export function PaymentFail() {
  const [searchParams] = useSearchParams();

  return (
    <div className="container payment-result res-fail">
      <h1 className="payment-title">결제 실패</h1>
      <div className="result-box">
        <div className="result-text">거래에 실패하였습니다.</div>
        <div>{`사유: ${searchParams.get("message")}`}</div> 
      </div>
        <div className="link-box"> 
          <Link to="/market">
            <Button className="market-link-btn" variant="success" style={{ fontFamily: 'SUITE-Regular',}}>
              마켓장터로 돌아가기
            </Button>
          </Link>
        </div>
    </div>
  );
}

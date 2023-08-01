import "./App.css";
import "./Custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Join from "./components/user/Join";
import Mypage from "./components/user/Mypage";
import BoardList from "./components/board/BoardList";
import BoardRegist from "./components/board/BoardRegist";
import BoardDetail from "./components/board/BoardDetail";
import BoardModify from "./components/board/BoardModify";
import BoardReply from "./components/board/BoardReply";
import { AuthContextProvider } from "./components/util/AuthContext";
import MarketList from "./components/market/MarketList";
import MarketDetail from "./components/market/MarketDetail";
import MarketRegist from "./components/market/MarketRegist";
import MarketModify from "./components/market/MarketModify";
import SnsList from "./components/snsBoard/SnsList";
import SnsRegist from "./components/snsBoard/SnsRegist";
import SnsDetail from "./components/snsBoard/SnsDetail";
import SnsUserDetail from "./components/snsBoard/SnsUserDetail";
import Weather from "./components/todayInfo/Weather";
import Pest from "./components/todayInfo/Pest";
import Payment from "./components/payment/Payment";
import { PaymentSuccess } from "./components/payment/PaymentSuccess";
import { PaymentFail } from "./components/payment/PaymentFail";
import Error404 from "./components/Error404";
import TodayInfoPage from "./components/todayInfo/TodayInfoPage";

function App(props) {
  return (
    <AuthContextProvider>
      <Router>
        <Reset />
        <Header />

        <Routes>

          <Route exact path="/" element={<Home />} />

          {/* >> User (회원가입, 로그인, 마이페이지) */}
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<Mypage />} />

          {/* >> Board 게시판 */}
            <Route path="/board" element={<BoardList />} />
            <Route path="/boardRegist" element={<BoardRegist />} />
            <Route path="/board/:boardNo" element={<BoardDetail />} />
            <Route path="/boardModify/:boardNo" element={<BoardModify />} />
            <Route path="/board/:boardNo/boardReply" element={<BoardReply />} />

          {/* >> Market 거래장터 */}
            <Route path="/market" element={<MarketList />} />
            <Route path="/marketRegist" element={<MarketRegist />} />
            <Route path="/marketDetail" element={<MarketDetail />} />
            <Route path="/marketModify" element={<MarketModify />} />

          {/* >> SNS Board 농사일기 */}
            <Route path="/snsBoard" element={<SnsList />} />
            <Route path="/snsBoard/snsRegist" element={<SnsRegist />} />
            <Route path="/snsBoard/:writer" element={<SnsUserDetail />} />
            <Route path="/snsBoard/:snsNo/:writer" element={<SnsDetail />} />

          {/* >> TodayInfo오늘의 정보 */}
            <Route path="/weather" element={<Weather />} />
            <Route path="/todayInfo" element={<TodayInfoPage />} />
            <Route path="/pest" element={<Pest />} />

          {/* 기타 */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/fail" element={<PaymentFail />} />
          
          {/* >> 404 에러 처리 >>  */}
            <Route path="/*" element={<Error404 />} />

        </Routes>

        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;

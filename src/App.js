import "./App.css";
import "./Custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Join from "./components/user/Join";
import BoardList from "./components/board/BoardList";
import BoardRegist from "./components/board/BoardRegist";
import BoardDetail from "./components/board/BoardDetail";
import BoardModify from "./components/board/BoardModify";
import BoardReply from "./components/board/BoardReply";
import { AuthContextProvider } from "./components/util/AuthContext";
import MarketList from "./components/market/MarketList";
import MarketDetail from "./components/market/MarketDetail";
import MarketRegist from "./components/market/MarketRegist";
import SnsList from "./components/snsBoard/SnsList";
import SnsDetail from "./components/snsBoard/SnsDetail";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Reset />
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/boardRegist" element={<BoardRegist />} />
          <Route path="/board/:boardNo" element={<BoardDetail />} />
          <Route path="/boardModify/:boardNo" element={<BoardModify />} />
          <Route path="/board/:boardNo/boardReply" element={<BoardReply />} />
          <Route path="/market" element={<MarketList />} />
          <Route path="/marketRegist" element={<MarketRegist />} />
          <Route path="/marketDetail" element={<MarketDetail />} />
          <Route path="/snsBoard/snsList" element={<SnsList />} />
          <Route path="/snsBoard/snsDetail/:id" element={<SnsDetail />} />

        </Routes>

        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;

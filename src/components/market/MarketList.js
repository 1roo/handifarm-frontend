import React, { useState, useEffect } from "react";
import "./Market.scss";
import "../.././Custom.scss";
import HomeMarketBody from "../HomeMarketBody";
// mui 아이콘 > 시작
import CreateIcon from "@mui/icons-material/Create"; //작성 아이콘
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_BASE_URL } from "../../config/host-config";
import { getLoginUserInfo } from "../util/login-utils";
import { loadingPage, loadingSmallPage } from "../util/Loading-util";

const MarketList = () => {

  const redirection = useNavigate();
  const [loading, setLoading] = useState(true);
  const [smallLoading2, setSmallLoading2] = useState(false);
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  const [marketList, setMarketList] = useState([]); //물품 목록 넣는 배열
  const [moreBtnCount, setMoreBtnCount] = useState(1); //더보기 클릭 횟수 겸 page param
  const [moreBtnOpen, setMoreBtnOpen] = useState(true); //더보기 출력할지 말지 여부판단
  const [onlyDoneTrueBtn, setOnlyDoneTrueBtn] = useState(false); //판매중인 물품만 보기 ON OFF 판단

  
  useEffect(() => {

    if(!token){ //회원에게만 서비스를 제공.
      alert('로그인이 필요한 서비스입니다.')
      redirection('/login')
    }

    setSmallLoading2(true); //계산 중 로딩창 띄우기

    const requestHeader = {
      // 'content-type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    };

    //조건 판단
    const fetchSize = (onlyDoneTrueBtn ? 99999 : 12*moreBtnCount);

    fetch(`${API_BASE_URL}/api/market?page=1&size=${fetchSize}`, {
      headers : requestHeader
    })
    .then(res => {
      if(!res.ok) {
        if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
        else alert('로딩 중 문제가 발생하였습니다. 관리자에게 문의바랍니다.')
        redirection('/');
        return;
      }

      res.json().then(data => {  //데이터 담기~~

        const itemList = (onlyDoneTrueBtn 
          ? (data.marketItems.filter(item => !item.done)).slice(0, 12*moreBtnCount) 
          : data.marketItems)

        //더보기 ON OFF 여부 판단
        if(12*moreBtnCount > itemList.length) setMoreBtnOpen(false) 
        else setMoreBtnOpen(true)
        
        //아이템 리스트 세팅
        setMarketList(itemList); 

        //로딩 완료함!
        if(itemList) {
          setLoading(false);
          setSmallLoading2(false);
        }
      })
    })

  }, [moreBtnCount, onlyDoneTrueBtn]) //useEffect END

  
    // 판매중인 품목만 보기 버튼 클릭!
    function OnlyDoneTrueBtn() {
      setOnlyDoneTrueBtn(!onlyDoneTrueBtn);
      setMoreBtnCount(1); //더보기 횟수 초기화
    }

    //더보기 버튼 클릭!
    function MoreBtnClick() {
      setMoreBtnCount(moreBtnCount+ 1); // 버튼 횟수 늘려주기
    }


  return (
    <>
       { loading ? loadingPage : 
        <>
          {/* { smallLoading2 ? loadingSmallPage : '' } */}
          <div className="container market">
            <div className="sub-link">
              <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
              <Link to="/market">거래장터</Link>
            </div>
            <h1>거래장터</h1>
            <div className="searchVar"> 
              <span className="done-btn" onClick={OnlyDoneTrueBtn}>
                {onlyDoneTrueBtn ?  <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
              </span> 
              판매중인 품목만 보기 
            </div>
            <div className="market-list">
              {marketList.map((ma) => (
                  <HomeMarketBody market={ma} />
              ))}
            </div>
            {/* market-group END */}
            {moreBtnOpen && 
              <Button className="more-btn" type="button" variant="light" onClick={MoreBtnClick}>
                더 보기
              </Button>
            }
            <hr />
            <div className="link-box">
              <Link to="/marketRegist">
                <Button className="write-link-btn" variant="success">
                  <CreateIcon />내 농작물 판매하기
                </Button>
              </Link>
            </div>
          </div>
          </>
        }
    </>
  );
};

export default MarketList;

import React, { useState, useEffect } from "react";
import "./Market.scss";
import "../.././Custom.scss";
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Rating } from "@mui/material";
import { StarBorderRounded } from "@mui/icons-material"; //별점 아이콘
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getLoginUserInfo } from "../util/login-utils";
import { API_BASE_URL } from "../../config/host-config";



// 필요 데이터: 상품명, 판매내용, 가격, 이미지번호-(이미지 링크), 등록일, 판매여부
const MarketDetail = () => {

  const location = useLocation();
  const itemNo = location.state.itemNo; //상세보기 요청한 아이템 번호

  const redirection = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  const [thisItem, setThisItem] = useState([]);

  
  useEffect(() => {
    
    if(!token){
      alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
      redirection('/');
      return;
    }


    const requestHeader = {
      'content-type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    };

    fetch(`${API_BASE_URL}/api/market/${itemNo}`, {
      headers : requestHeader
    })
    .then(res => {
      if(!res.ok) {
        if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
        else if(res.status === 500) alert('내부 코드 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
        else alert('로딩 중 문제가 발생하였습니다. 관리자에게 문의바랍니다.')
        redirection('/');
        return;
      }
  
      res.json().then(data => { 
        console.log('data', data);
        setThisItem(data)
      })
    })

    //로딩 완료
    setLoading(false)
    
  }, []) //useEffect END


  const loadingPage = (
    <div id="loading">
      <img id="loadingElement" 
          src="https://cdn-icons-png.flaticon.com/512/189/189768.png"/>
    </div>   
  )


  const buyBtn = (e) => {    //구매버튼
    console.log("구매하기 버튼 클릭!");


  };
  const modiBtn = () => {    //수정하기 버튼
    console.log("수정하기 버튼 클릭!");

    redirection('/marketModify', {
      state: { thisItem: thisItem }
    });
  };
  const delBtn = () => {    //삭제하기 버튼
    console.log("삭제하기 버튼 클릭!");

    if(window.confirm(`'${thisItem.itemName}' 판매를 중단하시겠습니까?\n삭제된 게시글은 복구가 불가능합니다.`)){
      const requestHeader = {
        'content-type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      };
  
      fetch(`${API_BASE_URL}/api/market/${itemNo}`, {
        method : 'DELETE',
        headers : requestHeader
      })
      .then(res => {
        console.log('200 OK면 좋겠다: ', res.status);
        if(!res.ok) {
          if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
          else if(res.status === 500) alert('500에러')
          else alert('문제가 발생하였습니다. 관리자에게 문의바랍니다.')
          redirection('/');
          return;
        }
        alert('삭제가 완료되었습니다.')
        redirection('/market');
      }) // fetch.then END
    }
  }; //delBtn 삭제하기 버튼 END




  return (
    <>
      { loading ? loadingPage : 
        <div className="container market-detail">
          <div className="sub-link">
            <Link to="/"><HomeIcon/></Link> <span> &gt; </span>
            <Link to="/market">거래장터</Link> <span> &gt; </span>
            <span style={{cursor: 'pointer'}}>상세보기</span>
          </div> 
          <h1>거래장터</h1>
          <hr className="h1-bottom" />

          <div className="content">
            <Grid className="content-img">
              <article>
                  <img
                    src={ thisItem.imgLinks ? thisItem.imgLinks[0] : require('../../image/no-image.jpg') }
                    alt="상품 이미지"
                  />
              </article>
            </Grid>
            <Grid className="content-content">
              {thisItem.done ?  //판매 여부에 따라 출력 구분
                <Button className="green-btn red" variant="contained" disabled> 판매 완료 </Button>
                : <Button className="green-btn" variant="contained" color="error" disabled> 판매 중 </Button>
              }
              <div className="title">
                <strong>{thisItem.itemName}</strong> <span>{thisItem.regDate}</span>
              </div>
              {/* <div className="score">
                <Rating
                  defaultValue={2} //별점데이터
                  size="large"
                  readOnly
                  emptyIcon={<StarBorderRounded fontSize="inherit" />}
                />
                <em>2n개 상품평</em>
              </div> */}

              <div className="from">
                <span>
                  판매자: {thisItem.seller}<br />
                </span>
              </div>
              <div className="text">
                <p>
                  <em>
                    {thisItem.itemContent}
                  </em>
                </p>
              </div>
              <div className="price">
                <strong>{thisItem.price}원</strong>
                <p>우체국 택배 10,000원 이상 무료 배송!</p>
              </div>

              <div className="btn-center">
                {thisItem.seller == localStorage.getItem('USER_NICK') ? //기본 구매하기 버튼. 물품 주인은 수정or삭제로 유도. 
                  <> 
                    <Button
                      className="green-btn center buttons"
                      id="modi-btn"
                      type="button"
                      variant="contained"
                      onClick={modiBtn}
                    > 
                      글 수정하기 <ChevronRightIcon />
                    </Button>
                    <Button
                      className="green-btn center buttons"
                      id="del-btn"
                      type="button"
                      variant="contained"
                      onClick={delBtn}
                    >
                      판매 내리기 <ChevronRightIcon />
                    </Button> 
                  </> :
                  <Button
                    className="green-btn center buttons"
                    id="buy-btn"
                    type="button"
                    variant="contained"
                    onClick={buyBtn}
                  >
                    바로 구매 <ChevronRightIcon />
                  </Button>
                }
              </div>
            </Grid>
            {/* content-content END */}
          </div>
        </div>
      }
    </>
  );
};

export default MarketDetail;

import React, { useEffect, useRef, useState } from "react";
import "./Market.scss";
import "../.././Custom.scss";
// mui 아이콘 > 시작
import HomeIcon from "@mui/icons-material/Home";
// mui 아이콘 > 끝!
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  ThemeProvider,
  InputAdornment,
} from "@mui/material";
import { createTheme } from "@mui/system";
import { Input } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/host-config";
import { getLoginUserInfo } from "../util/login-utils";

const MarketRegist = () => {
  const location = useLocation();
  const [thisItem, setThisItem] = useState(location.state.thisItem); // 수정할 물품의 기본정보

  const $fileTag = useRef();
  const [imgFile, setImgFile] = useState();
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  const redirection = useNavigate(); //로딩창 설계
  const [loading, setLoading] = useState(true);

  //클릭 시 이미지 반영하기
  const showThumbnailHandler = () => {
    const file = $fileTag.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgFile(reader.result);
    };

    //이미지가 새로 등록되면 기존 링크는 비워주도록 처리
    setMarketValue({
      ...marketValue,
      imgLinks: [],
    });
  };

  //전달을 위한 값 저장
  const [marketValue, setMarketValue] = useState({
    itemName: thisItem.itemName, //물품명
    itemContent: thisItem.itemContent, //물품 설명
    price: thisItem.price, //가격
    imgLinks: [thisItem.imgLinks[0]], //이미지 링크 배열
  });

  const [correct, setCorrect] = useState({
    // 검증 통과여부
    itemName: true,
    itemContent: true,
    price: true,
  });
  const [message, setMessage] = useState({
    // 메시지 전달
    itemName: " ",
    itemContent: " ",
    price: " ",
  });

  //검증 데이터를 상태 변수에 저장하는 함수
  const saveInputState = ({ key, inputVal, msg, flag }) => {
    setMarketValue({
      ...marketValue,
      [key]: inputVal,
    });

    setCorrect({
      ...correct,
      [key]: flag,
    });

    setMessage({
      ...message,
      [key]: msg,
    });
  };

  //가격 price 입력마다 입력값 검증
  const priceHandler = (e) => {
    const inputVal = e.target.value;

    let flag = false;
    let msg = " ";
    if (!/^[0-9]{0,}$/.test(inputVal)) {
      msg = "숫자만 입력이 가능합니다.";
    } else if (!inputVal) {
      msg = "상품의 가격을 입력해주세요.";
    } else if (!/^[0-9]{0,6}$/.test(inputVal)) {
      msg = "상품의 가격은 100만원을 넘길 수 없습니다.";
    } else {
      flag = true;
    }
    saveInputState({ key: "price", inputVal, flag, msg });
  };

  //상품명 itemName입력값 검증
  const itemNameHandler = (e) => {
    const inputVal = e.target.value;

    let flag = false;
    let msg = " ";
    if (!inputVal) {
      msg = " ";
    } else if (!/^.{0,15}$/.test(inputVal)) {
      msg = "제목은 15글자를 넘길 수 없습니다.";
    } else {
      flag = true;
    }
    saveInputState({ key: "itemName", inputVal, flag, msg });
  };

  //상품 설명 itemContent입력값 검증
  const itemContentHandler = (e) => {
    const inputVal = e.target.value;

    let flag = false;
    let msg = " ";
    if (!/^.{0,100}$/.test(inputVal)) {
      e.target.style.color = "tomato";
      e.target.style.fontStyle = "italic";
      msg = "100자 제한에 도달했습니다.";
    } else {
      e.target.style.color = "inherit";
      e.target.style.fontStyle = "initial";
      flag = true;
    }
    saveInputState({ key: "itemContent", inputVal, flag, msg });
  };

  // 입력 통과 여부 조회
  const isValid = () => {
    for (const c in correct) {
      const flag = correct[c];
      if (!flag) return false;
    }
    return true;
  };

  //수정 완료 버튼 클릭
  const modifyBtn = (e) => {
    console.log("입력된 값: ", marketValue);
    if (!isValid()) {
      //입력값 문제없음 OK
      console.log("모든 값을 제대로 입력했는지 확인해주세요.");
      return;
    }

    /////////////////////값 등록 시작
    const requestHeader = {
      // 'content-type' : 'multipart/form-data',
      Authorization: "Bearer " + token,
    };

    const marketJsonBlob = new Blob([JSON.stringify(marketValue)], {
      type: "application/json",
    });

    // 이미지 파일과 회원정보 FormData 객체를 활용해서 JSON을 하나로 묶어야 한다.
    const marketFormData = new FormData();
    marketFormData.append("itemInfo", marketJsonBlob);
    console.log("Blob", marketJsonBlob);
    if (!!$fileTag.current.files[0]) {
      marketFormData.append("itemImgs", $fileTag.current.files[0]);
      console.log($fileTag.current.files[0]);
    }

    console.log("FormData: ", marketFormData);

    fetch(`${API_BASE_URL}/api/market/${thisItem.itemNo}`, {
      method: "PATCH",
      headers: requestHeader,
      body: marketFormData,
    }).then((res) => {
      if (res.ok) {
        alert("게시글이 수정되었습니다.");
        redirection("/marketDetail", {
          state: { itemNo: thisItem.itemNo },
        });
        return;
      } else if (res.status === 403) {
        alert("로그인한 사용자만 접근할 수 있는 페이지입니다.");
        redirection("/");
        return;
      } else if (res.status === 500) console.log("500에러");
      else {
        console.log("에러 발생!");
      }
    });
  };

  useEffect(() => {
    if (!token) {
      //회원에게만 서비스를 제공.
      alert("로그인이 필요한 서비스입니다.");
      redirection("/login");
    }
  });

  return (
    <>
      <div className="container market-regist">
        <div className="sub-link">
          <Link to="/">
            <HomeIcon />
          </Link>{" "}
          <span> &gt; </span>
          <Link to="/market">거래장터</Link> <span> &gt; </span>
          <Link to="/marketDetail" state={{ itemNo: thisItem.itemNo }}>
            상세보기
          </Link>{" "}
          <span> &gt; </span>
          <Link to="#">물품 수정</Link>
        </div>
        <h1>거래장터 - 물품 수정</h1>
        <hr className="h1-bottom" />

        <div className="write">
          <Grid className="write-image">
            <div className="add-file" onClick={() => $fileTag.current.click()}>
              <img
                src={imgFile || thisItem.imgLinks[0]}
                alt="물품 사진을 등록해주세요."
              />
            </div>
            <input
              id="product-img"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              ref={$fileTag}
              onChange={showThumbnailHandler}
            />
          </Grid>
          <Grid className="write-content">
            <div className="answer-content">
              <span className="list-title">상품명</span>
              <TextField
                className="answer-box"
                variant="standard"
                id="itemNameValue"
                color="success"
                placeholder="상품의 이름을 입력해주세요."
                value={marketValue.itemName}
                helperText={message.itemName}
                onChange={itemNameHandler}
              />
            </div>
            <div className="answer-content">
              <span className="list-title">가격</span>
              <TextField
                className="answer-box"
                variant="standard"
                id="priceValue"
                color="success"
                type="text"
                placeholder=" "
                value={marketValue.price}
                helperText={message.price}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" id="price-unit">
                      원
                    </InputAdornment>
                  ),
                }}
                onChange={priceHandler}
              />
            </div>
            <div className="answer-content">
              <span className="list-title">상품설명</span>
              <TextField
                className="answer-box"
                variant="outlined"
                id="itemContentValue"
                color="success"
                multiline
                rows={4}
                placeholder="제품 설명을 입력해주세요. (최대 100자)"
                value={marketValue.itemContent}
                helperText={message.itemContent}
                onChange={itemContentHandler}
              />
            </div>
            <div className="answer-content">
              <span className="list-title">판매자</span>
              <TextField
                className="answer-box"
                variant="standard"
                id="sellerValue"
                disabled
                value={thisItem.seller}
                color="success"
              />
            </div>
          </Grid>
          {/* write-content END */}
        </div>
        <div className="btn-center">
          <Link to="/marketDetail" state={{ itemNo: thisItem.itemNo }}>
            <Button
              className="green-btn center return-btn"
              type="button"
              variant="contained"
            >
              취소하기
            </Button>
          </Link>
          <Button
            className="green-btn center"
            id="regist-btn"
            type="button"
            variant="contained"
            onClick={modifyBtn}
          >
            수정 완료
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarketRegist;

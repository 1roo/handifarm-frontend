import React, { useRef, useState } from "react";
import "./Market.scss";
import "../.././Custom.scss";
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

const MarketRegist = () => {
  const $fileTag = useRef();
  const [imgFile, setImgFile] = useState(null);

  //클릭 시 이미지 반영하기
  const showThumbnailHandler = (e) => {
    const file = $fileTag.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const [marketValue, setMarketValue] = useState({
    //전달을 위한 값 저장
    marketName: null,
    price: null,
    info: null,
    userName: "판매자 데이터넣기",
  });
  const [correct, setCorrect] = useState({
    // 검증 통과여부
    marketName: false,
    price: false,
    info: false,
  });
  const [message, setMessage] = useState({
    // 메시지 전달
    marketName: " ",
    price: "숫자만 입력이 가능합니다.",
    info: " ",
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

  //상품명 marketName입력값 검증
  const marketNameHandler = (e) => {
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
    saveInputState({ key: "marketName", inputVal, flag, msg });
  };

  //상품 설명 info입력값 검증
  const infoHandler = (e) => {
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
    saveInputState({ key: "info", inputVal, flag, msg });
  };

  // 입력 통과 여부 조회
  const isValid = () => {
    for (const c in correct) {
      const flag = correct[c];
      if (!flag) return false;
    }
    return true;
  };

  //등록하기 버튼 클릭
  const registBtn = (e) => {
    console.log(correct);
    if (isValid()) {
      //입력값 문제없음 OK
      console.log(marketValue);
    }
  };

  return (
    <>
      <div className="container market-regist">
        <h1>거래장터</h1>

        <div className="write">
          <Grid className="write-image">
            <div className="add-file" onClick={() => $fileTag.current.click()}>
              <img
                src={imgFile || require("../../image/add-image.png")}
                alt="product photo"
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
                id="marketNameValue"
                color="success"
                placeholder="상품의 이름을 입력해주세요."
                helperText={message.marketName}
                onChange={marketNameHandler}
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
                id="infoValue"
                color="success"
                multiline
                rows={4}
                helperText={message.info}
                placeholder="제품 설명을 입력해주세요. (최대 100자)"
                onChange={infoHandler}
              />
            </div>
            <div className="answer-content">
              <span className="list-title">판매자</span>
              <TextField
                className="answer-box"
                variant="standard"
                id="userNameValue"
                disabled
                value={"판매자 이름 데이터 넣기"}
                color="success"
              />
            </div>
          </Grid>
          {/* write-content END */}
        </div>
        <div className="btn-center">
          <Button
            className="green-btn center"
            id="regist-btn"
            type="button"
            variant="contained"
            onClick={registBtn}
          >
            등록하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarketRegist;

import React, {useRef, useState} from 'react'
import './Market.scss';
import '../.././Custom.scss';
import { Button, CssBaseline, TextField, Grid, Box, ThemeProvider, InputAdornment } from '@mui/material';
import { createTheme } from '@mui/system';
import { Input } from 'reactstrap';

const MarketRegist = () => {

    const $fileTag = useRef();
    const [imgFile, setImgFile] = useState(null);

    const [marketValue, setMarketValue] = useState({
        marketName: '', price: '', dd: '', email: '', provenance: ''
    });

    const [priceMsg, setPriceMsg] = useState('');
    const [correct, setCorrect] = useState({
        marketName: false, delivery: false, from: false
    });

  //검증 데이터를 상태 변수에 저장하는 함수
  const saveInputState = ({key, inputVal, flag}) => {

    setMarketValue({
      ...marketValue,
      [key]: inputVal
    });

    setCorrect({
      ...correct,
      [key]: flag
    });

  }



    //클릭 시 이미지 반영하기
    const showThumbnailHandler = e => {
        const file = $fileTag.current.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => { setImgFile(reader.result); }
    }

    //등록하기 버튼 클릭
    const registBtn = e => {
        const $price = document.getElementById('priceValue')
        console.log($price.value);
        console.log($price);
    }

    //입력값 검증
    const priceHandler = e => {
        const regex = /^[0-9]{2,8}$/;
        let anPrice = e.target.value;
        
        let flag = false;
        if(!anPrice || regex.test(anPrice)){ //null이거나 숫자가 아닐 경우
            setCorrect({key: })
        }


    }






  return (
    <>
        <div className='container market-regist'>
        <h1>거래장터</h1>

        <div className='write'>
            <Grid className='write-image'>
                <div className='add-file' onClick={() => $fileTag.current.click()}>
                    <img
                        src={imgFile || require("../../image/add-image.png")} 
                        alt="product photo"
                    />
                </div>
                <input id='product-img' type='file'
                    style={{display: 'none'}}
                    accept='image/*'
                    ref={$fileTag}
                    onChange={showThumbnailHandler}
                />
            </Grid>

            <Grid className='write-content'>
                <div className='answer-content'>
                    <span>상품명</span>
                    <TextField variant="standard" color='success'
                        placeholder='거래할 상품의 이름을 입력해주세요.'
                    />
                </div>
                <div className='answer-content'>
                    <span>가격</span>
                    <TextField variant="standard"
                        id='priceValue'
                        color='success'
                        type='number'
                        placeholder='거래할 상품의 가격을 입력해주세요.'
                        helperText='숫자만 입력이 가능합니다.'
                        InputProps={{ 
                            endAdornment: <InputAdornment position="start" id='price-unit'>원</InputAdornment>,
                        }}
                        onChange={priceHandler}
                    />
                </div>
                <div className='answer-content'>
                    <span>배송</span>
                    <TextField variant="standard" color='success'
                        placeholder='배송?'
                    />
                </div>
                <div className='answer-content'>
                    <span>판매자</span>
                    <TextField variant="standard" disabled 
                        value={'판매자명 데이터 가져와서 넣기'}
                        color='success'
                    />
                </div>
                <div className='answer-content'>
                    <span>원산지</span>
                    <TextField variant="standard" color='success'
                        placeholder='거래할 물품의 원산지를 입력해주세요.'/>
                </div>
            </Grid> {/* write-content END */}
        </div>

        <Button className='green-btn' 
            id='regist-btn' 
            type="button" 
            variant="contained"
            onClick={registBtn}> 
        등록하기 
        </Button>

        </div>
    </>
  )
}

export default MarketRegist;
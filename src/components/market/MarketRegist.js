import React, {useRef, useState} from 'react'
import './Market.scss';
import '../.././Custom.scss';
import { Button, CssBaseline, TextField, Grid, Box, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';

const MarketRegist = () => {

    const $fileTag = useRef();
    const [imgFile, setImgFile] = useState(null);

    //이미지 파일을 선택했을 때 썸네일 뿌리기
    const showThumbnailHandler = e => {
        const file = $fileTag.current.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => { setImgFile(reader.result); }
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
                <TextField label="상품명" variant="standard"></TextField>
                <TextField label="가격" variant="standard"></TextField>
                <TextField label="배송" variant="standard"></TextField>
                <TextField label="판매자" variant="standard" disabled></TextField>
                <TextField label="원산지" variant="standard"></TextField>
            </Grid>
        </div>

        <Button className='green-btn' 
            id='phoneCheckBtn' 
            type="button" 
            variant="contained"> 
        등록하기 
        </Button>

        </div>
    </>
  )
}

export default MarketRegist;
import React from "react";
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import { json } from "react-router-dom";

const Weather = () => {
  console.log('날씨 정보창 들어옴'); 
  
  const $EncodingKey = 'hr0B7fBVo7yq4ogORGVCFWoku%2FrF2GHMmVivMJtANj3xiGOQ2%2BJ3Pc5Di6oBflSCiBGmBjbWjw1ZyZpE4WCZVQ%3D%3D'; //인증키
  const $areaId = '4822000000'; //지역 아이디 (엑셀 참고)
  const $speId = 'PA999999'; //작물별 특성 아이디
  const $stYmd = getDate(0).dateString; //오늘 날짜

  fetch('http://apis.data.go.kr/1360000/FmlandWthrInfoService/getDayStatistics?serviceKey='+$EncodingKey+'&numOfRows=10&pageNo=1&dataType=JSON&ST_YMD='+$stYmd+'&ED_YMD=20161201&AREA_ID='+$areaId+'&PA_CROP_SPE_ID=PA999999'
  ).then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data.response.header);
  })


  //날짜 정보 구하기
  function getDate(plusDay) {

    const today = new Date();
    today.setDate(today.getDate() + plusDay); //오늘, 내일, 모레 여부

    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();

    //yyMMdd 구하기
    const dateString = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
    
    //요일 구하기
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' }).replace('요일', '');

    return {dateString, month, day, dayName};
  }



  return(
  <>
    <section className='weather-box'>
          <div className='title'><h2>제주<br/>날씨</h2></div>

              <div className='weather D0'>
                <div>
                  <div className='day'><h3>오늘</h3><span>{getDate(0).month}/{getDate(0).day} {getDate(0).dayName}</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span> <i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span> <i><WbCloudyIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span> <hr/> <span>28℃</span>
                </div>
              </div> {/* weather D-0 END */}
              
              <div className='weather D1'>
                <div>
                  <div className='day'><h3>내일</h3><span>{getDate(1).month}/{getDate(1).day} {getDate(1).dayName}</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span>  <i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span>  <i><WbSunnySharpIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span> <hr/> <span>28℃</span>
                </div>
              </div> {/* weather D+1 END */}

              <div className='weather D2'>
                <div>
                  <div className='day'><h3>모레</h3><span>{getDate(2).month}/{getDate(2).day} {getDate(2).dayName}</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span> <i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span> <i><WbCloudyIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span> <hr/> <span>28℃</span>
                </div>
              </div> {/* weather D+2 END */}

          </section>

  </>
  )
};

export default Weather;

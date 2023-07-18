import React, { useEffect, useState } from "react";
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import { json } from "react-router-dom";
import { ENCODING_KEY, WMCODE_KEY } from '../../config/key-config';

const Weather = () => {
  console.log('날씨 정보창 들어옴'); 

  const [weatherCode, setWeatherCode] = useState('00');

  const [weather0, setWeather0] = useState({});
  const [weather1, setWeather1] = useState({});
  const [weather2, setWeather2] = useState({});


  
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

  // //주산지 특보 조회
  // fetch('http://apis.data.go.kr/1360000/FmlandWthrInfoService/getDayStatistics?serviceKey='+WMCODE_KEY
  //     +'&numOfRows=10&pageNo=1&dataType=JSON&ST_YMD='+$stYmd
  //     +'&ED_YMD=20161201&AREA_ID='+$areaId
  //     +'&PA_CROP_SPE_ID='+$speId
  // ).then(res => res.json())
  // .then(data => {
  //   console.log('주산지 특보 조회'+data);
  //   console.log(data.response.header);
  // })


  const [temps, setTemps] = useState({})

    //일통계 조회
    const getTempData = (plusDay) => {

      const $stnIds = '108'; //지역 아이디 워드파일 참고 (108: 서울)
      const $stYmd = getDate(-plusDay).dateString; //오늘 날짜
      
      fetch('http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey='+ENCODING_KEY
          +'&numOfRows=10&pageNo=1&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt='+$stYmd+'&endDt='+$stYmd+'&stnIds='+$stnIds
      ).then(res => res.json())
      .then(data => {
        console.log('응답메시지 코드: '+weatherCode);
        console.log('받아온 정보: ', data);

        setWeatherCode(data.response.header.resultCode)
        const datas = data.response.body.items.item[0];
        setTemps({
          avgTa : datas.avgTa, //평균온도
          minTa : datas.minTa, //최저온도
          maxTa : datas.maxTa, //최고온도
          iscs : datas.iscs   
        })
      })

      return {temps}
    }


  useEffect(() => {
    console.log('Effect 작동');

    setWeather0(getTempData(3).temps);
    setWeather1(getTempData(2).temps);
    setWeather2(getTempData(1).temps);

  }, []) //effect 종료


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
                  <span>{weather0.minTa}℃</span> <hr/> <span>{weather0.maxTa}℃</span>
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
                <span>{weather1.minTa}℃</span> <hr/> <span>{weather1.maxTa}℃</span>
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
                <span>{weather2.minTa}℃</span> <hr/> <span>{weather2.maxTa}℃</span>
                </div>
              </div> {/* weather D+2 END */}

          </section>

  </>
  )
};

export default Weather;

import React, { useEffect, useState } from "react";
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import { json } from "react-router-dom";
import { ENCODING_KEY, WMCODE_KEY } from '../../config/key-config';
import './TodayInfo.scss';
import '../../Custom.scss';


const Weather = () => {
  console.log('날씨 정보창 들어옴'); 

  const [weatherCode, setWeatherCode] = useState('');

  // const [weather0, setWeather0] = useState({});
  // const [weather1, setWeather1] = useState({});
  // const [weather2, setWeather2] = useState({});

  //날짜 정보 구하기
  function getDate(plusDay) {

    const today = new Date();
    today.setDate(today.getDate() + plusDay); //오늘, 내일, 모레 여부

    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const time = today.getHours();

    //yyMMdd 구하기
    const dateString = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
    
    //요일 구하기
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' }).replace('요일', '');

    return {dateString, month, day, time, dayName};
  }



    //일통계 조회
    const getTempData = async (plusDay) => {

      const $stYmd = getDate(+plusDay).dateString; //오늘 날짜
      // const $stTime = (getDate(-plusDay).time-1)+'00';
      const $stTime = '0500';
      const $stnIds = '108'; //지역 아이디 워드파일 참고 (108: 서울)
      const $AreaId = '999999999'
      const $paSpeId = 'PA999999'
      
      console.log('날짜: '+$stYmd);
      console.log('시간: '+$stTime);
      
      let nX = '59';
			let nY = '126';
      

      //실황
      // const resRealTime = await fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey='+ENCODING_KEY
      //  +'&numOfRows=10&pageNo=1&dataType=JSON&base_date='+$stYmd+'&base_time='+$stTime+'&nx='+nX+'&ny='+nY)
      // const data = await resRealTime.json();
      // console.log('data: ', data);
      // const temp = data.response.body.items.item[3].obsrValue;
      // console.log('현재기온: ', temp);
      // const dd = document.querySelector('.weather.D0 > .temp > span');
      // dd.textContent = temp+'℃';

      //단기예보 
      const resWeather = await fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey='+ENCODING_KEY
        +'&numOfRows=1000&pageNo=1&dataType=JSON&base_date='+$stYmd+'&base_time='+$stTime+'&nx='+nX+'&ny='+nY);
      
      const data = await resWeather.json();
      const itemList = data.response.body.items.item;
      const temp = [];

      console.log(itemList);

      itemList.forEach(it => {
        if(it.category == 'TMN'){
          console.log(it.fcstDate+'일의 최저기온: ', it.fcstValue+'℃');
          temp.push(it.fcstValue);
        } else if(it.category == 'TMX'){
          console.log(it.fcstDate+'일의 최고기온: ', it.fcstValue+'℃');
          temp.push(it.fcstValue);
        }
      });
      
      console.log(temp);
      document.querySelector('.weather.D0 .temp span:nth-of-type(2)').textContent = temp[0]+'℃';
      document.querySelector('.weather.D1 .temp span:nth-of-type(1)').textContent = temp[1]+'℃';
      document.querySelector('.weather.D1 .temp span:nth-of-type(2)').textContent = temp[2]+'℃';
      document.querySelector('.weather.D2 .temp span:nth-of-type(1)').textContent = temp[3]+'℃';
      document.querySelector('.weather.D2 .temp span:nth-of-type(2)').textContent = temp[4]+'℃';

      
      if(data.response.header.resultCode !== '00'){ //정상처리되지 않았을 경우
        console.log('잘못된 요청입니다.');
        // return;
      } else if(data.response.header.resultCode === '03'){
        console.log('데이터가 존재하지 않습니다.');
      }

    }


  useEffect(() => {

  }, [])


  return(
  <>
    {/* <div id="loading">
        <img id="loadingElement" src="https://cdn-icons-png.flaticon.com/512/189/189768.png"/>
    </div>    */}
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
            <span>{getTempData(-1).temp}℃</span> <hr/> <span>29℃</span>
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
            <span>25℃</span> <hr/> <span>33℃</span>
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
            <span>24℃</span> <hr/> <span>31℃</span>
          </div>
        </div> {/* weather D+2 END */}

    </section>
  </>
  )
};

export default Weather;

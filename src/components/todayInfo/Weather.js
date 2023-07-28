import React, { useEffect, useState } from "react";
import './TodayInfo.scss';
import '../../Custom.scss';
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'; //날씨 맑음
import WbCloudyIcon from '@mui/icons-material/WbCloudy';  //날씨 구름
import UmbrellaIcon from '@mui/icons-material/Umbrella';  //날씨 비... 가 없다. 대신 우산.
import AcUnitIcon from '@mui/icons-material/AcUnit';      //날씨 눈
// mui 아이콘 > 끝!
import { json } from "react-router-dom";
import { ENCODING_KEY, WMCODE_KEY } from '../../config/key-config';




/*
  할 일...
  1. 아이콘 출력하기 (날씨에 따라 1~4로 구분해서 배열을 만들어놨으나 출력이 어려움...)
  2. 데이터 한번만 불러와서 저장하게 하기 (지금 렌더링 한 번당 배열을 1200개 불어옴)
  3. .........디자인과 출력 기타 등등 페이지 완성 필요
*/



const Weather = () => {

  const [loading, setLoading] = useState(true);

  const [stateTemp, setStateTemp] = useState()
  const [stateSkyList, setStateSkyList] = useState()

  const [weatherIcon, setWeatherIcon] = useState([<WbSunnySharpIcon />, <WbCloudyIcon />, <UmbrellaIcon />, <AcUnitIcon />]);
  // const [weatherIconNum, setWeatherIconNum] = useState([0,0,0,0,0,0]);



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

  useEffect(async () => {

    //일통계 조회
    

      const stYmd = getDate(0).dateString; //오늘 날짜
      const stYesterdayYmd = getDate(-1).dateString; //어제 날짜 확인용 (오늘)
      // const $stTime = (getDate(-plusDay).time-1)+'00';
      const stTime = '0500';
      let nX = '59';
      let nY = '126';
      
      console.log('\n\n 오늘 날짜: '+stYmd);
      
      
      //실황
      // const resRealTime = await fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey='+ENCODING_KEY
      //  +'&numOfRows=10&pageNo=1&dataType=JSON&base_date='+stYmd+'&base_time='+stTime+'&nx='+nX+'&ny='+nY)
      // const data = await resRealTime.json();
      // console.log('data: ', data);
      // const temp = data.response.body.items.item[3].obsrValue;
      // console.log('현재기온: ', temp);
      // const dd = document.querySelector('.weather.D0 > .temp > span');
      // dd.textContent = temp+'℃';


      //단기예보 
      const resWeather = await fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey='+ENCODING_KEY
        +'&numOfRows=1000&pageNo=1&dataType=JSON&base_date='+stYmd+'&base_time='+stTime+'&nx='+nX+'&ny='+nY);
      const resYesterWeather = await fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey='+ENCODING_KEY
        +'&numOfRows=400&pageNo=1&dataType=JSON&base_date='+stYesterdayYmd+'&base_time='+stTime+'&nx='+nX+'&ny='+nY);
        
      const data = await resWeather.json();
      const data2 = await resYesterWeather.json();

      if(data.response.header.resultCode !== '00'){ //정상처리되지 않았을 경우
        console.log('잘못된 요청입니다.');
        return;
      }

      const itemList = data.response.body.items.item;
      const itemList2 = data2.response.body.items.item;

      // 최고, 최저온도 구하기
      const temps = itemList.filter(it => it.category == 'TMN' || it.category == 'TMX');
      const temp = temps.map(it => it.fcstValue);
      itemList2.forEach(it => {  //오늘 최저기온 구하기 1
        if(it.category == 'TMN'){
          temp.unshift(it.fcstValue);
          return;
        }
      });

      // 사흘간 날씨(구름 소식) 구하기 (오전 오후 6시 기준)
      const skys = itemList.filter(it => it.category == 'SKY' && (it.fcstTime == '0600' || it.fcstTime == '1800' ))
      const skyCode = skys.map(it => it.fcstValue);

      //사흘간 날씨(비 소식) 구하기22 (오전 오후 6시 기준)
      const rains = itemList.filter(it => it.category == 'PTY' && (it.fcstTime == '0600' || it.fcstTime == '1800' ))
      const rainCode = rains.map(it => it.fcstValue);



      // 맑음0, 흐림1, 비2, 눈3으로 숫자 통일
      const skyRainList = []
      let count = 0;
      skyCode.forEach(sc => {
        let state = 0 //상태저장
        if(sc == 3 || sc == 4){ state = 1 }
        
        if(rainCode[count] == 3 || rainCode[count] == 7) state = 3;
        else if(rainCode[count] > 0) state = 2;

        skyRainList.push(state);
        count++;
      });

      console.log('날씨코드:', skyCode, '비 여부 코드:', rainCode);
      console.log('어제, 오늘, 내일 날씨 코드: ', skyRainList);
      console.log('어제, 오늘, 내일의 최저/최고 온도: ', temp);

      setStateSkyList(skyRainList);
      setStateTemp(temp);
      
      // localStorage.setItem('tempData', temp);
      // localStorage.setItem('skyData', skyRainList);
      // console.log(localStorage.getItem('tempData'));
      // console.log(localStorage.getItem('skyData'));

    //로딩 완료
    setLoading(false)

  }, [])

  const loadingPage = (
    <div id="loading">
      <h2>로딩창 로고 이용한 gif로 교체하고싶다</h2>
      <img id="loadingElement" 
          src="https://cdn-icons-png.flaticon.com/512/189/189768.png"/>
    </div>   
  )

  return(
  <>
    { loading ? loadingPage : 
    <section className='weather-box'>
        <div className='title'><h2>서울<br/>날씨</h2></div>

        <div className='weather D0'>
          <div>
            <div className='day'><h3>오늘</h3><span>{getDate(0).month}/{getDate(0).day} {getDate(0).dayName}</span></div>
            <div className='icon'>
              <span className='am'>오전</span> <i>{weatherIcon[stateSkyList[0]]}</i>
              <span className='pm'>오후</span> <i>{weatherIcon[stateSkyList[1]]}</i>
            </div>
          </div>
          <div className='temp'>
            <span>{stateTemp[0]}℃</span> <hr/> <span>{stateTemp[1]}℃</span>
          </div>
        </div> {/* weather D-0 END */}
        
        <div className='weather D1'>
          <div>
            <div className='day'><h3>내일</h3><span>{getDate(1).month}/{getDate(1).day} {getDate(1).dayName}</span></div>
            <div className='icon'>
              <span className='am'>오전</span>  <i>{weatherIcon[stateSkyList[2]]}</i>
              <span className='pm'>오후</span>  <i>{weatherIcon[stateSkyList[3]]}</i>
            </div>
          </div>
          <div className='temp'>
            <span>{stateTemp[2]}℃</span> <hr/> <span>{stateTemp[3]}℃</span>
          </div>
        </div> {/* weather D+1 END */}

        <div className='weather D2'>
          <div>
            <div className='day'><h3>모레</h3><span>{getDate(2).month}/{getDate(2).day} {getDate(2).dayName}</span></div>
            <div className='icon'>
              <span className='am'>오전</span> <i>{weatherIcon[stateSkyList[4]]}</i>
              <span className='pm'>오후</span> <i>{weatherIcon[stateSkyList[5]]}</i>
            </div>
          </div>
          <div className='temp'>
            <span>{stateTemp[4]}℃</span> <hr/> <span>{stateTemp[5]}℃</span>
          </div>
        </div> {/* weather D+2 END */}

    </section>
    }
  </>
  )
};

export default Weather;

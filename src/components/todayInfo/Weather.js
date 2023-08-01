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
import { ENCODING_KEY, WMCODE_KEY } from '../../config/key-config';
import { loadingPage } from "../util/Loading-util";


/*
  할 일...
  2. 데이터 한번만 불러와서 저장하게 하기 (지금 렌더링 한 번당 배열을 1200개 불어옴)
*/


const Weather = ({temp, sky}) => {

  // console.log('props로 들어온 값: ', temp,'     ',  sky);

  const [loading, setLoading] = useState(true);

  const [stateTemp, setStateTemp] = useState(temp)
  const [stateSkyList, setStateSkyList] = useState(sky)

  const [weatherIcon, setWeatherIcon] = useState([<WbSunnySharpIcon />, <WbCloudyIcon />, <UmbrellaIcon />, <AcUnitIcon />]);


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


  return(
    <>
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
    
  </>
  )
};

export default Weather;

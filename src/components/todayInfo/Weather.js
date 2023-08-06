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
import { loadingPage, loadingSmallPage } from "../util/Loading-util";


const Weather = ({temp, sky, placeNum}) => {

  // console.log('props로 들어온 값: ', temp,'     ',  sky);

  const [loading, setLoading] = useState(true);

  const [stateTemp, setStateTemp] = useState(temp)
  const [stateSkyList, setStateSkyList] = useState(sky)
  console.log('state 값 확인: ', stateTemp, stateSkyList);

  const weatherIcon = [<WbSunnySharpIcon />, <WbCloudyIcon />, <UmbrellaIcon />, <AcUnitIcon />];
  const weatherImage = ['weatherIcons_sun.gif', 'weatherIcons_cloud.gif', 'weatherIcons_rain.gif', 'weatherIcons_snow.gif'];
  const placeName = [ //목록 등록
    '강릉', '광주', '대구', '대전', '목포'
    , '부산', '서울', '수원', '안동', '여수'
    , '울릉', '울산', '전주', '제주', '천주'
    , '춘천'
  ]


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
    {/* { loading ? loadingPage :  */}
    <section className='weather-box'>
        <div className='title'><h2>{placeName[placeNum-1]}<br/>날씨</h2></div>

        <div className='weather D0'>
          <div>
            <div className='day'><h3>오늘</h3><span>{getDate(0).month}/{getDate(0).day} {getDate(0).dayName}</span></div>
            <div className='icon'>
              <span className='am'>오전</span> <i><img src={require(`../../image/${weatherImage[stateSkyList[0]]}`)} alt="weather icon" /></i>
              <span className='pm'>오후</span> <i><img src={require(`../../image/${weatherImage[stateSkyList[1]]}`)} alt="weather icon" /></i>
            </div>
          </div>
          <div className='temp'>
            <span>{stateTemp[0]}˚</span> <hr/> <span>{stateTemp[1]}˚</span>
          </div>
        </div> {/* weather D-0 END */}
        
        <div className='weather D1'>
          <div>
            <div className='day'><h3>내일</h3><span>{getDate(1).month}/{getDate(1).day} {getDate(1).dayName}</span></div>
            <div className='icon'>
              <span className='am'>오전</span>  <i><img src={require(`../../image/${weatherImage[stateSkyList[2]]}`)} alt="weather icon" /></i>
              <span className='pm'>오후</span>  <i><img src={require(`../../image/${weatherImage[stateSkyList[3]]}`)} alt="weather icon" /></i>
            </div>
          </div>
          <div className='temp'>
            <span>{stateTemp[2]}˚</span> <hr/> <span>{stateTemp[3]}˚</span>
          </div>
        </div> {/* weather D+1 END */}

        <div className='weather D2'>
          <div>
            <div className='day'><h3>모레</h3><span>{getDate(2).month}/{getDate(2).day} {getDate(2).dayName}</span></div>
            <div className='icon'>
              <span className='am'>오전</span> <i><img src={require(`../../image/${weatherImage[stateSkyList[4]]}`)} alt="weather icon" /></i>
              <span className='pm'>오후</span> <i><img src={require(`../../image/${weatherImage[stateSkyList[5]]}`)} alt="weather icon" /></i>
            </div>
          </div>
          <div className='temp'>
            <span>{stateTemp[4]}˚</span> <hr/> <span>{stateTemp[5]}˚</span>
          </div>
        </div> {/* weather D+2 END */}

    </section>
   {/* } */}
  </>
  )
};

export default Weather;

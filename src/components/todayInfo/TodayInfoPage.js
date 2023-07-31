import React, { useState } from 'react'
import './TodayInfo.scss';
import '../../Custom.scss';
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'; //날씨 맑음
import WbCloudyIcon from '@mui/icons-material/WbCloudy';  //날씨 구름
import UmbrellaIcon from '@mui/icons-material/Umbrella';  //날씨 비... 가 없다. 대신 우산.
import AcUnitIcon from '@mui/icons-material/AcUnit';      //날씨 눈
// mui 아이콘 > 끝!
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { } from '@mui/base';

const TodayInfoPage = () => {

  const location = useLocation();
  
  const [stateTemp, setStateTemp] = useState(location.state.temp)
  const [stateSkyList, setStateSkyList] = useState(location.state.sky)

  const [weatherIcon, setWeatherIcon] = useState([<WbSunnySharpIcon />, <WbCloudyIcon />, <UmbrellaIcon />, <AcUnitIcon />]);
  const [weatherTypo, setWeatherTypo] = useState(['맑음', '흐림', '비', '눈']);

  const [place, setPlace] = useState('');

   // 오늘의 정보 -> 날짜 정보 구하기 
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



  const PlaceChangeHandle = function(e) {
    setPlace(e.target.value);
    console.log('select로 장소를 선택. place: ', e.target.value);
  }




  return (
    <>
      <div className='contain info-box'>
        <div className="sub-link">
          <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
          <span style={{cursor: 'pointer'}}>오늘의 정보</span> <span> &gt; </span> 
          <span style={{cursor: 'pointer'}}>날씨</span>
        </div>
        <h1 className='title'>날씨 정보</h1>
        <section className='info-box weather'>
        
          <div className='location-tap'>
            <span className='title'><PlaceIcon /> 위치</span>
            <FormControl fullWidth sx={{m:1, maxWidth: 600}}>
              <InputLabel shrink id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="place-select"
                value={place || ''}
                fullWidth
                label=""
                onChange={PlaceChangeHandle}
              >
                <MenuItem value={'92 130'}>강릉</MenuItem>
                <MenuItem value={'59 74'}>광주광역시</MenuItem>
                <MenuItem value={'89 90'}>대구광역시</MenuItem>
                <MenuItem value={'67 100'}>대전광역시</MenuItem>
                <MenuItem value={'50 66'}>목포</MenuItem>
                <MenuItem value={'00 00'}>백령</MenuItem>
                <MenuItem value={'98 75'}>부산광역시</MenuItem>
                <MenuItem value={'59 126'}>서울특별시</MenuItem>
                <MenuItem value={'61 120'}>수원시</MenuItem>
                <MenuItem value={'91 107'}>안동시</MenuItem>
                <MenuItem value={'74 65'}>여수시</MenuItem>
                <MenuItem value={'127 127'}>울릉</MenuItem>
                <MenuItem value={'102 84'}>울산광역시</MenuItem>
                <MenuItem value={'63 89'}>전주</MenuItem>
                <MenuItem value={'51 38'}>제주특별자치도</MenuItem>
                <MenuItem value={'69 106'}>청주시</MenuItem>
                <MenuItem value={'73 134'}>춘천시</MenuItem>
              </Select>
            </FormControl>
          </div> {/* .location-tap END  */}
          
          <div className='weather-screens'>
            <div className='today'>
              <div className='text'>
                <h6 className='place'> <PlaceIcon /> 어디어디 </h6>
                <h4 className='temp-on'>{stateTemp[1]}˚</h4>
                <h5>{weatherTypo[stateSkyList[1]]}</h5>
              </div>
              <div className='icon'>
              {weatherIcon[stateSkyList[1]]}
              </div>
            </div>

            <div className='D1-D2'>
              <div className='D1'>
                <p className='Num-date'>{("00"+getDate(1).month).slice(-2)}/{("00"+getDate(1).day).slice(-2)}</p>
                <p className='kor-date'>내일</p>
                <p className='icon-date'>{weatherIcon[stateSkyList[2]]} {weatherIcon[stateSkyList[3]]}</p>
                <p className='text-date'><span>{stateTemp[2]}˚</span>&nbsp;&nbsp;<span>{stateTemp[3]}˚</span></p>
              </div>
              <div className='D2'>
                <p className='Num-date'>{("00"+getDate(2).month).slice(-2)}/{("00"+getDate(2).day).slice(-2)}</p>
                <p className='kor-date'>모레</p>
                <p className='icon-date'>{weatherIcon[stateSkyList[4]]} {weatherIcon[stateSkyList[5]]}</p>
                <p className='text-date'><span>{stateTemp[4]}˚</span>&nbsp;&nbsp;<span>{stateTemp[5]}˚</span></p>
              </div>
            </div>

          </div> {/* weather-screens END */}
        </section>
      </div>
    </>
  )
}

export default TodayInfoPage;
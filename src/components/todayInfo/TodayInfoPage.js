import React, { useState } from 'react'
import './TodayInfo.scss';
import '../../Custom.scss';
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'; //날씨 맑음
import WbCloudyIcon from '@mui/icons-material/WbCloudy';  //날씨 구름
import UmbrellaIcon from '@mui/icons-material/Umbrella';  //날씨 비... 가 없다. 대신 우산.
import AcUnitIcon from '@mui/icons-material/AcUnit';      //날씨 눈
// mui 아이콘 > 끝!
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { StartFunction } from '../util/WeatherFuntion';
import { loadingPage, loadingSmallPage } from "../util/Loading-util";
import { WeatherPlace } from '../util/WeatherPlace';


const TodayInfoPage = () => {

  const location = useLocation();
  const redirection = useNavigate();
  if(!!location.state){
    alert('오늘의 정보 페이지는 Home 페이지를 통해서만 접근할 수 있습니다.');
    redirection('/');
  }
  
  const [loading, setLoading] = useState(false);
  
  const [stateTemp, setStateTemp] = useState(location.state.temp)
  const [stateSkyList, setStateSkyList] = useState(location.state.sky)
  
  const [place, setPlace] = useState(WeatherPlace.place7); //서울이 기본값

  const [weatherIcon, setWeatherIcon] = useState([<WbSunnySharpIcon />, <WbCloudyIcon />, <UmbrellaIcon />, <AcUnitIcon />]);
  const [weatherImage, setWeatherImage] = useState(['weatherIcons_sun.gif', 'weatherIcons_cloud.gif', 'weatherIcons_rain.gif', 'weatherIcons_snow.gif']);
  const [weatherMainImage, setWeatherMainImage] = useState(['mainIcons_sun.gif', 'weatherIcons_cloud.gif', 'weatherIcons_rain.gif', 'weatherIcons_snow.gif']);
  const [weatherTypo, setWeatherTypo] = useState(['맑음', '흐림', '비', '눈']);



  const [selPlaceNum, setSelPlaceNum] = useState('7');
  const placeName = [ //목록 등록
    '강릉', '광주광역시', '대구광역시', '대전광역시', '목포'
    , '부산광역시', '서울특별시', '수원시', '안동시', '여수시'
    , '울릉', '울산광역시', '전주', '제주특별자치도', '천주시'
    , '춘천시'
  ]



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
  }  // getDate END 



  //select 선택마다 Place 미리 세팅
  const PlaceChangeHandle = function(e) {
    setPlace((e.target.value).split(" ")); 
    document.querySelector('.search-complete').style.opacity = 0;
    document.querySelector('.search-complete').style.padding = '5px 30px 5px 120px';
  }
  
  //서치버튼 클릭 이벤트
  const searchClickEvent = function() {

    setLoading(true);
    
    console.log('\n\n버튼이 클릭됨! place: ',place);
    const weatherData = StartFunction(place[1], place[2], 'place'+place[0]);

    console.log('버튼 클릭시 null인지 아닌지 확인', localStorage.getItem('place'+place[0])); 
    console.log('weatherData: ', weatherData);

    weatherData.then(data => {
      console.log('data: ', data);
      setStateTemp(data.temp);
      setStateSkyList(data.sky);
      setSelPlaceNum(place[0])

      //로딩 완료
      if(data) {
        setLoading(false);
        document.querySelector('.search-complete').style.opacity = 1;
        document.querySelector('.search-complete').style.padding = '5px 12px';
      }
    })

  }



  return (
    <>
      { loading ? loadingSmallPage : '' }
      <div className='contain info-box'>
        <div className="sub-link">
          <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
          <span style={{cursor: 'pointer'}}>오늘의 정보</span> <span> &gt; </span> 
          <span style={{cursor: 'pointer'}}>날씨</span>
        </div>
        <h1 className='title'>날씨 정보</h1>
        <section className='info-box weather'>
        
          <div className='location-tap'>
            <span className='title'><PlaceIcon />위치</span>
            <FormControl fullWidth sx={{m:1, maxWidth: 600, minWidth: 100 }}>
              <InputLabel shrink id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="place-select"
                value={place[0]+' '+place[1]+' '+place[2] || ''}
                fullWidth
                label=""
                onChange={PlaceChangeHandle}
              >
                <MenuItem value={'1 92 130'}>{placeName[0]}</MenuItem>
                <MenuItem value={'2 59 74'}>{placeName[1]}</MenuItem>
                <MenuItem value={'3 89 90'}>{placeName[2]}</MenuItem>
                <MenuItem value={'4 67 100'}>{placeName[3]}</MenuItem>
                <MenuItem value={'5 50 66'}>{placeName[4]}</MenuItem>
                <MenuItem value={'6 98 75'}>{placeName[5]}</MenuItem>
                <MenuItem value={'7 59 126'}>{placeName[6]}</MenuItem>
                <MenuItem value={'8 61 120'}>{placeName[7]}</MenuItem>
                <MenuItem value={'9 91 107'}>{placeName[8]}</MenuItem>
                <MenuItem value={'10 74 65'}>{placeName[9]}</MenuItem>
                <MenuItem value={'11 127 127'}>{placeName[10]}</MenuItem>
                <MenuItem value={'12 102 84'}>{placeName[11]}</MenuItem>
                <MenuItem value={'13 63 89'}>{placeName[12]}</MenuItem>
                <MenuItem value={'14 51 38'}>{placeName[13]}</MenuItem>
                <MenuItem value={'15 69 106'}>{placeName[14]}</MenuItem>
                <MenuItem value={'16 73 134'}>{placeName[15]}</MenuItem>
              </Select>
            </FormControl>
            <Button 
              id='searchBtn'
              variant="secondary"
              onClick={searchClickEvent}
            >
              <TravelExploreIcon />
            </Button>
            
          </div> {/* .location-tap END  */}
          
          <div className='weather-screens'>
            <h3 className='search-complete'>검색이 완료되었습니다 &nbsp; ✔</h3>
            <div className='today'>
              <div className='text'>
                <h6 className='place'> <PlaceIcon /> {placeName[(selPlaceNum)-1]} </h6>
                <h4 className='temp-on'>{stateTemp[0]}˚ {stateTemp[1]}˚</h4>
                <h5> {weatherTypo[stateSkyList[0]]} <span style={{color:'lightGray'}}>/</span> {weatherTypo[stateSkyList[1]]}</h5>
              </div>
              <div className='icon'>
                <img src={require(`../../image/${weatherMainImage[stateSkyList[0]]}`)} alt="main weather icon" />
              </div>
            </div>

            <div className='D1-D2'>
              <div className='D1'>
                <p className='Num-date'>{("00"+getDate(1).month).slice(-2)}/{("00"+getDate(1).day).slice(-2)}</p>
                <p className='kor-date'>내일</p>
                <p className='icon-date'>
                  <img src={require(`../../image/${weatherImage[stateSkyList[2]]}`)} alt="weather icon" />
                  <img src={require(`../../image/${weatherImage[stateSkyList[3]]}`)} alt="weather icon" />
                </p>
                <p className='text-date'><span>{stateTemp[2]}˚</span>&nbsp;&nbsp;<span>{stateTemp[3]}˚</span></p>
              </div>
              <div className='D2'>
                <p className='Num-date'>{("00"+getDate(2).month).slice(-2)}/{("00"+getDate(2).day).slice(-2)}</p>
                <p className='kor-date'>모레</p>
                <p className='icon-date'>
                  <img src={require(`../../image/${weatherImage[stateSkyList[4]]}`)} alt="weather icon" />
                  <img src={require(`../../image/${weatherImage[stateSkyList[5]]}`)} alt="weather icon" />
                </p>
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
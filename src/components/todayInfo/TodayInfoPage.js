import React, { useEffect, useState } from 'react'
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
import { StartFunction, WrnInfoFunction } from '../util/WeatherFuntion';
import { loadingPage, loadingSmallPage } from "../util/Loading-util";
import { WeatherPlace } from '../util/WeatherPlace';


const TodayInfoPage = () => {

  const location = useLocation();
  const redirection = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  
 
  const [stateTemp, setStateTemp] = useState(location.state.temp)
  const [stateSkyList, setStateSkyList] = useState(location.state.sky)
  
  const [place, setPlace] = useState(WeatherPlace.place7); //서울이 기본값
  const [selPlaceNum, setSelPlaceNum] = useState('7');
  const placeName = [ //목록 등록
    '강릉', '광주광역시', '대구광역시', '대전광역시', '목포'
    , '부산광역시', '서울특별시', '수원시', '안동시', '여수시'
    , '울릉', '울산광역시', '전주', '제주특별자치도', '천주시'
    , '춘천시'
  ]

  const weatherIcon = [<WbSunnySharpIcon />, <WbCloudyIcon />, <UmbrellaIcon />, <AcUnitIcon />];
  const weatherImage = ['weatherIcons_sun.gif', 'weatherIcons_cloud.gif', 'weatherIcons_rain.gif', 'weatherIcons_snow.gif'];
  const weatherMainImage = ['mainIcons_sun.gif', 'weatherIcons_cloud.gif', 'weatherIcons_rain.gif', 'weatherIcons_snow.gif'];
  const weatherTypo = ['맑음', '흐림', '비', '눈'];

  const [wrnItemList, setWrnItemList] = useState({
    // title: '',
    // t2: '',
    // t3: '',
    // t4: '',
    // time: '',
    t6: null,
    // t7: '',
  });



  //temp가 없으면 위에서 에러가 터져서 접근이 안됨 + if문을 위에 놓으면 useState가 작동이 안됨
  if(!location.state.temp){
    alert('오늘의 정보 페이지는 Home 페이지를 통해서만 접근할 수 있습니다.');
    redirection('/market');
    return;
  }

 

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



  // ////// select 선택마다 Place 미리 세팅
  const PlaceChangeHandle = function(e) {
    setPlace(e.target.value); 
    document.querySelector('.search-complete').style.opacity = 0;
    document.querySelector('.search-complete').style.padding = '5px 30px 5px 120px';
  }
  
  // //// 서치버튼 클릭 이벤트
  const searchClickEvent = function() {
    
    setLoading(true);


    console.log('\n\n버튼이 클릭됨! place: ', place);

    const weatherData = StartFunction(place[1], place[2], 'place'+place[0]);
    const wrnItem = WrnInfoFunction(place[3]);

    weatherData.then(data => {
      setStateTemp(data.temp);
      setStateSkyList(data.sky);
      setSelPlaceNum(place[0])

      //로딩 완료
      if(data) { 
        setLoading(false);
        document.querySelector('.search-complete').style.opacity = 1;
        document.querySelector('.search-complete').style.padding = '5px 12px'; 
        document.getElementById('wrn-text').style.opacity = 1;
      }
    })

    wrnItem.then(res => {
      if(!res){
        console.log('특보 검색 fetch문이 null로 돌아옴.');
        setWrnItemList({ t6: null })
        return;
      } else {
        // 'o '를 토대로 배열로 끊은 뒤, 각 배열 당OO주의보 등의 단어만 추출.
        const t6 = []
        res.substring(2).split('o ').forEach(t => { 
          t6.push(t.substring(0, t.indexOf(':')-1))
        });
        setWrnItemList({t6: t6})
      }

      if(res) { 
        setLoading2(false);
       }
    }); 


  } // 서치 클릭 이벤트 종료!



  return (
    <>
      { loading || loading2 ? loadingSmallPage : '' }
      <div className='contain info-box'>
        <div className="sub-link">
          <Link to="/"><HomeIcon/></Link> <span> &gt; </span> 
          <span style={{cursor: 'pointer'}}>오늘의 날씨</span>
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
                value={place}
                fullWidth
                label=""
                onChange={PlaceChangeHandle}
              >
                <MenuItem value={WeatherPlace.place1}>{placeName[0]}</MenuItem>
                <MenuItem value={WeatherPlace.place2}>{placeName[1]}</MenuItem>
                <MenuItem value={WeatherPlace.place3}>{placeName[2]}</MenuItem>
                <MenuItem value={WeatherPlace.place4}>{placeName[3]}</MenuItem>
                <MenuItem value={WeatherPlace.place5}>{placeName[4]}</MenuItem>
                <MenuItem value={WeatherPlace.place6}>{placeName[5]}</MenuItem>
                <MenuItem value={WeatherPlace.place7}>{placeName[6]}</MenuItem>
                <MenuItem value={WeatherPlace.place8}>{placeName[7]}</MenuItem>
                <MenuItem value={WeatherPlace.place9}>{placeName[8]}</MenuItem>
                <MenuItem value={WeatherPlace.place10}>{placeName[9]}</MenuItem>
                <MenuItem value={WeatherPlace.place11}>{placeName[10]}</MenuItem>
                <MenuItem value={WeatherPlace.place12}>{placeName[11]}</MenuItem>
                <MenuItem value={WeatherPlace.place13}>{placeName[12]}</MenuItem>
                <MenuItem value={WeatherPlace.place14}>{placeName[13]}</MenuItem>
                <MenuItem value={WeatherPlace.place15}>{placeName[14]}</MenuItem>
                <MenuItem value={WeatherPlace.place16}>{placeName[15]}</MenuItem>
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
                <h5> 
                <span className='h5-sv'>오전</span> {weatherTypo[stateSkyList[0]]} <span style={{color:'lightGray'}}>/&nbsp;</span> 
                <span className='h5-sv'>오후</span> {weatherTypo[stateSkyList[1]]}
                </h5>
                <p id='wrn-text'>
                  {wrnItemList.t6 ? 
                    <><span className='wrnIcon'>⚠</span> 
                    현재 <span className='wrnText'>{(wrnItemList.t6.map(t => t+' '))}</span>가 내린 지역입니다.</>
                  :
                    <><span className='wrnIcon'>⚠</span> 
                    현재 {placeName[(selPlaceNum)-1]}에 내린 특보가 없습니다.</>
                  }
                </p>
              </div>
              <div className='icon'>
                <img 
                  src={require(`../../image/${weatherMainImage[stateSkyList[(getDate(0).time < 12 ? 0 : 1 )]]}`)} 
                  alt="main weather icon" />
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
import React, { useState, useEffect } from 'react'
import './Home.scss';
import '.././Custom.scss';
// mui 아이콘 > 시작
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'; //날씨 맑음
import WbCloudyIcon from '@mui/icons-material/WbCloudy';  //날씨 구름
import UmbrellaIcon from '@mui/icons-material/Umbrella';  //날씨 비... 가 없다. 대신 우산.
import AcUnitIcon from '@mui/icons-material/AcUnit';      //날씨 눈
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import StorefrontIcon from '@mui/icons-material/Storefront';  //마켓(판매자) 아이콘
// mui 아이콘 > 끝!
// Link용 js파일 > 시작
import HomeTableBody from './HomeTableBody';
import HomeMarketBody from './HomeMarketBody';
import SnsBoardCarousel from './SnsBoardCarousel';
import Weather from './todayInfo/Weather';
// Link용 js파일 > 끝!
import { Button, Stack, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginUserInfo } from './util/login-utils';
import { API_BASE_URL } from '../config/host-config';
import { loadingPage } from "./util/Loading-util";
import { ENCODING_KEY } from '../config/key-config';


const Home = () => {

  const redirection = useNavigate();
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰


  const [boardList, setBoardList] = useState([]);
  const [data, setData] = useState({
    boards: [],
    totalPages: 0,
  });


  const [stateTemp, setStateTemp] = useState()
  const [stateSkyList, setStateSkyList] = useState()


  useEffect(() => {
    const fetchBoardsByPage = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/board`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log('API 응답 데이터:', data);
        setData({
          boards: data.boards.slice(0, 5), // 5개까지만 끊어서 저장
          totalPages: data.length,
        });
      } catch (error) {
        console.error('게시글 목록을 불러오는 중 에러 발생:', error);
      }
    };

    fetchBoardsByPage();
  }, [token]);



  const [marketList, setMarketList] = useState([]);
  useEffect(() => {

    const requestHeader = {
      // 'content-type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    };

    fetch(`${API_BASE_URL}/api/market?page=1&size=8`, {
      headers : requestHeader
    })
    .then(res => {
      if(!res.ok) {
        if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
        else alert('로딩 중 문제가 발생하였습니다. 관리자에게 문의바랍니다.')
        redirection('/');
        return;
      }
  
      res.json().then(data => { 
        setMarketList(data.marketItems);
      })
    })

    //로딩 완료함!
    setLoading(false)
    
  }, []) //useEffect END




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

  //조회 후 코드 시작 
  useEffect(() => {  StartFunction();  }, [])
  const StartFunction = async() => {
    

    //만약 이미 오늘의 값을 구했다면 fetch문이 또 발동하지 않도록 처리.
    if(localStorage.getItem('skyData') && localStorage.getItem('tempData')){
      //문자열 리턴이라 다시 배열에 담아주어야 함.
      setStateSkyList(localStorage.getItem('skyData').split(",")); 
      setStateTemp(localStorage.getItem('tempData').split(","));
      setWeatherLoading(false);
      return;
    }
    

    /////////////////일통계 조회 시작!!

    const stYmd = getDate(0).dateString; //오늘 날짜
    const stYesterdayYmd = getDate(-1).dateString; //어제 날짜 확인용 (오늘)
    const stTime = '0500';
    let nX = '59'; //서울 좌표
    let nY = '126';
    
    
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
    const temps = itemList.filter(it => it.category === 'TMN' || it.category === 'TMX');
    const temp = temps.map(it => it.fcstValue.replace('.0', ''));
    itemList2.forEach(it => {  //오늘 최저기온 구하기 1
      if(it.category == 'TMN'){
        temp.unshift(it.fcstValue.replace('.0', ''));
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

    console.log('어제, 오늘, 내일 날씨 코드: ', skyRainList);
    console.log('어제, 오늘, 내일의 최저/최고 온도: ', temp);

    setStateSkyList(skyRainList);
    setStateTemp(temp);
    localStorage.setItem('tempData', temp);
    localStorage.setItem('skyData', skyRainList);

    //로딩 완료
    setWeatherLoading(false);

  }





  return (
    <>
    { loading && weatherLoading ? loadingPage : 
      <div className='container home'>
        <div className="sub-link">
          <Link to="/"></Link>
        </div>

        {/* <Link to='/pest'>Pest 이동</Link> */}

        {/* 날씨 박스 */}
          <Weather temp={stateTemp} sky={stateSkyList}/>
          
          <section className='button-box'>
            <Link to='/todayInfo' 
                  state={{ 
                    temp: stateTemp, 
                    sky: stateSkyList,
                   }}
              ><Button variant="success">오늘의 정보</Button></Link>
            <Link to='/board'><Button variant="success">게시판</Button></Link>
            <Link to='/snsBoard'><Button variant="success">농사일기</Button></Link>
            <Link to='/market'><Button variant="success">거래장터</Button></Link>
          </section>

          <section className='small-board'>
            <h2>게시판</h2>
            <Table bordered hover border={1} className='mini-table' >
              <thead>
                <tr>
                  <th>말머리</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th >조회</th>
                </tr>
              </thead>
              <tbody> {/* 본문 내용 */}
              {!!data.boards && data.boards.map((row) => (
                <tr
                  style={
                    row.category === "NOTICE"
                      ? { backgroundColor: "gainsboro" }
                      : { backgroundColor: "none" }
                  }
                  key={row.boardNo}
                >
                  <td className="td">
                    <div
                      style={
                        row.category === "NOTICE"
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {row.category === "INFORMATION" && "정보"}
                      {row.category === "FREE" && "자유"}
                    </div>
                    <div
                      className="notice-box"
                      style={
                        row.category === "NOTICE"
                          ? { display: "block", color: "red" }
                          : { display: "none" }
                      }
                    >
                      {row.category === "NOTICE" && "공지"}
                    </div>
                  </td>
                  <td
                    className="td td-title"
                    style={
                      row.category === "NOTICE"
                        ? { color: "red", fontWeight: "bold" }
                        : { color: "black" }
                    }
                    onClick={() => {
                      const token = localStorage.getItem('ACCESS_TOKEN');
                      if (token) {
                        // 사용자가 로그인한 상태인 경우, 게시판 페이지로 이동합니다.
                        redirection(`/board/${row.boardNo}`);
                      } else {
                        // 사용자가 로그인하지 않은 상태인 경우, 경고창을 보여줍니다.
                        alert('로그인이 필요한 서비스입니다.');
                      }
                    }}
                  >
                    {row.title}
                  </td>
                  <td className="td">{row.userNick}</td>
                  <td className="td">{row.createDate}</td>
                  <td className="td">{row.views}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </section>

          <section className='small-snsBoard'>
            <h2>농사일기</h2>
            <div className='img-list'>
              <div className='arrow'><ArrowCircleUpIcon /></div> {/* 아이콘 바꾸고 싶다 */}
              {/* { imgs.map(i => <SnsBoardCarousel imgs={i}/>) } */}
              <figure><img src="https://qi-o.qoo10cdn.com/goods_image_big/7/6/3/4/7297927634_l.jpg" alt="농작물 사진" /></figure>
              <figure><img src="https://qi-o.qoo10cdn.com/goods_image_big/7/6/3/4/7297927634_l.jpg" alt="농작물 사진" /></figure>
              <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2g4cD2YDqeomQJ4Jg0hSv9B8aX9jq2aooOZPIMyWQDS7CHrdQ9vHfEZaEqGwhDIAol1c&usqp=CAU" alt="농작물 사진" /></figure>
              <div className='arrow'><ArrowCircleUpIcon /></div>
            </div>
          </section>

          <section className='small-market'>
            <h2>거래장터</h2>
            <div className='market-group' >
              { marketList.map(ma =><HomeMarketBody market={ma}/>) }
            </div> {/* market-group END */}
            <div className="link-box">
              <Link to="/market">
                <Button className="more-market-btn" variant="success">
                  <StorefrontIcon />거래품목 더 보러가기 &gt;
                </Button>
              </Link>
            </div>
          </section>


      </div>
    }
    </>
  )
}

export default Home
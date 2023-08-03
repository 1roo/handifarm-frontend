import { ENCODING_KEY } from '../../config/key-config';

let weatherData = {};

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


//날씨 fetch 날리기 함수
export const StartFunction = async(nX, nY, place) => {
    
  // console.log('똑똑 값이 있나요.getItem: place', JSON.parse(localStorage.getItem(place)));

  //만약 이미 오늘의 값을 구했다면 fetch문이 또 발동하지 않도록 처리.
  if(JSON.parse(localStorage.getItem(place))){ 
    console.log('이미 등록된 데이터입니다.');
    console.log(JSON.parse(localStorage.getItem(place)));

    //문자열 리턴이라 다시 배열에 담아주어야 함.
    weatherData ={ 
      temp: JSON.parse(localStorage.getItem(place)).temp, 
      sky: JSON.parse(localStorage.getItem(place)).sky 
    };
    console.log('function 진행중 weatherData: ', weatherData);
    // localStorage.setItem(place, JSON.stringify(weatherData)); //가져온 데이터로 다시 등록해주기
  } else{

    /////////////////일통계 조회 시작!!
    const stYmd = getDate(0).dateString; //오늘 날짜
    const stYesterdayYmd = getDate(-1).dateString; //어제 날짜 확인용 (오늘)
    const stTime = '0500';
    
  
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
  
    console.log('fetch문 끝: ', temp, skyRainList);
  
  
    weatherData ={ temp: temp, sky: skyRainList };
    localStorage.setItem(place, JSON.stringify(weatherData));
    
  }
  
  return weatherData;

}




export const WrnInfoFunction = async(stPlace) => {

  const stYmd = getDate(0).dateString; //오늘 날짜
  const wrnFetch = await fetch(
    'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg?serviceKey='+ENCODING_KEY
    +'&numOfRows=10&pageNo=1&dataType=JSON'
    +'&fromTmFc='+stYmd+'&toTmFc='+stYmd+'&stnId='+stPlace);

  const data = await wrnFetch.json();
  console.log('fetch -> json 변환 data', data);

  console.log('특보코드: ', data.response.header.resultCode);
  if(data.response.header.resultCode != '00'){
    console.log('!!!!!!!!!!!!!!!!!!!!!! 통신오류 발생!, 코드: ', data.response.header.resultCode);
    return null;
  } else{
    console.log('※ 성공적으로 데이터 전달 완료! 페이지로 돌아가는 중...');
    const wrnItem = data.response.body.items.item[0].t6;
    return wrnItem;
  }
  

}
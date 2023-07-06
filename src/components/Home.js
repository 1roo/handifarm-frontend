import React from 'react'
import './Home.scss';
import '.././Custom.scss';
import { Button, Stack, Table } from 'react-bootstrap';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import HomeTbody from './HomeTbody';

const Home = () => {



  const BoardList = [{
    category : '자유',
    title: '님들 제가 키우는 강아지 시고르자브종 보고 가실래요?ㅎㅎㅎㅎ',
    userName: '왈왈이',
    createDate: '2023.07.02',
    views: '3'
  }, {
    category : '정보',
    title: 'Hello World!',
    userName: 'json',
    createDate: '2023.06.28',
    views: '15'
  }

  ]




  return (
    <>
      <div className='container home'>

          {/* 날씨 박스 */}
          <section className='weather-box'>
              <div className='title'><h2>제주<br/>날씨</h2></div>

              <div className='weather D0'>
                <div>
                  <div className='day'><h3>오늘</h3><span>7/5</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span> <i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span> <i><WbCloudyIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span> <hr/> <span>28℃</span>
                </div>
              </div> {/* weather D-0 END */}
              
              <div className='weather D1'>
                <div>
                  <div className='day'><h3>내일</h3><span>7/6</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span>  <i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span>  <i><WbSunnySharpIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span> <hr/> <span>28℃</span>
                </div>
              </div> {/* weather D+1 END */}

              <div className='weather D2'>
                <div>
                  <div className='day'><h3>모레</h3><span>7/7</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span> <i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span> <i><WbCloudyIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span> <hr/> <span>28℃</span>
                </div>
              </div> {/* weather D+2 END */}

          </section>
          {/* 날씨 박스 끝  */}

          <section className='button-box'>
            <Button as="a" variant="success">오늘의 정보</Button>
            <Button as="a" variant="success">게시판</Button>
            <Button as="a" variant="success">농사일기</Button>
            <Button as="a" variant="success">거래장터</Button>
          </section>

          <section className='small-board'>
            <h2>게시판</h2>
            <Table bordered hover size='500' border={1}>
              <thead>
                <tr>
                  <th>말머리</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th >조회</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>공지</td>
                  <td>[필독] 게시판 이용 수칙을 꼭 읽어주세요.</td>
                  <td>관리자</td>
                  <td>2023.06.28</td>
                  <td>10</td>
                </tr>
               { BoardList.map(board => <HomeTbody item={board}/>) }
              </tbody>
            </Table>

          </section>

          <section className='small-snsBoard'>
            <h2>농사일기</h2>
            <div className='img-list'>
              <div className='arrow'><ArrowCircleUpIcon /></div>
              <article><img src="#" alt="농작물 사진" /></article>
              <article><img src="#" alt="농작물 사진" /></article>
              <article><img src="#" alt="농작물 사진" /></article>
              <article><img src="#" alt="농작물 사진" /></article>
              <div className='arrow'><ArrowCircleUpIcon /></div>
            </div>
          </section>

          <section className='small-market'>
            <h2>거래장터</h2>
          </section>

          


          

      </div>




        
    
    </>
  )
}

export default Home
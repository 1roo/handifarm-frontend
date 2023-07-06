import React from 'react'
import './Home.scss';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const Home = () => {
  return (
    <>
      <div className='container home'>
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

          <section className='button-box'>
            <div>오늘의 정보</div>
            <div>게시판</div>
            <div>농사일기</div>
            <div>거래장터</div>
          </section>

          <section className='small-board'>
            <h2>게시판</h2>
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
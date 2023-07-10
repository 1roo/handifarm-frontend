import React from 'react'
import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
// import {
//   MDBCarousel,
//   MDBCarouselItem,
// } from 'mdb-react-ui-kit';

function SnsBoardCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  
  return (

    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.nongmin.com/-/raw/srv-nongmin/data2/content/image/2022/06/16/.cache/512/20220616196317.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://src.hidoc.co.kr/image/lib/2021/9/3/1630652987056_0.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    //
    // <Carousel showControls>
    //   <Carousel.Item
    //     className='w-100 d-block'
    //     itemId={1}
    //     src='https://mdbootstrap.com/img/new/slides/041.jpg'
    //     alt='...'
    //   />
    //   <Carousel.Item
    //     className='w-100 d-block'
    //     itemId={2}
    //     src='https://mdbootstrap.com/img/new/slides/042.jpg'
    //     alt='...'
    //   />
    //   <Carousel.Item
    //     className='w-100 d-block'
    //     itemId={3}
    //     src='https://mdbootstrap.com/img/new/slides/043.jpg'
    //     alt='...'
    //   />
    // </Carousel>
  );
}

export default SnsBoardCarousel
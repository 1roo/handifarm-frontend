import React from 'react'
import { useState } from 'react'
import { Paper, Button } from '@mui/material';
// import Carousel from 'react-material-ui-carousel';


const SnsBoardCarousel = (imgs) => {

  const i = imgs.imgs.img;
  console.log('carousel 이미지 링크: ', i);

  return (
    <>
      <figure>
        <img className='carousel-img' src={i} alt="농사일기 이미지" />
      </figure>
    </>
    // <Carousel>
    //   <Paper><img className='carousel-img' src={i} alt="농사일기 이미지" /></Paper>
    // </Carousel>
  );
}

export default SnsBoardCarousel
import React from "react";
import { useState } from "react";
import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
// import Carousel from 'react-material-ui-carousel';

const SnsBoardCarousel = (sns) => {
  const snsNo = sns.snsList.snsNo;
  const writer = sns.snsList.writer;
  const imgLink = sns.snsList.snsImgs[0];
  console.log("carousel 이미지 링크: ", imgLink);

  return (
    <>
      <figure>
        <Link to={`/snsBoard/?writer=${writer}`}>
          <img className="carousel-img" src={imgLink} alt="농사일기 이미지" />
        </Link>
      </figure>
    </>
    // <Carousel>
    //   <Paper><img className='carousel-img' src={i} alt="농사일기 이미지" /></Paper>
    // </Carousel>
  );
};

export default SnsBoardCarousel;

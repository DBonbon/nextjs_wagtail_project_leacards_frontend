import React from "react";
import { BaseImage } from "../BaseImage";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageCarousel(props) {
  return (
    <div className="not-prose">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
      >
        {props.value.map((item, index) => (
          <BaseImage img={item} key={`${index}.${item}`}/>
        ))}
      </Carousel>
    </div>
  );
}

export { ImageCarousel };

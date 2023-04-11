import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SimpleSlider from "../Helpers/SliderCom";
import { Carousel } from "react-responsive-carousel";

import Img00 from "../../assets/images/banner/img0.webp";
import Img01 from "../../assets/images/banner/img1.webp";
import Img02 from "../../assets/images/banner/img2.webp";
import Img03 from "../../assets/images/banner/img3.webp";
import Img04 from "../../assets/images/banner/img4.webp";

import "./BannerBrand.scss";

const BannerBrand = () => (
  <Carousel
    centerMode
    autoPlay
    showArrows
    infiniteLoop
    // dynamicHeight
    ariaLabel
    stopOnHover
    useKeyboardArrows
    selectedItem={0}
    showIndicators={true}
    showThumbs={true}
    showStatus={false}
    statusFormatter={(current, total) => ``}
    className="brand__carrousel"
  >
    <div>
      <img alt="" src={Img00} className="img_carrosel" />
    </div>
    <div>
      <img alt="" src={Img01} className="img_carrosel" />
    </div>
    <div>
      <img alt="" src={Img02} className="img_carrosel" />
    </div>
    <div>
      <img alt="" src={Img03} className="img_carrosel" />
    </div>
    <div>
      <img alt="" src={Img04} className="img_carrosel" />
    </div>
  </Carousel>
);

export default BannerBrand;

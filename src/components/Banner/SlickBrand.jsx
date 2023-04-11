import React from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import useGetData from "../../custom-hooks/useGetData";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrNext
      className={className}
      style={{ ...style, display: "block", width: "5%", height: "5vh" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrPrevious
      className={className}
      style={{ ...style, display: "block", width: "5%", height: "5vh" }}
      onClick={onClick}
    />
  );
}

const SlickBrand = () => {
  const { data: brands } = useGetData("brands");
  const settings = {
    vertical: false,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <Slider {...settings}>
        {brands &&
          brands?.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SlickBrand;

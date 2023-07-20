import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import "./slick.css";
import "./slick-theme.css";
import data from "../mock.json";
import MovieCard from "../BigCard";

export const SimpleSlider = ({ initialSlide = 0 }) => {
  const [hasSetPosition, setHasSetPosition] = useState(false);
  const slider = useRef();

  useEffect(() => {
    if (slider.current && !hasSetPosition) {
      slider.current.slickGoTo(initialSlide);
      setHasSetPosition(true);
    }
  }, [initialSlide, hasSetPosition, slider]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider ref={slider} {...settings}>
      {data.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </Slider>
  );
};

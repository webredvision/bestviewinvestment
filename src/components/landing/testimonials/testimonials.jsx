"use client";
import React from "react";
import Slider from "react-slick";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.css";
import HomeHeading from "../heading/heading";

const createMarkup = (html) => ({ __html: html });

const TestimonialSection = ({ testimonials }) => {
  const settings = {
    dots: true,
    arrows: false, // ✅ Hides navigation arrows
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // ✅ Enable auto scroll
    autoplaySpeed: 5000, // ✅ 8 seconds delay
    customPaging: function (i) {
      return (
        <button
          type="button"
          role="tab"
          aria-controls={`slick-slide${i}`}
          aria-label={`Slide ${i + 1}`}
          tabIndex="0"
        >
          {i + 1}
        </button>
      );
    },
  };

  return (
    <div className="main-section section-design">
      <div className="max-w-screen-xl mx-auto">
        <HomeHeading
          title="What Our Clients Say About Us"
          subtitle="Testimonials"
          className="text-center mb-10"
        />

        <div className="row">
          <div className="col-lg-8 m-auto">
            <Slider {...settings} className="testimonial-slider-one">
              {testimonials?.map((testimonial, index) => (
                <div className="testimonial-item-one" key={index}>
                  <div className="testimonial-author-image">
                    <img src={testimonial?.image?.url} alt="author-image" />
                  </div>
                  <div
                    className="text-xl max-w-screen-lg"
                    dangerouslySetInnerHTML={createMarkup(testimonial?.content)}
                  />
                  <img src="/cote.svg" alt="icon" />
                  <p>
                    {testimonial?.author} {testimonial?.designation}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;

"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bannerSection.css";

export default function HeroSection({ sitedata }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
    customPaging: function (i) {
      return (
        <button
          type="button"
          role="tab"
          aria-label={`${i + 1}`}
          tabIndex="-1"
        >
          {i + 1}
        </button>
      );
    },
    dotsClass: "slick-dots",
  };

  const bannerSlides = [
    {
      image: "/images/banners/banner-2.webp",
      eyebrow: "Where Your Money Meets Opportunity",
      title: "Empower Your",
      highlight: "Financial Journey",
      ending: "With Confidence",
      description:
        "Success. Trust. Transparency — we’re dedicated to securing your financial future together.",
      ctaLabel: "View More +",
      ctaHref: "/about-us",
    },
    {
      image: "/images/banners/banner-1.webp",
      eyebrow: "Services",
      title: "Mutual Fund",
      highlight: "Gift City",
      ending: "Insurance",
      description:
        "Personalized guidance, clear processes, and client-first support for every stage of your journey.",
      ctaLabel: "Explore Services +",
      ctaHref: "/#services",
    },
    {
      image: "/images/banners/banner-3.webp",
      eyebrow: sitedata?.websiteName || "Best View Investment Services",
      title: "Trusted",
      highlight: "Advice",
      ending: "Built on Care",
      description:
        "We help you plan better, invest smarter, and stay focused on your long-term goals.",
      ctaLabel: "Contact Us +",
      ctaHref: "/contact-us",
    },
  ];

  return (
    <section className="banner-section-one">
      <Slider {...settings} className="banner-silder-one">
        {bannerSlides.map((slide, index) => (
          <div className="banner-slide-item-one" key={index}>
            <div className="banner-image-one">
              <img src={slide.image} alt="banner" />
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-6 col-lg-7">
                  <div className="heading-box">
                    <div className="banner-sub-title-one">
                      <h2>{slide.eyebrow}</h2>
                    </div>
                    <h1 className="heading-title">
                      {slide.title} <br />
                      <span>{slide.highlight}</span> <br />
                      {slide.ending}
                    </h1>
                    <p className="heading-details lead">{slide.description}</p>
                    <Link href={slide.ctaHref} className="hero-cta">
                      {slide.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div id="slider-info"></div>
    </section>
  );
}

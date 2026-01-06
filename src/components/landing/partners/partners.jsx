"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./partnerOne.css"; // Importing the CSS styles
import Image from "next/image";

const PartnerOneSlider = ({  }) => {
    const [amcLogoData, setAmcLogoData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
 
  useEffect(() => {
    fetchCategories();
  }, []);
 
  useEffect(() => {
    if (selectedCategoryId) {
      fetchLogos(selectedCategoryId);
    }
  }, [selectedCategoryId]);
 
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/amc-category");
      const data = await res.json();
 
      // Only filter Mutual Funds
      const mutualFundCategory = data.find(
        (cat) => cat.title === "Mutual Funds"
      );
 
      if (mutualFundCategory) {
        setSelectedCategoryId(mutualFundCategory._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
 
  const fetchLogos = async (categoryID) => {
    try {
      const res = await fetch(`/api/amc-logos?categoryID=${categoryID}&addisstatus=true`);
      const data = await res.json();
      if (data.success) {
        setAmcLogoData(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch AMC Logos:", err);
    }
  };
 
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="partner-section-one bg-[var(--rv-white)]">
            <div className="container-fluid p-0">
                <Slider {...settings} className="partner-slider-one">
                    {amcLogoData?.map((logo, index) => (
                        <div key={index} className="partner-slide-item-one  ">
                            <img
                                src={`https://redvisionweb.com${logo.logo}`}
                                alt={logo.logoname}
                                className="rounded"
                                width={200}
                                height={200}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default PartnerOneSlider;

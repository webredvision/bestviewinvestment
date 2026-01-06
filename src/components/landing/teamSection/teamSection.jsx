"use client";
import React from "react";
import Slider from "react-slick";
import "./teamSection.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import HomeHeading from "../heading/heading";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TeamSection = ({ socialMedia, aboutteamdata }) => {
  const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-primary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-primary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-primary)]" />,
    Linkedln: <FaLinkedin className="text-[var(--rv-primary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-primary)]" />,
  };

  const settings = {
    dots: true,
    arrows: false, // hide arrows
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
    customPaging: (i) => (
      <button type="button" role="tab" aria-label={`Slide ${i + 1}`}>
        {i + 1}
      </button>
    ),
  };

  return (
    <div className="main-section section-design">
      <div className="max-w-screen-xl mx-auto">
        <div className="row">
          <div className="col-xl-5 m-auto">
            <HomeHeading
              title="Meet the People Behind Our Success"
              subtitle="Our Team"
            />
          </div>
        </div>

        <Slider {...settings}>
          {aboutteamdata.map((member, index) => (
            <div key={index} className="px-3">
              <div
                className="team-box-one animate fadeInUp wow"
                data-wow-duration="1500ms"
                data-wow-delay={`${index * 200}ms`}
              >
                <div className="team-image-one">
                  <img
                    src={member.image?.url || "/teams/default.png"}
                    alt={`${member.name} image`}
                  />
                </div>
                <div className="team-details-one text-center mt-3">
                  <h4>{member.name}</h4>
                  <p>{member.designation}</p>
                  <div className="flex justify-center gap-2 mt-2">
                    {member.social?.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {iconMap[social.platform]}
                      </a>
                    ))}
                  </div> 
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TeamSection;

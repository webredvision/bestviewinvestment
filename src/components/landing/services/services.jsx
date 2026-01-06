import React from "react";
import Link from "next/link"; // You can replace this with a regular <a> tag if you're not using Next.js.
import "./Services.css";
import {
  FaAngleRight,
  FaBuildingColumns,
  FaChartLine,
  FaHeartPulse,
  FaShieldHeart,
} from "react-icons/fa6";
import HomeHeading from "../heading/heading";

const ServiceComponent = ({ services }) => {
  const iconByLink = {
    "mutual-fund": FaChartLine,
    "gift-city": FaBuildingColumns,
    "health-insurance": FaHeartPulse,
    "life-insurance": FaShieldHeart,
  };

  const allowed = new Set(Object.keys(iconByLink));
  const list = (services || []).filter((s) => allowed.has(s?.link));

  return (
    <section id="services" className="services-section-one main-section">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div className="col-span-1 ">
            <div className="service-left-one md:sticky md:top-40">
              <HomeHeading
                title="We Always Provide Best Financial Services"
                subtitle="Services"
                description="Explore our core offerings designed to help you invest with clarity, protect what matters, and plan for the future."
              />
            </div>
          </div>
          <div className="cols-span-1">
            <div className="service-right-one ">
              {list.map((service, index) => {
                const Icon = iconByLink[service?.link] || FaChartLine;
                return (
                <div key={index} className="service-right-inner-one">
                  <div
                    className="service-box-one animate fadeInUp wow"
                    data-wow-duration="1500ms"
                    data-wow-delay={`${index * 400}ms`}
                  >
                    <div className="service-icon-one">
                      <Icon
                        aria-hidden="true"
                        className="text-[var(--rv-primary)]"
                        size={44}
                      />
                      {/* <svg
                        id="fi_14120322"
                        width={50}
                        height={50}
                        enableBackground="new 0 0 32 32"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m2 5v6.5625c0 1.6542969 1.3457031 3 3 3h6.5624971c1.6542997 0 3-1.3457031 3-3v-6.5625c0-1.6542969-1.3457003-3-3-3h-6.5624971c-1.6542969 0-3 1.3457031-3 3zm2 0c0-.5517578.4487305-1 1-1h6.5624971c.5512724 0 1 .4482422 1 1v6.5625c0 .5517578-.4487276 1-1 1h-6.5624971c-.5512695 0-1-.4482422-1-1z"></path>
                          <path d="m2 27c0 1.6542969 1.3457031 3 3 3h6.5624971c1.6542997 0 3-1.3457031 3-3v-6.5625c0-1.6542969-1.3457003-3-3-3h-6.5624971c-1.6542969 0-3 1.3457031-3 3zm2-6.5625c0-.5517578.4487305-1 1-1h6.5624971c.5512724 0 1 .4482422 1 1v6.5625c0 .5517578-.4487276 1-1 1h-6.5624971c-.5512695 0-1-.4482422-1-1z"></path>
                          <path d="m27 17.4375h-6.5625038c-1.6542931 0-3 1.3457031-3 3v6.5625c0 1.6542969 1.3457069 3 3 3h6.5625038c1.6542969 0 3-1.3457031 3-3v-6.5625c0-1.6542969-1.3457031-3-3-3zm1 9.5625c0 .5517578-.4487305 1-1 1h-6.5625038c-.5512657 0-1-.4482422-1-1v-6.5625c0-.5517578.4487343-1 1-1h6.5625038c.5512695 0 1 .4482422 1 1z"></path>
                          <path d="m29 7.28125h-4.28125v-4.28125c0-.5527344-.4477539-1-1-1s-1 .4472656-1 1v4.28125h-4.2812538c-.5522423 0-1 .4472656-1 1s.4477577 1 1 1h4.2812538v4.28125c0 .5527344.4477539 1 1 1s1-.4472656 1-1v-4.28125h4.28125c.5522461 0 1-.4472656 1-1s-.4477539-1-1-1z"></path>
                        </g>
                      </svg> */}
                    </div>
                    {/* {service} */}
                    <h4 className="h-[50px]">{service?.name}</h4>
                    <p className="line-clamp-5">{service?.description}</p>
                    {/* <Link href="/service-details.html"> */}
                    <Link
                      href={`/services/${service?.link}`}
                      className="service-btn-one"
                    >
                      <FaAngleRight />
                    </Link>
                    {/* </Link> */}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceComponent;

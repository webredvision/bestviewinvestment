"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IoMailOutline, IoTimeOutline } from "react-icons/io5";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "./ui/carousel";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Tickers({ siteData, socialMedia = [] }) {
  const [data, setData] = useState([]);

  const iconMap = {
    facebook: <FaFacebookF />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    linkedin: <FaLinkedin />,
    twitter: <FaXTwitter />,
    x: <FaXTwitter />,
  };

  const resolveIcon = (title = "") => {
    const key = String(title).trim().toLowerCase().replace(/\s+/g, "");
    return iconMap[key] ?? <FaFacebookF />;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/tickers?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 200) {
        const filteredData = response.data.data.filter(
          (item) => item?.indexName !== "UK"
        );
        setData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto relative">
      {/* <div className="topbar-header">
        <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-[var(--rv-white)]">
          <div className="flex items-center gap-6 text-sm min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <IoMailOutline />
              <a
                href={`mailto:${siteData?.email || ""}`}
                className="hover:underline truncate"
              >
                {siteData?.email || ""}
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 opacity-90 whitespace-nowrap">
              <IoTimeOutline />
              <span>Mon - Sat 8:00 AM - 6:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm shrink-0">
            <Link href="/login" className="hover:text-[var(--rv-primary)]">
              Login
            </Link>
            <Link href="/news" className="hover:text-[var(--rv-primary)]">
              Company News
            </Link>
            <Link href="/faqs" className="hover:text-[var(--rv-primary)]">
              FAQs
            </Link>
            <div className="hidden md:flex items-center gap-3 pl-2 border-l border-white/10">
              {socialMedia
                ?.filter((link) => !link.isHidden)
                ?.slice(0, 5)
                ?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100 hover:text-[var(--rv-primary)] transition"
                    aria-label={link?.title}
                  >
                    {resolveIcon(link?.title)}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div> */}

      <div className="ticker relative ticker-header overflow-hidden">
        <Carousel className="relative" plugins={[Autoplay({ delay: 2000 })]}>
          <CarouselContent className="flex -ml-0">
            {data.map((item, index) => {
              const isPositive = item?.diff_amount > 0;
              return (
                <div key={index} className="md:basis-1/6 lg:basis-1/6">
                  <div className="px-3 py-1 flex items-center gap-2 w-64 ">
                    <span className="font-bold text-sm text-[var(--rv-white)] whitespace-nowrap">
                      {item?.indexName}
                    </span>
                    <span className="font-semibold text-xs text-[var(--rv-white)]">
                      {item?.figure}
                    </span>
                    <div className="bg-white/10 backdrop-blur-sm flex items-center gap-2 px-1.5 py-1 ">
                      <span
                        className={`font-bold text-xs flex items-center ${
                          isPositive ? "text-green-400" : "text-red-500"
                        }`}
                      >
                        {isPositive ? <FiArrowUp /> : <FiArrowDown />}
                      </span>
                      <span
                        className={`font-bold text-xs ${
                          isPositive ? "text-green-400" : "text-red-500"
                        }`}
                      >
                        {item?.diff_amount}
                      </span>
                      <span
                        className={`font-bold text-xs ${
                          isPositive ? "text-green-400" : "text-red-500"
                        }`}
                      >
                        ({item?.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

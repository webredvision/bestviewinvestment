"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InnerBanner from "@/components/innerBanner/InnerBanner";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Assuming shadcn/ui or your custom carousel setup

export default function PayPremium() {
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [amcLogoData, setAmcLogoData] = useState([]);

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
      const res = await fetch(`/api/amc-category`);
      const data = await res.json();
      const filtered = data.filter((cat) =>
        ["Life Insurance", "Health Insurance", "General Insurance"].includes(cat.title)
      );
      setAllCategory(filtered);
      if (filtered.length > 0) {
        setSelectedCategoryId(filtered[0]._id);
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

  return (
    <>
      <InnerBanner pageName="Pay Premium Online" />
      <section className="max-w-screen-xl mx-auto main-section">
        {/* CATEGORY SELECTOR */}
        <div className="flex flex-wrap gap-3 justify-center bg-[--rv-secondary] px-6 py-4 rounded-xl shadow-md mb-8">
          {allCategory.map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                setSelectedCategoryId(cat._id);
              }}
              className={`transition-all duration-300 uppercase px-5 py-2 rounded-full font-medium tracking-wide text-sm hover:scale-105 
              ${
                selectedCategoryId === cat._id
                  ? "bg-[--rv-primary] text-white shadow-md"
                  : "bg-white text-[--rv-primary] hover:bg-[--rv-primary] hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* AMC LOGO CAROUSEL */}
        {amcLogoData.length > 0 && (
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }} 
            className="w-full"
          >
            <CarouselContent className="m-4">
              {amcLogoData.map((partners, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Link href={partners.logourl || "#"} target="_blank">
                    <div className="bg-white p-2 border rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] flex items-center justify-center h-[100px]">
                      <img
                        src={`${process.env.NEXT_PUBLIC_DATA_API}${partners.logo}`}
                        alt={`logo-${partners.logoname}`}
                        width={130}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent> 
          </Carousel>
        )}
      </section>
    </>
  );
}

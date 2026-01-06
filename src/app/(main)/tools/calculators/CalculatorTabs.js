"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { calculator, planning, performance } from "@/data/calculators";

const tabList = [
  { label: "Calculator", key: "calculator" },
  { label: "Planning", key: "planning" },
  { label: "Performer", key: "performance" },
];

export default function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState("calculator");

  const getTabData = () => {
    switch (activeTab) {
      case "calculator":
        return calculator;
      case "planning":
        return planning;
      case "performance":
        return performance;
      default:
        return [];
    }
  };

  const tabData = getTabData();

  return (
    <section className="max-w-7xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex justify-center mb-12">
        <div className="flex gap-4 bg-gray-100 rounded-full p-1 shadow-inner">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 md:px-10 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-[var(--rv-primary)] text-white shadow-md"
                  : "text-[var(--rv-primary)] hover:bg-[var(--rv-primary-light)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {tabData.map((item, index) => (
          <Link href={item.route || item.link} key={index}>
            <div className="bg-white group hover:bg-[var(--rv-primary)] transition-all duration-300 rounded-2xl p-6 shadow-md hover:shadow-xl flex flex-col items-start text-left transform hover:-translate-y-1 hover:scale-[1.02] h-full">
              <div className="flex items-center gap-5">
                <div>
                  {/* Title */}
                  <h3 className="mt-4 font-semibold text-[var(--rv-primary)] group-hover:text-white text-lg transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.desc && (
                    <p className="mt-2 text-sm text-gray-600 group-hover:text-white transition-all duration-300">
                      {item.desc}
                    </p>
                  )}
                </div>
                <div className="">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--rv-primary)] group-hover:bg-[var(--rv-secondary)] transition-all duration-300">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={30}
                      height={30}
                      className="transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

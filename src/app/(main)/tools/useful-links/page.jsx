"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import InnerBanner from "@/components/innerBanner/InnerBanner";

const UsefulLinksPage = () => {
  const [usefulLink, setUsefulLink] = useState([]);
  const fetchLinks = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (res.ok) {
      const data = await res.json();
      setUsefulLink(data);
    }
  };
  // useEffect(() => { fetchservice(); }, []);
  useEffect(() => {
    fetchLinks();
  }, []);
  return (
<>
 <InnerBanner pageName="UseFul Link" />
    <div className="main-section">
      <div className="">
        <div className="max-w-screen-xl mx-auto ">
          <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between ">
            <div className="">
              <span className="text-2xl md:text-3xl font-bold uppercase">
                Useful Links
              </span>
            </div>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {usefulLink.map((link, index) => (
              <Link href={link.link} key={index} legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--rv-secondary)] text-[var(--rv-primary)] border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition hover:bg-[var(--rv-primary)] hover:text-white duration-300 flex flex-col justify-center items-center"
                >
                  <h3 className="text-xl font-semibold">{link.title}</h3>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div></>
  );
};

export default UsefulLinksPage;

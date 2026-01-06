"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import NewsCard from "@/components/newscard";

export default function LatestNews() {
  const [activeCategory, setActiveCategory] = useState("ipo");
  const [cache, setCache] = useState({ ipo: [], market: [], upcoming: [] });
  const [visibleData, setVisibleData] = useState([]); // news being displayed
  const [page, setPage] = useState(1); // page count for chunking
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const ITEMS_PER_PAGE = 12;

  // Lazy fetch for selected category
  const fetchData = useCallback(
    async (category) => {
      if (cache[category].length > 0) {
        // already cached → show first page
        setPage(1);
        setVisibleData(cache[category].slice(0, ITEMS_PER_PAGE));
        return;
      }
      setLoading(true);
      try {
        const urlMap = {
          ipo: `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/upcoming-news/ipo-news?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
          market: `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/upcoming-news/market-news?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
          upcoming: `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/upcoming-news/popular-news?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
        };
        const res = await axios.get(urlMap[category]);
        if (res.status === 200) {
          const allNews = res.data;
          setCache((prev) => ({ ...prev, [category]: allNews }));
          setPage(1);
          setVisibleData(allNews.slice(0, ITEMS_PER_PAGE));
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  // Fetch IPO initially
  useEffect(() => {
    fetchData("ipo");
  }, [fetchData]);

  // Change category with reset
  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory, fetchData]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          const allNews = cache[activeCategory];
          const nextPage = page + 1;
          const nextData = allNews.slice(0, nextPage * ITEMS_PER_PAGE);
          if (nextData.length > visibleData.length) {
            setVisibleData(nextData);
            setPage(nextPage);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page, visibleData, cache, activeCategory, loading]);

  return (
    <section className="main-section">
      <div className="lg:px-1 px-4 max-w-screen-xl mx-auto">
        {/* Category buttons */}
        <div className="grid md:grid-cols-3 grid-cols-1 mb-6">
          {["ipo", "market", "upcoming"].map((cat, idx) => (
            <div
              key={cat}
              className={`font-bold px-5 py-3 cursor-pointer text-[var(--rv-primary)] text-center 
                ${idx === 0 ? "rounded-s-lg" : idx === 2 ? "rounded-e-lg" : ""} 
                ${activeCategory === cat ? "bg-[var(--rv-primary)] text-white" : "bg-[var(--rv-secondary)]"}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>

        {/* News grid */}
        <div className="overflow-x-auto">
          {loading && visibleData.length === 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {visibleData?.map((item, index) => (
                <NewsCard item={item} key={index} />
              ))}
            </div>
          )}
        </div>

        {/* Loader trigger for infinite scroll */}
        <div ref={loaderRef} className="h-10 flex justify-center items-center">
          {visibleData.length < cache[activeCategory]?.length && (
            <span className="text-gray-500 text-sm">Loading more...</span>
          )}
        </div>
      </div>
    </section>
  );
}

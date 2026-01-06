import React from "react";
import Link from "next/link";
import InnerBanner from "@/components/innerBanner/InnerBanner";

export const metadata = {
  title: "Gift City",
  description:
    "Learn about opportunities and services related to GIFT City (IFSC) and how it can support global investing and financial solutions.",
};

export default function GiftCityPage() {
  return (
    <>
      <InnerBanner pageName="Gift City" />
      <section className="main-section">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-extrabold text-center text-[var(--rv-primary)] mb-3">
            Gift City
          </h1>

          <h2 className="text-gray-700 font-medium mb-6 text-center">
            Explore IFSC-linked opportunities with clarity
          </h2>

          <p className="mb-4 text-lg text-gray-800">
            GIFT City (Gujarat International Finance Tec-City) is India’s
            international financial services hub. Through the IFSC framework, it
            enables global financial products and services with a regulated
            environment and modern infrastructure.
          </p>

          <p className="mb-8 text-lg text-gray-800">
            If you’re looking to understand available options and how they fit
            your goals, we help you navigate the process with transparent
            information and customer-first support.
          </p>

          <div className="mb-10">
            <h3 className="font-semibold text-[var(--rv-primary)] mb-4">
              What We Help With
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Guidance & Documentation</h4>
                <p>
                  Clear guidance on the steps, documentation, and common
                  questions so you can proceed confidently.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Goal-Based Suitability</h4>
                <p>
                  We help you evaluate suitability based on your goals, time
                  horizon, and risk profile.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Transparent Process</h4>
                <p>
                  Simple, step-by-step support with a focus on transparency and
                  timely updates.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Ongoing Support</h4>
                <p>
                  Post-onboarding assistance and a single point of contact for
                  help whenever you need it.
                </p>
              </div>
            </div>
          </div>

          <div className="services-cta p-6 rounded-xl shadow-sm">
            <p className="text-lg mb-4">
              Want to know which options fit your needs? Connect with our team
              for a quick discussion.
            </p>
            <Link href="/contact-us" className="btn2">
              Talk to Us About Gift City
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


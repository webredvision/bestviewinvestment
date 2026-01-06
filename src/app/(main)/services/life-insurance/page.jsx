import React from "react";
import Link from "next/link";
import InnerBanner from "@/components/innerBanner/InnerBanner";

export const metadata = {
  title: "Life Insurance",
  description:
    "Explore Life Insurance solutions to protect your loved ones and support long-term financial planning.",
};

export default function LifeInsurancePage() {
  return (
    <>
      <InnerBanner pageName="Life Insurance" />
      <section className="main-section">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-extrabold text-center text-[var(--rv-primary)] mb-3">
            Life Insurance
          </h1>

          <h2 className="text-gray-700 font-medium mb-6 text-center">
            Secure your family’s future with reliable protection
          </h2>

          <p className="mb-4 text-lg text-gray-800">
            Life Insurance provides financial support to your family in case of
            unforeseen events. It helps protect goals such as education,
            retirement planning, and ongoing household responsibilities.
          </p>

          <p className="mb-8 text-lg text-gray-800">
            We help you compare options, understand benefits, and choose a plan
            that aligns with your goals and budget.
          </p>

          <div className="mb-10">
            <h3 className="font-semibold text-[var(--rv-primary)] mb-4">
              Common Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Term Insurance</h4>
                <p>
                  Pure protection with high coverage at affordable premiums for
                  a fixed term.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Savings / Investment Plans</h4>
                <p>
                  Plans that combine protection with long-term savings
                  objectives.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Child & Education Planning</h4>
                <p>
                  Structured planning to support key milestones for your child
                  while keeping protection in place.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Riders & Add-ons</h4>
                <p>
                  Optional benefits such as accidental cover or critical illness
                  riders to strengthen protection.
                </p>
              </div>
            </div>
          </div>

          <div className="services-cta p-6 rounded-xl shadow-sm">
            <p className="text-lg mb-4">
              Want the right coverage for your family’s needs? Connect with our
              team for guidance.
            </p>
            <Link href="/contact-us" className="btn2">
              Talk to Us About Life Insurance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


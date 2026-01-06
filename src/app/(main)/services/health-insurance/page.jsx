import React from "react";
import Link from "next/link";
import InnerBanner from "@/components/innerBanner/InnerBanner";

export const metadata = {
  title: "Health Insurance",
  description:
    "Explore Health Insurance options that help protect you and your family with the right coverage, benefits, and claim support.",
};

export default function HealthInsurancePage() {
  return (
    <>
      <InnerBanner pageName="Health Insurance" />
      <section className="main-section">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-extrabold text-center text-[var(--rv-primary)] mb-3">
            Health Insurance
          </h1>

          <h2 className="text-gray-700 font-medium mb-6 text-center">
            Protect your family’s health with the right coverage
          </h2>

          <p className="mb-4 text-lg text-gray-800">
            Health Insurance helps you manage medical expenses and protects your
            savings during unexpected health events. The right plan provides
            peace of mind, better access to care, and financial stability.
          </p>

          <p className="mb-8 text-lg text-gray-800">
            We help you understand coverage options, important features, and how
            to choose a policy that fits your needs and budget.
          </p>

          <div className="mb-10">
            <h3 className="font-semibold text-[var(--rv-primary)] mb-4">
              What to Look For
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Sum Insured & Coverage</h4>
                <p>
                  Choose adequate coverage for hospitalization, day-care
                  procedures, and pre/post hospitalization expenses.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Network Hospitals</h4>
                <p>
                  Prefer plans with a strong cashless network and smooth claim
                  support.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Waiting Periods</h4>
                <p>
                  Understand waiting periods for pre-existing conditions and
                  specific treatments.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md bg-white">
                <h4 className="font-bold mb-2">Add-ons & Benefits</h4>
                <p>
                  Evaluate no-claim bonus, room rent limits, and optional riders
                  that improve protection.
                </p>
              </div>
            </div>
          </div>

          <div className="services-cta p-6 rounded-xl shadow-sm">
            <p className="text-lg mb-4">
              Need help choosing the right plan for you and your family? Connect
              with our team for guidance.
            </p>
            <Link href="/contact-us" className="btn2">
              Talk to Us About Health Insurance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


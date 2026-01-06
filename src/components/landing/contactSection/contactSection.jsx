"use client";
import React from "react";
import "./contactUs.css";
import ContactReusableForm from "./Contactreusableform";
import { FiMapPin, FiMail } from "react-icons/fi";
import Link from "next/link";
import HomeHeading from "../heading/heading";
import { Phone } from "lucide-react";

export default function ContactUsFormSection({ sitedata }) {
  const address = sitedata?.address || "";
  const email = sitedata?.email || "";
  const mobile = sitedata?.mobile || "";
  const mapUrl = sitedata?.mapurl || "#";

  return (
    <div className="main-section">
      <div className="max-w-screen-xl mx-auto">
        <HomeHeading
          title="Let’s Begin Your Financial Journey"
          subtitle="Get in Touch with Us"
          description="Connect with our expert team for tailored investment solutions or any financial guidance you need."
        />
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-5">
          <div className="col-span-2">
            <div className="contact-left-one">
              <ul
                className="contact-details-one animate fadeInUp wow"
                data-wow-duration="1500ms"
                data-wow-delay="600ms"
              >
                <li className="flex gap-3 flex-col justify-start align-middle text-left">
                  <h4 className="m-0">Office</h4>
                  {mapUrl !== "#" ? (
                    <Link
                      target="_blank"
                      href={mapUrl}
                      className="text-base leading-6 flex flex-row gap-1 justify-start align-middle"
                    >
                      <FiMapPin className="text-[var(--rv-primary)] w-6 h-6 flex-shrink-0" />
                      {address}
                    </Link>
                  ) : (
                    <div className="text-base leading-6 flex flex-row gap-1 justify-start align-middle">
                      <FiMapPin className="text-[var(--rv-primary)] w-6 h-6 flex-shrink-0" />
                      <p>{address}</p>
                    </div>
                  )}
                </li>
                <li className="flex gap-3 flex-col justify-start align-middle text-left">
                  <h4 className="m-0">Email</h4>
                  <div className="flex items-center gap-3">
                    <FiMail className="text-[var(--rv-primary)] w-6 h-6 flex-shrink-0" />
                    <Link
                      href={`mailto:${email}`}
                      className="text-base leading-6"
                    >
                      {email}
                    </Link>
                  </div>
                </li>
                <li className="flex gap-3 flex-col justify-start align-middle text-left">
                  <h4 className="m-0">Mobile</h4>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`tel:${mobile}`}
                      className="text-base leading-6 flex flex-row gap-1 justify-start align-middle"
                    >
                      <Phone className="text-[var(--rv-primary)] w-6 h-6 flex-shrink-0" />
                      {mobile}
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-3">
            <div
              className="bg-[var(--rv-primary-dark)] contact-form-one animate fadeInRight wow"
              data-wow-duration="1500ms"
            >
              <ContactReusableForm sitedata={sitedata || {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

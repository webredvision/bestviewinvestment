"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./headerSideMenu.css";
import axios from "axios";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoLocationSharp, IoCall, IoMail } from "react-icons/io5";

const HeaderSideMenu = ({ toggleSideMenu }) => {
  const [siteData, setSiteData] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await axios.get("/api/admin/site-settings");
        if (res.status === 200 && res.data[0]) {
          setSiteData(res.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch site settings", error);
      }
    };
    fetchSiteData();
  }, []);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await axios.get("/api/admin/SocialMedia");
        if (res.status === 200 && res.data[0]) {
          setSocialMedia(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch social media", error);
      }
    };
    fetchSiteData();
  }, []);

  const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-primary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-primary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-primary)]" />,
    Linkedln: <FaLinkedin className="text-[var(--rv-primary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-primary)]" />,
  };

  return (
    <div className="side-menu-wrapper fixed inset-0 bg-black bg-opacity-50 z-[999999]">
      <div className="side-menu-content bg-white w-[500px] h-full fixed right-0 top-0 overflow-y-auto">
        {/* Close button */}
        <button
          className="side-menu-toggler absolute top-10 right-5 h-5 w-10"
          onClick={toggleSideMenu}
        >
          <span></span>
          <span></span>
        </button>

        {/* Logo */}
        <div className="side-menu-logo-box">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              className="w-48 mx-auto"
              width={200}
              height={200}
            />
          </Link>
        </div>

        {/* Contact Info */}
        <div className="side-menu-container p-6 font-medium">
          <div className="mb-4 flex items-start flex-col">
            <h6 className="font-medium">Office</h6>
            <div className="flex flex-col">
              <div className="flex items-start justify-start  text-left">
                <p className="text-2xl font-semibold uppercase w-9 h-9 bg-[var(--rv-secondary-foreground)] rounded-full flex items-center justify-center">
                  <IoLocationSharp className="text-[var(--rv-secondary)]" />
                </p>
                {siteData?.mapurl ? (
                  <Link
                    href={`${siteData?.mapurl}`}
                    target="_blank"
                    className="hover:underline w-72 ml-3"
                  >
                    {siteData?.address}
                  </Link>
                ) : (
                  <p className="w-72 ml-3">{siteData?.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 flex items-start flex-col">
            <h6 className="font-medium">Mobile</h6>
            <div className="flex">
              <p className="text-2xl font-semibold uppercase w-9 h-9 bg-[var(--rv-secondary-foreground)] rounded-full flex items-center justify-center">
                <IoCall className="text-[var(--rv-secondary)]" />
              </p>
              <Link
                href={`tel:${siteData?.mobile}`}
                className="hover:underline ml-3"
              >
                {siteData?.mobile}
              </Link>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 flex items-start flex-col">
            <h6 className="font-medium">Email</h6>
            <div className="flex">
              <p className="text-2xl font-semibold uppercase w-9 h-9 bg-[var(--rv-secondary-foreground)] rounded-full flex items-center justify-center">
                <IoMail className="text-[var(--rv-secondary)]" />
              </p>
              <Link
                href={`mailto:${siteData?.email}`}
                className="hover:underline ml-3"
              >
                {siteData?.email}
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="side-menu-social-media flex space-x-4 mt-6 px-6">
          {socialMedia
            ?.filter((link) => !link.isHidden)
            ?.map((link, index) => (
              <Link key={index} target="_blank" href={link?.url}>
                <div className="text-2xl font-semibold uppercase w-9 h-9 border bg-white rounded-full flex items-center justify-center">
                  {iconMap[link.title] || (
                    <FaFacebookF className="text-[var(--rv-primary)]" />
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSideMenu;

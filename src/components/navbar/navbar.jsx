"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeaderSideMenu from "./headerSidemenu";
import "./header.css";
import MobileHeaderSideMenu from "./mobileSidemenu";
import { usePathname } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";

export function Navbar({ services }) {
  const pathname = usePathname();
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const [isMobileSideMenuOpen, setMobileSideMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!isSideMenuOpen);
  };

  const toggleMobileSideMenu = () => {
    setMobileSideMenuOpen(!isMobileSideMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerScrollPos = 300;
      if (window.scrollY > headerScrollPos) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${pathname === "/" ? "absolute " : "relative flex"
          } main-header ${pathname === "/" ? "home-header" : ""} w-full z-[99] 
  ${isSticky ? "sticky-header--cloned sticky-fixed" : ""}`}
      >
        <div className="container px-10 mx-auto">
          <nav className="main-menu flex items-center lg:space-x-[30px]">
            {/* Logo Section */}
            <div
              className={`main-menu-logo ${isSticky ? "max-w-[300px]" : "max-w-[300px]"
                } text-center ml-5 pr-5`}
            >
              <Link href="/">
                <img
                  src="/images/logo.png"
                  alt="Best View Investment Services"
                  className="h-[auto] md:h-[90px] w-auto"
                />
              </Link>
            </div>

            {/* Menu Section */}
            <div className="main-menu-inner flex items-center grow font-semibold">
              <ul
                className={`main-menu-list hidden ${isSticky ? " py-[20px] pl-[80px]" : " py-[40px] pl-[80px]"
                  } `}
              >
                <li className="menu-item-children ">
                  <Link href="/">Home</Link>
                  <i className="fa-solid fa-chevron-down"></i>
                </li>
                <li className="menu-item-children">
                  <Link href="/about-us">About Us</Link>
                </li>
                <li className="menu-item-children">
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li className="menu-item-children">
                  <Link href="#">Tools</Link>
                  <FaAngleDown />
                  <ul className={`menu-item-children-list`}>
                    <li>
                      <Link href="/tools/calculators">
                        Financial Calculators
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/financial-health">
                        Check Financial Health
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/news">Market News</Link>
                    </li> */}
                    <li>
                      <Link href="/performance/fund-performance">
                        Fund Performance
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/pay-premium-online">
                        Pay Premium Online
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/useful-links">Useful Links</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-children">
                  <Link href="#">Services</Link>
                  <FaAngleDown />
                  <ul className={`menu-item-children-list`}>
                    {services?.map((item, index) => (
                      <li key={index}>
                        <Link href={`/services/${item?.link}`}>
                          {item?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item-children">
                  <Link href="/contact-us">Contact Us</Link>
                </li>
                {/* <li className="menu-item-children">
                  <Link href="/login">Login</Link>
                </li> */}
              </ul>

              {/* Collapsing Menu Button */}
              <div
                className={`header-menu-collaps `}
                onClick={toggleMobileSideMenu}
              >
                <span
                  className={`line-1 ${isSticky
                      ? "bg-[var(--rv-primary)]"
                      : "bg-[var(--rv-primary)]"
                    }`}
                ></span>
                <span
                  className={`line-2 ${isSticky
                      ? "bg-[var(--rv-primary)]"
                      : "bg-[var(--rv-primary)]"
                    }`}
                ></span>
                <span
                  className={`line-3 ${isSticky
                      ? "bg-[var(--rv-primary)]"
                      : "bg-[var(--rv-primary)]"
                    }`}
                ></span>
              </div>

              {/* Right-side Actions */}
              <div className="main-menu-right">
                <Link
                  href="/login"
                  className="btn btn-light btn-theme btn-primary"
                >
                  <span>L</span>
                  <span>o</span>
                  <span>g</span>
                  <span>i</span>
                  <span>n</span>
                </Link>

                {/* Side Menu Toggle */}
                <div className="header-side-menu" onClick={toggleSideMenu}>
                  <span className="line-1"></span>
                  <span className="line-2"></span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* SideMenu Popup */}
        {isSideMenuOpen && <HeaderSideMenu toggleSideMenu={toggleSideMenu} />}
        {isMobileSideMenuOpen && (
          <MobileHeaderSideMenu
            toggleSideMenu={toggleMobileSideMenu}
            services={services}
          />
        )}
      </header>
    </>
  );
}

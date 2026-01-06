import React, { useState } from "react";
// import './sideMenu.css'; // Assuming you'll add the styling for this component
import "./mobileSideMenu.css";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
const MobileHeaderSideMenu = ({ toggleSideMenu, services }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (menu) => {
    setIsMenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className="mobile-nav-wrapper">
      <div
        className="mobile-nav-overlay mobile-nav-toggler"
        onClick={toggleSideMenu}
      ></div>

      <div className="mobile-nav-content">
        <a
          href="#"
          className="mobile-nav-close mobile-nav-toggler "
          onClick={toggleSideMenu}
        >
          <span className="bg-[var(--rv-primary)]"></span>
          <span className="bg-[var(--rv-primary)]"></span>
        </a>

        <div className="logo-box">
          <a href="/">
            <img width="150" src="/images/logo.png" alt="logo" />
          </a>
        </div>

        <div className="mobile-nav-container">
          <ul className="mobile-menu-list">
            {/* Home Menu */}
            <li className="menu-item-has-children dropdown">
              <Link href="/" onClick={toggleSideMenu}>
                Home
              </Link>
            </li>

            <li className="menu-item-has-children dropdown">
              <Link href="/about-us" onClick={toggleSideMenu}>
                About us
              </Link>
            </li>

            <li className="menu-item-children">
              <Link href="/gallery" onClick={toggleSideMenu}>
                Gallery
              </Link>
            </li>
            {/* Pages Menu */}
            <li className="menu-item-has-children dropdown">
              <Link href="#" onClick={() => toggleMenu("tools")}>
                Tools
                <button aria-label="dropdown toggler">
                  {isMenuOpen.tools ? <FaAngleDown /> : <FaAngleRight />}
                </button>
              </Link>
              {isMenuOpen.tools && (
                <ul>
                  <li>
                    <Link onClick={toggleSideMenu} href="/tools/calculators">
                      Financial Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleSideMenu}
                      href="/tools/financial-health"
                    >
                      Financial Health
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleSideMenu}
                      href="/performance/fund-performance"
                    >
                      Fund Performance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/pay-premium-online"
                      onClick={toggleSideMenu}
                    >
                      Pay Premium Online
                    </Link>
                  </li>
                  <li>
                    <Link onClick={toggleSideMenu} href="/tools/useful-links">
                      Useful Links
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Services Menu */}
            <li className="menu-item-has-children dropdown">
              <a href="#" onClick={() => toggleMenu("services")}>
                Services
                <button aria-label="dropdown toggler">
                  {isMenuOpen.services ? <FaAngleDown /> : <FaAngleRight />}
                </button>
              </a>
              {isMenuOpen.services && (
                <ul>
                  {services?.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={toggleSideMenu}
                        href={`/services/${item?.link}`}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Portfolio Menu */}
            <li className="menu-item-has-children dropdown">
              <Link href="/news" onClick={toggleSideMenu}>
                Market News
              </Link>
            </li>

            {/* Blog Menu */}
            <li className="menu-item-has-children dropdown">
              <Link href="/contact-us" onClick={toggleSideMenu}>
                Contact Us
              </Link>
            </li>

            {/* Shop Menu */}
            <li className="menu-item-has-children dropdown">
              <Link href="/login" onClick={toggleSideMenu}>
                Login
              </Link>
            </li>
            <li className="menu-item-has-children dropdown">
              <Link
                href="https://diy.sharekhan.com/app/Account/Register?grpcd=437&type=fr&grpid=492"
                target="_blank"
              >
                Open Demat
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileHeaderSideMenu;

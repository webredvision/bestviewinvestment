import React, { useState } from "react";
// import './sideMenu.css'; // Assuming you'll add the styling for this component
import "./mobileSideMenu.css";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { MAIN_MENU_ITEMS } from "./menuOptions";
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
            {MAIN_MENU_ITEMS.map((menuItem) => {
              if (menuItem.key === "tools") {
                return (
                  <li key={menuItem.key} className="menu-item-has-children dropdown">
                    <Link href="#" onClick={() => toggleMenu("tools")}>
                      {menuItem.label}
                      <button aria-label="dropdown toggler">
                        {isMenuOpen.tools ? <FaAngleDown /> : <FaAngleRight />}
                      </button>
                    </Link>
                    {isMenuOpen.tools && (
                      <ul>
                        {menuItem.children.map((childItem) => (
                          <li key={childItem.href}>
                            <Link onClick={toggleSideMenu} href={childItem.href}>
                              {childItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              if (menuItem.key === "services") {
                return (
                  <li key={menuItem.key} className="menu-item-has-children dropdown">
                    <a href="#" onClick={() => toggleMenu("services")}>
                      {menuItem.label}
                      <button aria-label="dropdown toggler">
                        {isMenuOpen.services ? (
                          <FaAngleDown />
                        ) : (
                          <FaAngleRight />
                        )}
                      </button>
                    </a>
                    {isMenuOpen.services && (
                      <ul>
                        {services?.map((serviceItem, index) => (
                          <li key={index}>
                            <Link
                              onClick={toggleSideMenu}
                              href={`/services/${serviceItem?.link}`}
                            >
                              {serviceItem?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li
                  key={menuItem.href}
                  className="menu-item-has-children dropdown"
                >
                  <Link href={menuItem.href} onClick={toggleSideMenu}>
                    {menuItem.label}
                  </Link>
                </li>
              );
            })}

            <li className="menu-item-has-children dropdown">
              <Link href="/login" onClick={toggleSideMenu}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileHeaderSideMenu;

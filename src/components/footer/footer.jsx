"use client";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import styles from "./Footer.module.css";

const Footer = ({ siteData, servicedata, arn, socialMedia }) => {
  const arnNumber = arn?.[0]?.arn || siteData?.arnNo;
  const euinNumber = arn?.[0]?.euins?.[0]?.euin || siteData?.euinNo;

  const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-secondary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-secondary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-secondary)]" />,
    Linkedln: <FaLinkedin className="text-[var(--rv-secondary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-secondary)]" />,
  };

  const quicklinks = [
    { title: "About Us", link: "/about-us" },
    { title: "Contact Us", link: "/contact-us" },
    { title: "Market News", link: "/news" },
    { title: "Financial Calculator", link: "/tools/calculators" },
    { title: "Financial Health", link: "/tools/financial-health" },
  ];

  const amfisabilinks = [
    { title: "Risk Factors ", link: "/footer-page/risk-factors" },
    { title: "Terms & Conditions ", link: "/footer-page/terms-conditions" },
    {
      title: "SID/SAI/KIM ",
      link: "https://www.sebi.gov.in/filings/mutual-funds.html",
      target: "_black",
    },
    {
      title: "Code of Conduct ",
      link: "/images/AMFI_Code-of-Conduct.pdf",
      target: "_black",
    },
    {
      title: "Investor Grievance Redressal ",
      link: "/footer-page/investor-grievance-redressal",
    },
    { title: "Important links", link: "/footer-page/important-links" },
    {
      title: "SEBI Circulars ",
      link: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Mutual+Funds",
      target: "_black",
    },
    { title: "Privacy Policy", link: "/privacy-policy" },
    {
      title: "Commission Disclosures",
      link: "/footer-page/commission-disclosures",
    },
  ];

  return (
    <>
      <footer className={`section-design  ${styles.footer} text-black`}>
        <div className="mx-auto w-full max-w-screen-2xl ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 py-6 px-4 lg:px-0">
            <div className="md:col-span-4">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={240}
                height={70}
                className="h-[54px] w-auto rounded-[var(--rv-radius)]"
              />
              <p className="mt-2 py-4 line-clamp-6 text-justify">
                {siteData?.description}
              </p>
            </div>

            <div className="md:col-span-2 md:pl-6">
              <h4 className="mb-5 font-bold">Services</h4>
              <ul>
                {servicedata?.map((sub, index) => (
                  <li className="mb-4" key={index}>
                    {!sub?.children || sub.children.length === 0 ? (
                      <Link
                        href={`/services/${sub?.link}`}
                        className="hover:text-[var(--rv-primary)]"
                      >
                        <p>{sub?.name}</p>
                      </Link>
                    ) : (
                      <ul>
                        {sub?.children.map((child, childIndex) => (
                          <li key={childIndex} className="mb-1">
                            <Link
                              href={child.link}
                              className="hover:text-[var(--rv-primary)]"
                            >
                              <p>{child.name}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 md:pl-6">
              <h4 className="mb-5 text-md font-bold">Quick Links</h4>
              <ul>
                {quicklinks?.map((sub, index) => (
                  <li className="mb-3" key={index}>
                    <Link
                      href={sub.link}
                      className="hover:text-[var(--rv-primary)]"
                    >
                      <p>{sub.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 md:pl-6">
              <h4 className="mb-5 text-md font-bold">Contact Us</h4>
              <ul className="font-medium">
                <li className="mb-5">
                  <div className="font-medium">
                    <div className="mb-4 flex items-start flex-col">
                      <h6 className="font-medium">Office</h6>
                      <div className="flex flex-col">
                        <div className=" flex items-center">
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

                    <div className="mb-4 flex items-start flex-col">
                      <h6 className="font-medium">Mobile</h6>
                      <div className="flex">
                        <p className="text-2xl font-semibold uppercase w-9 h-9 bg-[var(--rv-secondary-foreground)] rounded-full flex items-center justify-center">
                          <IoCall className="text-[var(--rv-secondary)]" />
                        </p>
                        <Link
                          href={`tel:${siteData?.mobile}`}
                          className="hover:underline w-72 ml-3"
                        >
                          {siteData?.mobile}
                        </Link>
                      </div>
                    </div>

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

                    <div className="flex gap-x-3 justify-start">
                      {socialMedia
                        ?.filter((link) => !link.isHidden)
                        ?.map((link, index) => (
                          <Link
                            key={index}
                            target="_blank"
                            href={link.url}
                            className="flex items-center justify-center gap-2"
                          >
                            <div className="text-2xl font-semibold uppercase w-9 h-9 border bg-white rounded-full flex items-center justify-center">
                              {iconMap[link.title] || (
                                <FaFacebookF className="text-[var(--rv-secondary)]" />
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-x-3 justify-center"></div>
          <div className="text-gray-50 py-3 md:px-1 px-4 text-center">
            <p className="py-1 text-center">
              {siteData?.websiteName} is an AMFI Registered Mutual Fund
              Distributor
              {arnNumber && <> | ARN: {arnNumber}</>}
              {!arn?.[0]?.euins?.length && euinNumber && (
                <> | EUIN: {euinNumber}</>
              )}
              {arn?.[0]?.euins?.length > 0 &&
                arn[0].euins[0]?.registrationDate &&
                arn[0].euins[0]?.expiryDate && (
                  <>
                    {" | Current Validity: "}
                    {new Date(
                      arn[0].euins[0].registrationDate
                    ).toLocaleDateString("en-IN")}
                    {" to "}
                    {new Date(arn[0].euins[0].expiryDate).toLocaleDateString(
                      "en-IN"
                    )}
                  </>
                )}
            </p>
            <div className={styles.footersabiLink}>
              <ul>
                {amfisabilinks?.map((sub, index) => (
                  <li key={index}>
                    <Link
                      href={sub?.link}
                      target={`${sub?.target ? sub?.target : "_self"}`}
                    >
                      {sub?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="py-2 text-center">
              Disclaimer: Mutual Fund investments are subject to market risks,
              read all scheme related documents carefully. The NAVs of the
              schemes may go up or down depending upon the factors and forces
              affecting the securities market including the fluctuations in the
              interest rates. The past performance of the mutual funds is not
              necessarily indicative of future performance of the schemes. The
              Mutual Fund is not guaranteeing or assuring any dividend under any
              of the schemes and the same is subject to the availability and
              adequacy distributable surplus.
            </p>
            <p className="py-2 text-center">
              {siteData?.websiteName} makes no warranties or representations,
              express or implied, on products offered through the platform of{" "}
              {siteData?.websiteName}. It accepts no liability for any damages
              or losses, however, caused, in connection with the use of, or on
              the reliance of its product or related services. Terms and
              conditions of the website are applicable. Investments in
              Securities markets are subject to market risks, read all the
              related documents carefully before investing.
            </p>
          </div>
          <div className="text-gray-50 py-3 flex justify-center">
            <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-8 justify-center items-center text-center">
              <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-3 items-center">
                <Image
                  src={"/images/amfi-logo.jpg"}
                  width={100}
                  height={100}
                  alt="AMFI Logo"
                  className="rounded"
                />
                <div>
                  {arnNumber && <p>ARN - {arnNumber}</p>}
                  {euinNumber && <p>EUIN - {euinNumber}</p>}
                </div>
              </div>

              <Image
                src={"/images/mutualfund.png"}
                width={250}
                height={100}
                alt="Mutual Fund Logo"
                className="rounded"
              />
            </div>
          </div>

          <div className="text-gray-50 w-full mx-auto max-w-screen-xl p-4 md:flex md:justify-between border-t border-gray-300">
            <p className="sm:text-center">
              © {new Date().getFullYear()}{" "}
              <Link href="/" className="hover:underline">
                {siteData?.websiteName}
              </Link>
              . All Rights Reserved.
            </p>
            {siteData?.websiteDomain ? (
              <p className="mt-3 sm:mt-0">
                <Link
                  href={siteData.websiteDomain}
                  className="hover:underline"
                  target="_blank"
                >
                  bestviewinvestment.com
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${siteData?.whatsAppNo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
};

export default Footer;

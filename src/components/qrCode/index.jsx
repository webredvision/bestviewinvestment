"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./qrcode.module.css";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function QRCode({ sitedata }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.qr}>
      <ul className="flex flex-col space-y-3">
        <li className={styles.qrItem}>
          <div className={styles.qrLink} ref={boxRef}>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              <Image
                src="/images/qr.svg"
                alt="Download App"
                width={50}
                height={50}
              />
            </button>

            {/* Keep mounted, toggle animation */}
            <div
              className={`${styles.qrBox} ${
                open ? styles.qrOpen : styles.qrClose
              }`}
            >
              <p className="text-center font-semibold">
                Scan to Download <br />
                {sitedata?.websiteName} App
              </p>

              <Image
                src="/images/applink.png"
                alt="QR Code"
                width={150}
                height={150}
              />

              {(sitedata?.appsappleurl || sitedata?.appsplaystoreurl) && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  {sitedata?.appsappleurl && (
                    <Link
                      href={sitedata.appsappleurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                      <FaApple size={20} />
                    </Link>
                  )}

                  {sitedata?.appsplaystoreurl && (
                    <Link
                      href={sitedata.appsplaystoreurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      <FaGooglePlay size={20} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

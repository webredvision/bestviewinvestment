"use client";
import Link from "next/link";
import styles from "./qrcode.module.css";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa"; // icons for app store & play store

export default function QRCode({ sitedata }) {
  return (
    <div className={styles.qr}>
      <ul className="flex flex-col space-y-3">
        <li className={styles.qrItem}>
          <div className={styles.qrLink}>
            <Image
              src="/images/qr.svg" // your small WhatsApp icon
              alt="WhatsApp"
              width={50}
              height={50}
            />
            {/* Popover box */}
            <div className={styles.qrBox}>
              <p className="text-center font-semibold">
                Scan to Download <br />
                {sitedata.websiteName} App
              </p>
              <Image
                src="/images/applink.svg"
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

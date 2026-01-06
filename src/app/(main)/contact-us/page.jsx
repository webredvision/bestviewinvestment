import ContactReusableForm from "@/components/landing/contactSection/Contactreusableform";
import InnerBanner from "@/components/innerBanner/InnerBanner";
import { getSiteData } from "@/lib/functions";
import { Building2, Phone, Mail } from "lucide-react";
import Link from "next/link";
import style from "./Contactus.module.css";

export default async function ContactUs() {
  const sitedata = await getSiteData();

  return (
    <div>
      <InnerBanner pageName="Contact Us" />

      <div className={`max-w-screen-xl mx-auto main-section`}>
        {/* Row 1: Contact Info Cards */}
        <div className={style.infoCardsRow}>
          <div className={style.card}>
            <div className="flex gap-1">
              <Mail size={32} className={style.icon} />
              <h3>Mail Us</h3>
            </div>

            {sitedata?.email && (
              <Link href={`mailto:${sitedata.email}`}>{sitedata.email}</Link>
            )}
          </div>

          <div className={style.card}>
            <div className="flex gap-1">
              <Building2 size={32} className={style.icon} />
              <h3>Office</h3>
            </div>
            {sitedata?.mapurl && sitedata?.address ? (
              <Link
                href={sitedata.mapurl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sitedata.address}
              </Link>
            ) : (
              sitedata?.address && <p>{sitedata.address}</p>
            )}
          </div>

          <div className={style.card}>
            <div className="flex gap-1">
              <Phone size={32} className={style.icon} />
              <h3>Mobile</h3>
            </div>
            {sitedata?.mobile && (
              <Link
                href={`tel:${sitedata.mobile}`}
                className="flex items-center gap-1"
              >
                {sitedata.mobile}
              </Link>
            )}
          </div>
        </div>

        {/* Row 2: Form and Map */}
        <div className={style.lowerGrid}>
          <div className={style.formWrapper}>
            <ContactReusableForm sitedata={sitedata} />
          </div>

          {sitedata?.iframe && (
            <div className={style.mapWrapper}>
              <iframe
                src={sitedata.iframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Location Map"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

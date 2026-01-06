import { getSiteData } from "@/lib/functions";
import Image from "next/image";
import "./AboutSection.css";
import Link from "next/link";
import HomeHeading from "../heading/heading";

export const metadata = {
  title: "About Us | Best View Investment Services Private Limited",
  description:
    "Learn about Best View Investment Services Private Limited and how we help you invest with clarity, protect what matters, and plan for the future.",
};

export default async function AboutSection({ aboutData }) {
  const siteData = await getSiteData();
  const description =
    aboutData && aboutData.length > 0 ? aboutData[0].description : "";

  return (
    <div className="main-section section-design">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="about-left-one">
              <Image
                src="/images/aboutus/who-we-are.webp"
                alt="About Us"
                className="img-fluid w-full md:w-[610px] rounded-md shadow mt-1"
                width={700}
                height={200}
              />
            </div>
          </div>

          <div>
            <div className="about-right-one">
              <HomeHeading title="Building Wealth, Preserving Trust" subtitle="Who We Are" />
              <div
                className="about-details-one animate fadeInUp wow"
                data-wow-duration="1500ms"
                data-wow-delay="300ms"
              >
                <div className="about-logo-one">
                  <div
                    className="lead"
                    dangerouslySetInnerHTML={{
                      __html: description || siteData?.description || "",
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-6">
                  <div className="about-project-one">
                    <h4>{siteData?.arnNo || "—"}</h4>
                    <p>ARN (AMFI Registration)</p>
                  </div>
                  <div className="about-project-one">
                    <h4>{siteData?.euinNo || "—"}</h4>
                    <p>EUIN</p>
                  </div>
                </div>
              </div>

              <Link
                href="/about-us"
                className="btn-two btn-secondary btn-theme mt-6 inline-block"
              >
                <span>K</span>
                <span>n</span>
                <span>o</span>
                <span>w</span>
                <span className="space"></span>
                <span>M</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
                <span className="space"></span>
                <span>+</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


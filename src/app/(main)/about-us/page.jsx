import Image from "next/image";
import InnerBanner from "@/components/innerBanner/InnerBanner";
import styles from "./AboutUs.module.css";
import AboutCTA from "./AboutCTA";
import { getAboutus, getSiteData, getTeams } from "@/lib/functions";
import TeamSection from "@/components/landing/teamSection/teamSection";

export const metadata = {
  title: "About Us | Best View Investment Services",
  description:
    "Learn about our client-first approach to mutual funds, Gift City offerings, and health & life insurance solutions.",
};

function Introduction({ aboutData, siteName }) {
  const hasCms = Boolean(aboutData?.[0]?.title || aboutData?.[0]?.description);
  const imageUrl = aboutData?.[0]?.image?.url || "/images/aboutus/about-page.webp";

  return (
    <div className="main-section">
      <div className="max-w-screen-xl mx-auto">
        <section className={styles.aboutSection}>
          <div className={styles.aboutcontainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                alt={`About ${siteName}`}
                width={500}
                height={600}
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <h2 className={styles.title}>
                {hasCms ? aboutData[0].title : "Building Wealth With Care"}
              </h2>
              {hasCms ? (
                <div
                  className={styles.paragraph}
                  dangerouslySetInnerHTML={{ __html: aboutData[0].description }}
                />
              ) : (
                <div className={styles.paragraph}>
                  <p>
                    {siteName} provides goal-based financial guidance with a
                    focus on transparency, ethical advice, and long-term
                    relationships.
                  </p>
                  <p className="mt-4">
                    We offer Mutual Funds, Gift City (IFSC) related solutions,
                    Health Insurance, and Life Insurance—so you can plan, grow,
                    and protect your financial future with confidence.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MissionVisionSection() {
  return (
    <div className="main-section py-16 section-design">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className={styles.mvvContainer}>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <div className={styles.content}>
                <h3 className={styles.title}>Our Mission</h3>
                <p className={styles.text}>
                  To provide ethical, personalized, and goal-oriented financial
                  solutions—built on trust, transparency, and long-term value.
                </p>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/aboutus/mission.webp"
                  alt="Our Mission"
                  width={500}
                  height={300}
                  className={styles.image}
                />
              </div>
            </div>

            <div className={`${styles.card} ${styles.reverse}`}>
              <div className={styles.content}>
                <h3 className={styles.title}>Our Vision</h3>
                <p className={styles.text}>
                  To be recognized as a trusted financial services firm that
                  delivers a consistently great client experience through
                  clarity, care, and responsible advice.
                </p>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/aboutus/vision.webp"
                  alt="Our Vision"
                  width={500}
                  height={300}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApproachSection({ siteName }) {
  return (
    <div className="main-section">
      <div className="max-w-screen-xl mx-auto">
        <section className={styles.aboutSection}>
          <h2 className={styles.title}>Our Approach</h2>
          <div className={`${styles.legacySection} reverse`}>
            <div className={styles.legacyImageWrapper}>
              <Image
                src="/images/aboutus/our-approach.webp"
                alt="Our Approach"
                width={500}
                height={600}
                className={styles.image}
              />
            </div>
            <div className={styles.legacycontent}>
              <p>
                At <strong>{siteName}</strong>, we keep things simple: understand
                your goals, explain options clearly, and support you at every
                step.
              </p>
              <p className="mt-4">
                We focus on the services most clients actually need—Mutual
                Funds, Gift City offerings, Health Insurance, and Life
                Insurance—delivered with a client-first mindset.
              </p>
              <p className="mt-4">
                Our work is driven by transparency and long-term relationships,
                not short-term promises.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default async function AboutUs() {
  const [aboutData, aboutteamdata, sitedata] = await Promise.all([
    getAboutus(),
    getTeams(),
    getSiteData(),
  ]);

  const siteName = sitedata?.websiteName || "Best View Investment Services";

  return (
    <div className={styles.aboutPage}>
      <InnerBanner pageName="About Us" />
      <Introduction aboutData={aboutData} siteName={siteName} />
      <MissionVisionSection />
      <ApproachSection siteName={siteName} />
      <TeamSection aboutteamdata={aboutteamdata} />
      <AboutCTA sitedata={sitedata} />
    </div>
  );
}


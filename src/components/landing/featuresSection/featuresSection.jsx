"use client";
import React from "react";
import Link from "next/link";
import styles from './FeaturesSection.module.css';
import Image from "next/image";
import SectionHeading from "../../sectionHeading/sectionHeading";

export default function FeaturesSection() {
    const sectionDescription = "Discover the powerful tools and features we offer to help you manage your investments, track your financial goals, and make informed decisions with ease.";
    const features = [
        {
            title: "Portfolio Analysis",
            icon: "/images/features/portfolio-analysis.png",
            description: "Gain deep insights into your investment portfolio with detailed analytics, performance tracking, and risk assessment to optimize your returns."
        },
        {
            title: "Invest Online",
            icon: "/images/features/invest-online.png",
            description: "Seamlessly invest in a wide range of mutual funds, stocks, and other financial products online with just a few clicks."
        },
        {
            title: "Goal Tracker",
            icon: "/images/features/goal-tracker.png",
            description: "Set and monitor your financial goals, such as retirement or education savings, and stay on track with personalized recommendations."
        },
        {
            title: "Research",
            icon: "/images/features/track-your-fund.png",
            description: "Access in-depth research reports, market trends, and fund performance data to make well-informed investment decisions."
        },
    ];
    return (
        <div className="relative w-full overflow-hidden">
            <div className={`${styles.featuresContainer} max-w-screen-xl mx-auto`}>
                <div className={`${styles.textContent} px-4`}>
                    <SectionHeading
                        heading="Features"
                        title="Top Features We Provide"
                        variant="light"
                        align="start"
                    />
                    <p className={`${styles.paragraph} my-5 text-xl max-w-6xl`}>
                        {sectionDescription}
                    </p>
                    <Link href="/login" className={"btn"}>
                        Know More
                    </Link>
                </div>
                <div className={styles.cardsContainer}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card} data-aos="fade-left" data-aos-duration="1000">
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={60}
                                height={60}
                                className={styles.cardIcon}
                            />
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import './whytochoose.css';
import Link from 'next/link';
import Image from 'next/image';
import HomeHeading from '../heading/heading';

const WhyChooseSection = () => {
    const tools = [
        {
            title: "Financial Calculator",
            link: "/tools/calculators",
            image: "/images/tools/calculator.svg",
        },
        {
            title: "Check Financial Health",
            link: "/tools/financial-health",
            image: "/images/tools/financial-health.svg",
        },
        {
            title: "Fund Performance",
            link: "/performance/fund-performance",
            image: "/images/tools/fund-performance.svg",
        },
        {
            title: "Useful Links",
            link: "/tools/useful-links",
            image: "/images/tools/useful links.svg",
        },
    ]
    return (
        <div className="why-choose-section-one ">
            <div className="why-choose-background-one">
                <div className="why-choose-background-image-one">
                    <img
                        src="/images/banners/financial-calculators.webp"
                        alt="why-choose-image"
                        style={{ transition: 'transform 0.8s ease-out', transform: 'translateY(216.65px) scale(1.2)' }}
                    />
                    <div className="main-section">
                        <div className="max-w-screen-xl mx-auto">
                            <HomeHeading
                                title="Plan Better. Invest Smarter."
                                subtitle="Financial Tools & Calculators"
                                className="text-center mb-10"
                                dark={true}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="counter-one counter-animated">
                    {tools?.map((item, index) => (
                        <div className="counter-box-one active" key={index}>
                            <div className="counter-box-one-inner">
                                <div className="counter-icon">
                                    <Image src={item?.image} alt="icon" width={70} height={100} />
                                </div>
                                <Link href={item.link}>
                                    <h4><span className="counter">{item?.title}</span></h4>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseSection;

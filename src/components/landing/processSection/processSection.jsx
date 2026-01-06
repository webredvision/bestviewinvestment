import React from 'react';
import "./processSection.css"
import Image from 'next/image';
import HomeHeading from '../heading/heading';

const ProcessSection = () => {
  const processSteps = [
    {
      id: 1,
      title: 'KYC',
      icon: '/images/vectors/kyc.svg',
      image: '/images/vectors/kyc.svg',
      description: 'Complete your KYC seamlessly online to begin your mutual fund investment journey without any hassle.',
    },
    {
      id: 2,
      title: 'Research',
      icon: '/images/vectors/research.svg',
      image: '/images/vectors/research.svg',
      description: 'Explore mutual funds, compare options, and choose the right scheme that matches your financial goals.',
    },
    {
      id: 3,
      title: 'Invest',
      icon: '/images/vectors/invest.svg',
      image: '/images/vectors/invest.svg',
      description: 'Start investing instantly in different mutual funds through a secure and paperless platform.',
    },
    {
      id: 4,
      title: 'Track',
      icon: '/images/vectors/track.svg',
      image: '/images/vectors/track.svg',
      description: 'Monitor your portfolio, view returns, and stay updated with real-time insights anytime, anywhere.',
    },
  ];

  return (
    <div className="main-section ">
      <div className="max-w-screen-xl mx-auto">
        <HomeHeading
          title="Our Process, Your Peace of Mind"
          subtitle="How We Work"
        />

        <div className="process-inner-one">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className="process-box-one animate fadeInRight wow"
              data-wow-duration="2000ms"
              data-wow-delay={`${index * 200}ms`}
            >
              <Image src={"/images/how-does-it-work.webp"} alt="process" width={200} height={200} />
              <div className="process-icon-one ">
                <Image src={step.icon} alt="icon" width={70} height={100} />
              </div>
              <h4>
                <span>{`${step.id < 10 ? '0' : ''}${step.id}. `}</span>
                {step.title}
              </h4>
              <p className="lead">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;

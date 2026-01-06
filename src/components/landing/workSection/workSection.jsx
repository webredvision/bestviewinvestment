import React from 'react';
import "./workSection.css";
import HomeHeading from '../heading/heading';

const WorkSection = () => {
  return (
    <div className="work-section-one main-section">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-content-between align-items-center gap-10">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="work-left-one">
              <HomeHeading
                title="Your Financial Journey Starts Here"
                subtitle="Wealth Management with Trust & Expertise"
                dark="true"
              />
              <div
                className="work-details-one animate fadeInUp wow animated"
                data-wow-duration="1500ms"
                data-wow-delay="400ms"
                style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '400ms', animationName: 'fadeInUp' }}
              >
                <p className="lead-lg">
                  Start your journey toward financial confidence. We help you plan, invest, and protect your future with clarity and care.
                </p>
                <p className="lead">
                  From Mutual Funds to Gift City opportunities and Health & Life Insurance, we provide personalized guidance designed around your goals and risk comfort.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">
            <div className="work-right-one">
              
              {/* Get Started Button */}
              <div className="work-btn">
                <a href="/login" className="btn btn-primary btn-theme">
                  <span>G</span><span>e</span><span>t</span><span className="space"></span>
                  <span>S</span><span>t</span><span>a</span><span>r</span><span>t</span><span>e</span><span>d</span>
                  <span className="space"></span><span>+</span>
                </a>
              </div>

              {/* Progress Bars */}
              <div
                className="work-process-one animate fadeInRight wow animated"
                data-wow-duration="1500ms"
                style={{ visibility: 'visible', animationDuration: '1500ms', animationName: 'fadeInRight' }}
              >
                <div className="work-process-title">
                  <p>Goal Planning</p>
                  <p className="work-process-text">Strong</p>
                </div>
                <div className="work-processing">
                  <span style={{ width: '90%' }}></span>
                </div>
              </div>

              <div
                className="work-process-one animate fadeInRight wow animated"
                data-wow-duration="1500ms"
                data-wow-delay="200ms"
                style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '200ms', animationName: 'fadeInRight' }}
              >
                <div className="work-process-title">
                  <p>Portfolio Review</p>
                  <p className="work-process-text">Strong</p>
                </div>
                <div className="work-processing">
                  <span style={{ width: '85%' }}></span>
                </div>
              </div>

              <div
                className="work-process-one animate fadeInRight wow animated"
                data-wow-duration="1500ms"
                data-wow-delay="400ms"
                style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '400ms', animationName: 'fadeInRight' }}
              >
                <div className="work-process-title">
                  <p>Client Support</p>
                  <p className="work-process-text">Strong</p>
                </div>
                <div className="work-processing">
                  <span style={{ width: '95%' }}></span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkSection;

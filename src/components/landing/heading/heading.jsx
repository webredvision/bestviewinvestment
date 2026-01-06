import React from 'react';
import styles from './Heading.module.css';

const HomeHeading = ({ title, subtitle, description, dark = false }) => {
    return (
        <div className={styles.headingBox}>
            {subtitle && (
                <span
                    className={`${styles.subTitle} animate fadeInUp wow ${dark ? styles.subTitleDark : ''
                        }`}
                    data-wow-duration="1500ms"
                >
                    {subtitle}
                </span>
            )}
            {title && (
                <h2
                    className={`${styles.headingTitle} animate fadeInUp wow ${dark ? styles.headingTitleDark : ''
                        }`}
                    data-wow-duration="1500ms"
                    data-wow-delay="200ms"
                >
                    {title}
                </h2>
            )}
            {description && (
                <div
                    className="service-left-details-one animate fadeInUp wow"
                    data-wow-duration="1500ms"
                    data-wow-delay="400ms"
                >
                    <p className={`${styles.lead} ${dark ? styles.leadDark : ''}`}>
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default HomeHeading;

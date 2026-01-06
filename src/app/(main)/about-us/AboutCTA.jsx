"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutUs.module.css";

export default function AboutCTA({ sitedata }) {
    return (
        <div className="main-section">
            <div className="max-w-screen-xl mx-auto">
                <div className={styles.ctaSection}>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className={styles.contentWrapper}
                    >
                        <h2 className={styles.heading}>
                            Start Your Journey to Financial Growth Today
                        </h2>
                        <p className={styles.subtext}>
                            At <strong>{sitedata?.websiteName || "Best View Investment Services"}</strong>, we provide <strong>trusted advice</strong> and <strong>customized investment solutions</strong> to help you grow, protect, and achieve your financial goals.
                        </p>
                        <Link href="/contact-us" className={`btn-two btn-theme btn-secondary`}>
                            <span>G</span><span>e</span><span>t</span> <span> </span><span>S</span><span>t</span><span>a</span><span>r</span><span>t</span><span>e</span><span>d</span>
                        </Link>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}

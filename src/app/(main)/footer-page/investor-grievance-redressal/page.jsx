
import InnerBanner from '@/components/innerBanner/InnerBanner';
import styles from '../footerpage.module.css'
import { getSiteData } from "@/lib/functions";

export default async function InvestorGrievanceRedressal() {

    const sitedata = await getSiteData();

    return (
        <div className={`${styles.footerpage} `}>
            <InnerBanner pageName={"Investor Grievance"} />
            <div className="max-w-screen-xl mx-auto main-section">

                <div className="container">
                    <div>
                        <p>At <b>{sitedata.websiteName}</b>, we are committed to delivering transparent, prompt, and reliable services to our valued investors. We recognize the importance of addressing investor grievances fairly and efficiently.</p>
                        <p>If you have any queries, complaints, or feedback regarding our mutual fund distribution services, please feel free to reach out to us:</p>
                        <ul>
                            <li><b>Call:</b>  <a href={`tel:${sitedata.mobile}`}>{sitedata.mobile}</a></li>
                            <li><b>Email:</b> <a href={`mailto:${sitedata.email}`}>{sitedata.email}</a></li>
                            <li><b>Address:</b> <a href={`${sitedata.mapurl}`}>{sitedata.address}</a></li>
                        </ul>
                        <p>We aim to acknowledge and respond to all investor communications within 24 business hours.</p>
                        <p>If your concern is not resolved to your satisfaction within the specified timeframe, or if you require further escalation, you may directly contact our Founder for resolution:</p>
                        <p><b>{sitedata.name}</b> <a href={`tel:${sitedata.mobile}`}>{sitedata.mobile}</a></p>
                        <p>Your trust matters to us. We are here to make your experience with <b>{sitedata.websiteName}</b> smooth, secure, and supportive.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

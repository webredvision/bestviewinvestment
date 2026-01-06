import HeroSection from '@/components/landing/heroSection/heroSection';
import AboutSection from '@/components/landing/aboutSection/aboutSection';
import FeaturesSection from '@/components/landing/featuresSection/featuresSection';
import ContactUs from '@/components/landing/contactSection/contactSection';
import BlogsSection from '@/components/landing/blogsSection/blogsSection';
import BseChartSection from '@/components/landing/bsechartSection/bsechartSection';
import SipCalculator from '@/components/landing/sipcalculatort';
import AnimatedContent from '@/components/AnimatedContent';
import { getLatestBlogs, getServiceData, getSiteData, getSocialMedia, getTestimonials, getTeams, getAddisLogos, getAboutus } from '@/lib/functions';
import SocialMediaSidebar from '@/components/socialMedia/index';
import PartnerOneSlider from '@/components/landing/partners/partners';
import ServiceComponent from '@/components/landing/services/services';
import ProcessSection from '@/components/landing/processSection/processSection';
import TestimonialSection from '@/components/landing/testimonials/testimonials';
import WorkSection from '@/components/landing/workSection/workSection';
import TeamSection from '@/components/landing/teamSection/teamSection';
import WhyChooseSection from '@/components/landing/whyChoose/whytochoose';
import QRCode from '@/components/qrCode';

export default async function Page() {
  const sitedata = await getSiteData();
  const blogs = await getLatestBlogs();
  const testimonial = await getTestimonials()
  const services = await getServiceData()
  const socialmedialinks = await getSocialMedia()
  const aboutteamdata = await getTeams();
  const aboutData = await getAboutus();
  const ourPartners = await getAddisLogos()

  return (
    <AnimatedContent>
      <HeroSection sitedata={sitedata} />
      <PartnerOneSlider ourPartners={ourPartners} />
      <ServiceComponent services={services} />
      <AboutSection aboutData={aboutData} />
      <ProcessSection />
      <TestimonialSection testimonials={testimonial} sitedata={sitedata} />
      <WhyChooseSection />
      <WorkSection />
      <SipCalculator />
      <TeamSection aboutteamdata={aboutteamdata} socialMedia={socialmedialinks} />
      <ContactUs sitedata={sitedata} />
      <QRCode sitedata={sitedata} />
    </AnimatedContent>
  );
}

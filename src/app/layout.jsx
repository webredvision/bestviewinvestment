import { Merriweather, Outfit, Work_Sans } from "next/font/google";
import "./globals.css";
import RenewalPopup from "@/components/renewalPopup";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import Script from "next/script";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700", "900"],
});

const worksans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["200", "400"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const companyName = "Best View Investment Services Pvt. Ltd.";
  const siteUrl = "http://bestviewinvestment.com";

  return {
    title: {
      default: companyName,
      template: `%s - ${companyName}`,
    },
    description:
      "Best View Investment Services Private Limited provides trusted financial solutions including Mutual Funds, Health Insurance, Life Insurance, and GIFT City investment services.",
    openGraph: {
      title: companyName,
      description:
        "Trusted financial advisory offering Mutual Funds, Health & Life Insurance, and GIFT City investment solutions.",
      type: "website",
      locale: "en_IN",
      siteName: companyName,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: companyName,
      description:
        "Professional investment and insurance advisory services including Mutual Funds, Health Insurance, Life Insurance, and GIFT City investments.",
    },
    authors: [{ name: "Karan Agarwal", url: siteUrl }],
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Google Analytics – Disabled */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0000000000"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-disabled" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){return;}
            gtag('js', new Date());
            gtag('config', 'G-0000000000');
          `}
        </Script>

        {/* Microsoft Clarity – Disabled */}
        <Script id="microsoft-clarity-disabled" strategy="afterInteractive">
          {`
            (function(){
              window.clarity = function(){ return; };
            })();
          `}
        </Script>
      </head>

      <body
        className={`${merriweather.variable} ${worksans.variable} antialiased`}
      >
        <SubscriptionProvider>
          <RenewalPopup />
          {children}
        </SubscriptionProvider>
      </body>
    </html>
  );
}

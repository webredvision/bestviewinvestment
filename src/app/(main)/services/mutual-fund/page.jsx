import React from "react";
import Link from "next/link";
import InnerBanner from "@/components/innerBanner/InnerBanner";

export const metadata = {
  title: "Mutual Funds",
  description:
    "Explore Mutual Funds — a smart and convenient way to invest, offering diversification, professional management, and wealth creation opportunities for every investor profile.",
};

export default function MutualFundsLanding() {
  return (
    <>
      <InnerBanner pageName="Mutual Funds" />
      <section className="main-section">
        <div className="max-w-screen-xl mx-auto">
          {/* Heading */}
          <h1 className="font-extrabold text-center text-[var(--rv-primary)] mb-3">
            Mutual Funds
          </h1>

          {/* Subheading */}
          <h2 className="text-gray-700 font-medium mb-6 text-center">
            A smart way to grow wealth, systematically and securely
          </h2>

          {/* Introduction */}
          <p className="mb-4 text-lg text-gray-800">
            Mutual Funds are one of the most popular investment avenues today,
            as they allow investors to participate in the financial markets
            without needing in-depth knowledge of stocks or bonds. They pool
            money from many investors and invest in a professionally managed
            portfolio of equities, debt instruments, or a mix of both — giving
            you growth potential with reduced risk.
          </p>

          {/* Description */}
          <p className="mb-8 text-lg text-gray-800">
            Whether you are just starting your wealth-creation journey through a
            Systematic Investment Plan (SIP) or you are an experienced investor
            seeking tax savings, stability, or retirement planning, Mutual Funds
            provide tailor-made solutions for every financial goal, time
            horizon, and risk appetite.
          </p>

          {/* Types of Mutual Funds */}
          <div className="mb-10">
            <h3 className="font-semibold text-[var(--rv-primary)] mb-4">
              Types of Mutual Funds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="p-4 rounded-xl shadow-md">
                <h4 className="font-bold mb-2">Equity Funds</h4>
                <p>
                  Invest primarily in shares of companies. Best suited for
                  long-term investors aiming for higher returns through capital
                  appreciation.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md">
                <h4 className="font-bold mb-2">Debt Funds</h4>
                <p>
                  Invest in government bonds, corporate debt, and other fixed
                  income securities. Ideal for investors seeking stability,
                  predictable returns, and lower risk.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md">
                <h4 className="font-bold mb-2">Hybrid Funds</h4>
                <p>
                  Offer a balanced mix of equity and debt, combining growth
                  potential with income stability — suitable for moderate risk
                  investors.
                </p>
              </div>
              <div className="p-4 rounded-xl shadow-md">
                <h4 className="font-bold mb-2">Liquid & Money Market Funds</h4>
                <p>
                  Provide high liquidity and low risk for short-term needs.
                  Perfect for emergency corpus and short-term surplus parking.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h3 className="font-semibold text-[var(--rv-primary)] mb-4">
              Key Benefits of Mutual Funds
            </h3>
            <ul className="space-y-4 text-gray-800">
              <li>
                <strong>✔ Professional Fund Management:</strong> Managed by
                experienced fund managers backed by research and market
                expertise.
              </li>
              <li>
                <strong>✔ Diversification:</strong> Invest across multiple
                asset classes, sectors, and securities to reduce risk.
              </li>
              <li>
                <strong>✔ Flexible Investment Options:</strong> Choose between
                SIPs (monthly) or lumpsum, based on your convenience.
              </li>
              <li>
                <strong>✔ High Liquidity:</strong> Redeem most open-ended funds
                anytime at prevailing Net Asset Value (NAV).
              </li>
              <li>
                <strong>✔ Tax Efficiency:</strong> Certain categories like ELSS
                (Equity Linked Savings Scheme) offer tax benefits under Section
                80C of the Income Tax Act.
              </li>
              <li>
                <strong>✔ Transparency & Safety:</strong> Regulated by SEBI,
                with periodic disclosures and strict compliance.
              </li>
            </ul>
          </div>

          {/* Conclusion and CTA */}
          <div className="services-cta p-6 rounded-xl shadow-sm">
            <p className="text-lg mb-4">
              Mutual Funds combine safety, flexibility, and the potential for
              wealth creation. From short-term savings to long-term financial
              goals like retirement, children’s education, or wealth
              preservation, there’s a Mutual Fund for every stage of life.
            </p>
            <Link href="/contact-us" className="btn2">
              Start Your Mutual Fund Journey Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

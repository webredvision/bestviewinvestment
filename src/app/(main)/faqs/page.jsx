import { ConnectDB } from "@/lib/db/ConnectDB";
import FaqsModel from "@/lib/models/FaqsModel";
import InnerBanner from "@/components/innerBanner/InnerBanner";

export const metadata = {
  title: "FAQs",
  description: "Frequently asked questions about our services and support.",
};

export default async function FaqsPage() {
  await ConnectDB();
  const faqs = await FaqsModel.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <InnerBanner pageName="FAQs" />
      <section className="main-section">
        <div className="max-w-screen-xl mx-auto">
          {faqs.length === 0 ? (
            <p className="text-gray-700">No FAQs available yet.</p>
          ) : (
            <div className="space-y-4">
              {faqs.map((item) => (
                <details
                  key={item._id.toString()}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <summary className="cursor-pointer font-semibold text-[var(--rv-primary-dark)]">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-gray-700 whitespace-pre-line">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


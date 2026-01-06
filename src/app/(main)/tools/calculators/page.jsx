import { Suspense } from "react";
import CalculatorTabs from "./CalculatorTabs"; // new client component

export default function Page() {
  return (
    <div>

      <div className="max-w-screen-xl mx-auto main-section">
        <Suspense fallback={<div>Loading calculators...</div>}>
          <CalculatorTabs />
        </Suspense>
      </div>
    </div>
  );
}

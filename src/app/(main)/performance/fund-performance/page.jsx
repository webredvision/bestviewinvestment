import FundCategoryTabs from "@/components/FundCategoryTabs/page";
import InnerBanner from "@/components/innerBanner/InnerBanner";
 
export default function MarketUpdate() {
 
  return (
<>
      <InnerBanner pageName="Fund Performance"/>
    <div className="main-section">
      <div className="max-w-screen-xl mx-auto  px-4   px-4 ">
        <FundCategoryTabs/>
      </div>
    </div></>
  );
}
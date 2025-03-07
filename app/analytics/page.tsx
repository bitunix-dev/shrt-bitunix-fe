import { LineChart } from "@/components/chart/LineChart";
import { Links } from "./dataSet/Links";
import { RegionsTabs } from "./dataSet/Regions/RegionsTabs";
import { DevicesAndBrowsersTab } from "./dataSet/DevicesAndBrowser/DevicesAndBrowsersTab";
import { UTMTabs } from "./dataSet/UTMTabs/UTMTabs";
import { BarChart } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex items-center gap-2">
        <BarChart className="w-6 h-6 text-lime-500" />
        <h1 className="text-2xl font-bold text-lime-500">Analytics</h1>
      </div>
      <div className="mt-8">
        <LineChart />
      </div>
      <div className="grid md:grid-cols-2 gap-10 mt-10 mb-20">
        <Links />
        <RegionsTabs />
        <DevicesAndBrowsersTab />
        <UTMTabs />
      </div>
    </>
  );
}

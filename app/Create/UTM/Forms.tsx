import { TooltipComponents } from "@/components/Tooltip/Tooltip";
import {
  Globe,
  RadioTower,
  FlagTriangleRight,
  FolderSearch2,
  ScrollText,
  Gift,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const Forms = () => {
  const dataSet = [
    {
      id: "source",
      label: "Source",
      icon: <Globe className="w-5 h-5" />,
      placeholder: "google",
      tooltip: "where the traffic is coming from",
    },
    {
      id: "medium",
      label: "Medium",
      icon: <RadioTower className="w-5 h-5" />,
      placeholder: "cpc",
      tooltip: "where the traffic is coming from",
    },
    {
      id: "campaign",
      label: "Campaign",
      icon: <FlagTriangleRight className="w-5 h-5" />,
      placeholder: "summer sale",
      tooltip: "where the trafic is comig form",
    },
    {
      id: "term",
      label: "Term",
      icon: <FolderSearch2 className="w-5 h-5" />,
      placeholder: "running shoes",
      tooltip: "where the traffic is coming from",
    },
    {
      id: "content",
      label: "Content",
      icon: <ScrollText className="w-5 h-5" />,
      placeholder: "logo link",
      tooltip: "where the traffic is coming from",
    },
    {
      id: "referral",
      label: "Referral",
      icon: <Gift className="w-5 h-5" />,
      placeholder: "yoursite.com",
      tooltip: "where the traffic is coming from",
    },
  ];

  return (
    <div className="space-y-3">
      {dataSet.map((item) => (
        <div key={item.id} className="flex">
          <TooltipComponents
            Label={
              <div className="border w-50 py-1 rounded-r-none px-3 flex gap-2 rounded bg-gray-50">
                {item.icon} {item.label}
              </div>
            }
            content={`Enter ${item.tooltip.toLowerCase()}`}
          />
          <Input className="rounded-l-none" placeholder={item.placeholder} />
        </div>
      ))}
    </div>
  );
};

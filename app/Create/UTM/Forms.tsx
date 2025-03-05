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
import { useEffect } from "react";

interface FormsProps {
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  medium: string;
  setMedium: React.Dispatch<React.SetStateAction<string>>;
  campaign: string;
  setCampaign: React.Dispatch<React.SetStateAction<string>>;
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  referral: string;
  setReferral: React.Dispatch<React.SetStateAction<string>>;
  destinationUrl: string;
  setDestinationUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const Forms: React.FC<FormsProps> = ({
  source,
  setSource,
  medium,
  setMedium,
  campaign,
  setCampaign,
  term,
  setTerm,
  content,
  setContent,
  referral,
  setReferral,
  destinationUrl,
  setDestinationUrl,
}) => {

  useEffect(() => {
    try {
      // ✅ Pastikan hanya domain utama yang dipertahankan
      const url = new URL(destinationUrl.split("?")[0]); // Hapus query params lama

      const params = new URLSearchParams();
      if (source) params.set("utm_source", source);
      if (medium) params.set("utm_medium", medium);
      if (campaign) params.set("utm_campaign", campaign);
      if (term) params.set("utm_term", term);
      if (content) params.set("utm_content", content);
      if (referral) params.set("ref", referral);

      // ✅ Buat URL baru dengan query params yang bersih
      const newUrl = params.toString() ? `${url.origin}${url.pathname}?${params.toString()}` : `${url.origin}${url.pathname}`;

      // ✅ Hanya update jika URL baru berbeda dengan yang lama
      if (newUrl !== destinationUrl) {
        setDestinationUrl(newUrl);
      }
    } catch (error) {
      console.error("Error constructing URL:", error);
    }
  }, [source, medium, campaign, term, content, referral]);

  const dataSet = [
    {
      id: "source",
      label: "utm_source",
      icon: <Globe className="w-4 h-4" />,
      placeholder: "google",
      tooltip: "where the traffic is coming from",
      value: source,
      setValue: setSource,
    },
    {
      id: "medium",
      label: "utm_medium",
      icon: <RadioTower className="w-4 h-4" />,
      placeholder: "cpc",
      tooltip: "what type of marketing medium",
      value: medium,
      setValue: setMedium,
    },
    {
      id: "campaign",
      label: "utm_campaign",
      icon: <FlagTriangleRight className="w-4 h-4" />,
      placeholder: "summer sale",
      tooltip: "which campaign the link is part of",
      value: campaign,
      setValue: setCampaign,
    },
    {
      id: "term",
      label: "utm_term",
      icon: <FolderSearch2 className="w-4 h-4" />,
      placeholder: "running shoes",
      tooltip: "used for paid search campaigns",
      value: term,
      setValue: setTerm,
    },
    {
      id: "content",
      label: "utm_content",
      icon: <ScrollText className="w-4 h-4" />,
      placeholder: "logo link",
      tooltip: "used to differentiate ads",
      value: content,
      setValue: setContent,
    },
    {
      id: "referral",
      label: "ref",
      icon: <Gift className="w-4 h-4" />,
      placeholder: "yoursite.com",
      tooltip: "who referred the traffic",
      value: referral,
      setValue: setReferral,
    },
  ];

  return (
    <>
      <div className="space-y-3">
        {dataSet.map((item) => (
          <div key={item.id} className="flex">
            <TooltipComponents
              Label={
                <div className="border w-72 py-1 rounded-r-none px-3 flex items-center gap-2 rounded bg-gray-50">
                  {item.icon} {item.label}
                </div>
              }
              content={`Enter ${item.tooltip.toLowerCase()}`}
            />
            <Input
              className="rounded-l-none"
              placeholder={item.placeholder}
              value={item.value}
              onChange={(e) => item.setValue(e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Input value={destinationUrl} disabled></Input>
      </div>
    </>
  );
};

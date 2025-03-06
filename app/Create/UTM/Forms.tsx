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

// ✅ Fungsi untuk mengganti spasi dengan dash (-)
const normalizeText = (text: string) => text.trim().replace(/\s+/g, "-");

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
      const url = new URL(destinationUrl.split("?")[0]); // Hapus query params lama
      const params = new URLSearchParams();

      if (source) params.set("utm_source", normalizeText(source));
      if (medium) params.set("utm_medium", normalizeText(medium));
      if (campaign) params.set("utm_campaign", normalizeText(campaign));
      if (term) params.set("utm_term", normalizeText(term));
      if (content) params.set("utm_content", normalizeText(content));
      if (referral) params.set("ref", normalizeText(referral));

      const newUrl = params.toString()
        ? `${url.origin}${url.pathname}?${params.toString()}`
        : `${url.origin}${url.pathname}`;

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
      label: "Source",
      icon: <Globe className="w-4 h-4" />,
      placeholder: "google",
      tooltip: "where the traffic is coming from",
      value: source,
      setValue: setSource,
    },
    {
      id: "medium",
      label: "Medium",
      icon: <RadioTower className="w-4 h-4" />,
      placeholder: "cpc",
      tooltip: "how the traffic is coming",
      value: medium,
      setValue: setMedium,
    },
    {
      id: "campaign",
      label: "Campaign",
      icon: <FlagTriangleRight className="w-4 h-4" />,
      placeholder: "summer sale",
      tooltip: "the name of the campaign",
      value: campaign,
      setValue: setCampaign,
    },
    {
      id: "term",
      label: "Term",
      icon: <FolderSearch2 className="w-4 h-4" />,
      placeholder: "running shoes",
      tooltip: "the term of the campaign",
      value: term,
      setValue: setTerm,
    },
    {
      id: "content",
      label: "Content",
      icon: <ScrollText className="w-4 h-4" />,
      placeholder: "logo link",
      tooltip: "the content of the campaign",
      value: content,
      setValue: setContent,
    },
    {
      id: "referral",
      label: "Referral",
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
                <div className="w-72 py-1 rounded-r-none px-3 flex items-center gap-2 rounded bg-neutral-900 border border-neutral-900">
                  {item.icon} {item.label}
                </div>
              }
              content={`Enter ${item.tooltip.toLowerCase()}`}
            />
            <Input
              className="rounded-l-none border border-neutral-800"
              placeholder={item.placeholder}
              value={item.value}
              onChange={(e) => item.setValue(e.target.value)}
              autoFocus
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h4>Link preview:</h4>
        <Input value={destinationUrl} disabled></Input>
      </div>
    </>
  );
};

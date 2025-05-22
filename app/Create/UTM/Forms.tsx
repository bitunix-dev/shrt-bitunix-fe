import { TooltipComponents } from "@/components/Tooltip/Tooltip";
import {
  Globe,
  RadioTower,
  FlagTriangleRight,
  FolderSearch2,
  ScrollText,
  Gift,
  Crown,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { VipCodeData } from "@/app/Get/dataTypes";

interface Option {
  id: string;
  name: string;
}


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
  vipCode: string
  setVipCode: React.Dispatch<React.SetStateAction<string>>;
  destinationUrl: string;
  setDestinationUrl: React.Dispatch<React.SetStateAction<string>>;
  sourceOptions: Option[];
  mediumOptions: Option[];
  vipCodeOptions: VipCodeData[];
}

const normalizeText = (text: string) =>
  text.trim().toLowerCase().replace(/\s+/g, "-");

export const FormsUTM: React.FC<FormsProps> = ({
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
  vipCode,
  setVipCode,
  destinationUrl,
  setDestinationUrl,
  sourceOptions,
  mediumOptions,
  vipCodeOptions,
}) => {
  useEffect(() => {
    if (!destinationUrl) return;
    try {
      const url = new URL(destinationUrl.split("?")[0]);
      const params = new URLSearchParams();

      if (source) params.set("utm_source", normalizeText(source));
      if (medium) params.set("utm_medium", normalizeText(medium));
      if (campaign) params.set("utm_campaign", normalizeText(campaign));
      if (term) params.set("utm_term", normalizeText(term));
      if (content) params.set("utm_content", normalizeText(content));
      if (referral) params.set("ref", normalizeText(referral));
      if (vipCode) params.set("vipCode", vipCode) // Don't normalize vipCode since it's a specific code

      const newUrl = params.toString()
        ? `${url.origin}${url.pathname}?${params.toString()}`
        : `${url.origin}${url.pathname}`;

      if (newUrl !== destinationUrl) {
        setDestinationUrl(newUrl);
      }
    } catch (error) {
      console.error("Error constructing URL:", error);
    }
  }, [source, medium, campaign, term, content, referral, vipCode]);

  const dataSet = [
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
        {/* Source Select */}
        <div className="flex">
          <TooltipComponents
            Label={
              <div className="w-72 py-1 rounded-r-none px-3 flex items-center gap-2 rounded bg-neutral-900 border border-r-0">
                <Globe className="w-4 h-4" /> Source
              </div>
            }
            content="Enter the source of the traffic"
          />
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="rounded-l-none border-l-0 w-full">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              {sourceOptions.map((option) => (
                <SelectItem key={option.id} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Medium Select */}
        <div className="flex">
          <TooltipComponents
            Label={
              <div className="w-72 py-1 rounded-r-none px-3 flex items-center gap-2 rounded bg-neutral-900 border border-r-0">
                <RadioTower className="w-4 h-4" /> Medium
              </div>
            }
            content="Enter the medium of the traffic"
          />
          <Select value={medium} onValueChange={setMedium}>
            <SelectTrigger className="rounded-l-none border-l-0 w-full">
              <SelectValue placeholder="Select medium" />
            </SelectTrigger>
            <SelectContent>
              {mediumOptions.map((option) => (
                <SelectItem key={option.id} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Other fields */}
        {dataSet.map((item) => (
          <div key={item.id} className="flex">
            <TooltipComponents
              Label={
                <div className="w-72 py-1 rounded-r-none px-3 flex items-center gap-2 rounded bg-neutral-900 border border-r-0">
                  {item.icon} {item.label}
                </div>
              }
              content={`Enter ${item.tooltip.toLowerCase()}`}
            />
            <Input
              className="rounded-l-none border-l-0 border-y-1"
              placeholder={item.placeholder}
              value={item.value}
              onChange={(e) => item.setValue(e.target.value)}
            />
          </div>
        ))}
        {/* VIP Code Select */}
        <div className="flex">
          <TooltipComponents
            Label={
              <div className="w-72 py-1 rounded-r-none px-3 flex items-center gap-2 rounded bg-neutral-900 border border-r-0">
                <Crown className="w-4 h-4" /> Vip Code
              </div>
            }
            content="Select a unique code given to exclusive users or partners"
          />
          <Select value={vipCode} onValueChange={setVipCode}>
            <SelectTrigger className="rounded-l-none border-l-0 w-full">
              <SelectValue placeholder="Select VIP code (optional)" />
            </SelectTrigger>
            <SelectContent>
              {vipCodeOptions.map((option) => (
                <SelectItem key={option.id} value={option.partner_code}>
                  {option.partner_name} - {option.partner_code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
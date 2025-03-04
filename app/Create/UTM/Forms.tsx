import { TooltipComponents } from "@/components/Tooltip/Tooltip";
import { Globe, RadioTower, FlagTriangleRight, FolderSearch2, ScrollText,Gift } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Forms = () => {
    const dataSet = [
        { id: "source", label: "Source", icon: <Globe className="w-4" />, placeholder: "google", tooltip: "where the traffic is coming from" },
        { id: "medium", label: "Medium", icon: <RadioTower className="w-4" />, placeholder: "cpc", tooltip: "where the traffic is coming from"},
        { id: "campaign", label: "Campaign", icon: <FlagTriangleRight className="w-4" />, placeholder: "summer sale", tooltip: 'where the trafic is comig form' },
        { id: "term", label: "Term", icon: <FolderSearch2 className="w-4" />, placeholder: "running shoes", tooltip: "where the traffic is coming from" },
        { id: "content", label: "Content", icon: <ScrollText className="w-4" />, placeholder: "logo link", tooltip: "where the traffic is coming from" },
        { id: "referral", label: "Referral", icon: <Gift className="w-4" />, placeholder: "yoursite.com", tooltip: "where the traffic is coming from" },
    ];

    return (
        <div className="space-y-3">
            {dataSet.map((item) => (
                <div key={item.id} className="flex">
                    {/* Tooltip Label */}
                    <TooltipComponents 
                        Label={
                            <div className="border w-40 py-1 rounded-r-none px-3 flex gap-2 rounded bg-gray-50">
                                {item.icon} {item.label}
                            </div>
                        }
                        content={`Enter ${item.tooltip.toLowerCase()}`}
                    />
                    
                    {/* Input Field */}
                    <Input 
                        className="rounded-l-none"
                        placeholder={item.placeholder}
                    />
                </div>
            ))}
        </div>
    );
}

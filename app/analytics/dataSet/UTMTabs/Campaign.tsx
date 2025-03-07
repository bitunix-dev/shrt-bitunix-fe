"use client";
import { useGetClicksCampaign } from "@/hooks/useGetClicksCampaign";
import { FlagTriangleRight } from "lucide-react";

export const Campaign = () => {
  const { data } = useGetClicksCampaign();
  const icons = {
    campaign: <FlagTriangleRight className="w-4 h-4 mr-2" />,
  };
  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <div className="flex items-center">
            {icons.campaign}
            <p>{item.campaign}</p>
          </div>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No campaign data available</p>}
    </>
  );
};

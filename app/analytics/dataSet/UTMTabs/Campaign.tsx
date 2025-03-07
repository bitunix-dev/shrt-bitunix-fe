"use client";
import { useGetClicksCampaign } from "@/hooks/useGetClicksCampaign";

export const Campaign = () => {
  const { data } = useGetClicksCampaign();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.campaign}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No campaign data available</p>}
    </>
  );
};

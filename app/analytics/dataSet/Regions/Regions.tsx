"use client";
import { useGetClicksRegions } from "@/hooks/useGetClicksRegions";

export const Regions = () => {
  const { data } = useGetClicksRegions();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.region}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No region data available</p>}
    </>
  );
};

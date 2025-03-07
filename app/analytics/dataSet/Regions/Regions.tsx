"use client";
import { useGetClicksRegions } from "@/hooks/useGetClicksRegions";

export const Regions = () => {
  const { data } = useGetClicksRegions();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md w-full flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <div className="flex items-center">
            <img
              src={item.country_flag}
              alt={`${item.region} flag`}
              className="w-6 h-4 rounded mr-2"
            />
            <p>{item.region}</p>
          </div>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No region data available</p>}
    </>
  );
};

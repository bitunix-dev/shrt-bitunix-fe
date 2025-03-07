"use client";
import { useGetClicksMedium } from "@/hooks/useGetClicksMedium";
import {
  RadioTower,
} from "lucide-react";
export const Medium = () => {
  const { data } = useGetClicksMedium();
  const icons = {
    medium: <RadioTower className="w-4 h-4 mr-2" />,
  };
  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <div className="flex items-center">
            {icons.medium}
            <p>{item.medium}</p>
          </div>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No medium data available</p>}
    </>
  );
};

"use client";
import { useGetClicksDevices } from "@/hooks/useGetClicksDevices";

export const Devices = () => {
  const { data } = useGetClicksDevices();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <p>{item.device}</p>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No device data available</p>}
    </>
  );
};

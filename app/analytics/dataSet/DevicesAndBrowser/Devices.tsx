"use client";
import { useGetClicksDevices } from "@/hooks/useGetClicksDevices";

export const Devices = () => {
  const { data } = useGetClicksDevices();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.device}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No device data available</p>}
    </>
  );
};

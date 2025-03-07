"use client";
import { useGetClicksBrowsers } from "@/hooks/useGetClicksBrowsers";

interface ClickData {
  id: number;
  browser?: string;
  total_clicks: number;
}

export const Browsers = () => {
  const { data } = useGetClicksBrowsers();

  return (
    <>
      {data?.data?.map((item: ClickData, index: number) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <p>{item.browser || "Unknown"}</p>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No browser data available</p>}
    </>
  );
};

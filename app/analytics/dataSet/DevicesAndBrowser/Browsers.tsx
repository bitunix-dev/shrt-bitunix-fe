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
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.browser || "Unknown"}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No browser data available</p>}
    </>
  );
};

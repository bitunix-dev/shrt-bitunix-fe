"use client";
import { useGetClicksBrowsers } from "@/hooks/useGetClicksBrowsers";

export const Browsers = () => {
  const { data } = useGetClicksBrowsers();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.browser}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No browser data available</p>}
    </>
  );
};

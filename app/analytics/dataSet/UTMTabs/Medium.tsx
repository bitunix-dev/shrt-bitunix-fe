"use client";
import { useGetClicksMedium } from "@/hooks/useGetClicksMedium";

export const Medium = () => {
  const { data } = useGetClicksMedium();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.medium}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No medium data available</p>}
    </>
  );
};

"use client";
import { useGetClicksSource } from "@/hooks/useGetClicksSource";

export const Source = () => {
  const { data } = useGetClicksSource();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.source}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No source data available</p>}
    </>
  );
};

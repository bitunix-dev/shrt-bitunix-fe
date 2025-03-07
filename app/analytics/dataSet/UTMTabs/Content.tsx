"use client";
import { useGetClicksContent } from "@/hooks/useGetClicksContent";

export const Content = () => {
  const { data } = useGetClicksContent();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.content}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No content data available</p>}
    </>
  );
};

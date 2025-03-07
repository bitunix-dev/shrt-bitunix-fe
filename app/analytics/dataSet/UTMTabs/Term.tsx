"use client";
import { useGetClicksTerm } from "@/hooks/useGetClicksTerm";

export const Term = () => {
  const { data } = useGetClicksTerm();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.term}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No term data available</p>}
    </>
  );
};

"use client";
import { useGetClicksContinent } from "@/hooks/useGetClicksContinents";

export const Continents = () => {
  const { data } = useGetClicksContinent();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.continent}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No continent data available</p>}
    </>
  );
};

"use client";
import { useGetClicksCities } from "@/hooks/useGetClicksCities";

export const Cities = () => {
  const { data } = useGetClicksCities();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2"
        >
          <p>{item.city}</p>
          <span>{item.total_clicks}</span>
        </div>
      )) || <p>No city data available</p>}
    </>
  );
};

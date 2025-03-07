"use client";
import { useGetClicksContinent } from "@/hooks/useGetClicksContinents";

export const Continents = () => {
  const { data } = useGetClicksContinent();

  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dilb4d364/image/upload/v1741332303/continents_qizwwn.svg"
              alt={`${item.continent} flag`}
              className="w-6 h-4 rounded mr-2"
            />
            <p>{item.continent}</p>
          </div>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No continent data available</p>}
    </>
  );
};

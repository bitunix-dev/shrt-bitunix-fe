"use client";
import { useGetClicksTerm } from "@/hooks/useGetClicksTerm";
import { FolderSearch2 } from "lucide-react";
export const Term = () => {
  const { data } = useGetClicksTerm();
  const icons = {
    term: <FolderSearch2 className="w-4 h-4 mr-2" />,
  };
  return (
    <>
      {data?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
        >
          <div className="flex items-center">
            {icons.term}
            <p>{item.term}</p>
          </div>
          <span className="font-bold">
            {Number(item.total_clicks).toLocaleString("en-US")} clicks
          </span>
        </div>
      )) || <p>No term data available</p>}
    </>
  );
};

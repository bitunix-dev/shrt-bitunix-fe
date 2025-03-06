"use client";

import { DataTable } from "@/components/dataTable/DataTable";
import { Create } from "../Create/Link/Create";
import { useGetUrls } from "@/hooks/useGetUrls";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Import Skeleton

export const Get = () => {
  const { data, refetch, isFetching } = useGetUrls();

  return (
    <div className="w-full">

      {/* ✅ Skeleton saat loading */}
      {isFetching ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 mt-5 w-full rounded-lg bg-gray-800" />
          ))}
        </div>
      ) : (
        <DataTable BtnCreate={<Create refetch={refetch} />} data={data?.data} />
      )}
    </div>
  );
};

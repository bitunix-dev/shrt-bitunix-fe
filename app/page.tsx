import Image from "next/image";
import { DataTable } from "@/components/dataTable/DataTable";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl">Links</h1>
      <DataTable/>
    </>
  );
}

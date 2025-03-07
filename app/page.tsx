import { Get } from "./Get/Get";
import { Globe } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Globe className="w-6 h-6 text-lime-500" />
        <h1 className="text-2xl font-bold text-lime-500">Link Management</h1>
      </div>
      <Get />
    </>
  );
}

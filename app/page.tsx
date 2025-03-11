import { Get } from "./Get/Get";
import { Globe } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Globe className="w-6 h-6 text-[var(--bitunix)]" />
        <h1 className="text-2xl font-bold text-[var(--bitunix)]">
          Link Management
        </h1>
      </div>
      <Get />
    </>
  );
}

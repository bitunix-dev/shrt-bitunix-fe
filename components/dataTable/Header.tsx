import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface HeaderProps {
  BtnCreate: React.ReactNode;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ BtnCreate, setSearchQuery }) => {
  return (
    <div className="md:flex items-center justify-between gap-3 py-4">
      <div className="flex gap-2 mb-2 md:mb-0"></div>
      <div className="flex items-center justify-between gap-2">
        {/* ✅ Search Input */}
        <div className="relative w-sm max-w-xl">
          <Search className="absolute left-2 top-2.5 text-white w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-8 text-white"
            onChange={(e) => setSearchQuery(e.target.value)} // ✅ Update state pencarian
          />
        </div>
        {BtnCreate}
      </div>
    </div>
  );
};

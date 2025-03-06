import { Search } from "lucide-react";
import { Input } from "../ui/input";
interface HeaderProps {
  BtnCreate: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ BtnCreate }) => {
  return (
    <>
      <div className="md:flex items-center justify-between gap-3 py-4">
        <div className="flex gap-2 mb-2 md:mb-0"></div>
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-sm max-w-xl">
            <Search className="absolute left-2 top-2.5 text-white w-4 h-4" />
            <Input placeholder="Search..." className="pl-8 text-white" />
          </div>
          {BtnCreate}
        </div>
      </div>
    </>
  );
};

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface BtnCreateProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void; // ✅ Tambahkan prop untuk refetch
}

export const BtnCreate: React.FC<BtnCreateProps> = ({ setOpen, refetch }) => {
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event?.key && event.key.toLowerCase() === "c") {
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <Button
        className="bg-lime-500 text-black hover:bg-lime-600 flex items-center gap-2"
        onClick={handleClick}
      >
        Create Link
        <span className="bg-lime-700 hover:bg-lime-800 p-1 rounded-sm text-black text-xs font-bold">
          C
        </span>
      </Button>
    </>
  );
};

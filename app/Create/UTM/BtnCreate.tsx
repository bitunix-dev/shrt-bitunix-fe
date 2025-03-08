import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BtnCreateProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  destinationUrl: string;
}

// ✅ Fungsi untuk validasi URL
const isValidUrl = (url: string) => {
  try {
    new URL(url); // Jika ini gagal, berarti URL tidak valid
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const BtnCreate: React.FC<BtnCreateProps> = ({
  setOpen,
  destinationUrl,
}) => {
  const handleClick = () => {
    setOpen(true);
  };

  const isEmpty = destinationUrl.trim() === ""; // ✅ Cek apakah URL kosong
  const isInvalidUrl = !isValidUrl(destinationUrl); // ✅ Cek apakah URL tidak valid
  const isDisabled = isEmpty || isInvalidUrl; // ✅ Disable tombol jika kosong atau tidak valid

  // ✅ Tentukan pesan tooltip berdasarkan kondisi
  const tooltipMessage = isEmpty
    ? "Destination URL must be filled"
    : isInvalidUrl
    ? "URL is not valid"
    : "";

  return (
    <TooltipProvider>
      <Tooltip>
        {/* ✅ Gunakan div sebagai TooltipTrigger agar tetap bisa di-hover meskipun tombol disabled */}
        <TooltipTrigger asChild>
          <div className="inline-block">
            <Button
              onClick={handleClick}
              disabled={isDisabled}
              className="bg-neutral-900 text-lime-500 font-extrabold"
            >
              UTM
            </Button>
          </div>
        </TooltipTrigger>
        {isDisabled && ( // ✅ Tooltip hanya muncul jika tombol disabled
          <TooltipContent>
            <p>{tooltipMessage}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

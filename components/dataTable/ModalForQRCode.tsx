"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCodeGenerator from "@/components/qrCode/QrCode"; // ✅ Import QR Code Generator yang sudah dibuat sebelumnya

interface ModalForQRCodeProps {
  item: any;
  onClose: () => void;
}

export const ModalForQRCode: React.FC<ModalForQRCodeProps> = ({
  item,
  onClose,
}) => {
  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-white border border-neutral-800 rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-white font-bold">
            QR CODE PREVIEW
          </DialogTitle>
        </DialogHeader>

        {/* ✅ QR Code Container */}
        <div
          className="relative mt-2 py-1 rounded-md flex items-center justify-center border border-neutral-900"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.2) 20%, transparent 20%)",
            backgroundSize: "5px 5px",
            opacity: 0.8,
          }}
        >
          {/* ✅ Gunakan QRCodeGenerator */}
          <QRCodeGenerator
            value={item.short_link} // ✅ Gunakan short_link sebagai nilai QR Code
            logo="https://res.cloudinary.com/dilb4d364/image/upload/v1741247206/bitunix_icon-01_b9jsq4.png" // ✅ Logo di tengah QR
          />
        </div>

        {/* ✅ Muted Text dengan URL Source */}
        {/* <div className="mt-4 text-center text-sm text-gray-400 text-base">
          This QR Code is generated from:
          <a
            href={item.short_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime-400 hover:underline ml-1"
          >
            {item.short_link}
          </a>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

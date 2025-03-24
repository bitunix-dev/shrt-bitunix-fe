import { useQRCode } from "next-qrcode";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface QRCodeGeneratorProps {
  value: string; // ✅ Properti wajib untuk QR code
  logo?: string; // ✅ Opsi tambahan untuk logo di tengah
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, logo }) => {
  const { Canvas } = useQRCode();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // Create a ref to store the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // After component mounts, we generate the QR code and extract its image URL
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      setQrCodeUrl(imageUrl); // Store the generated image URL
    }
  }, [value]); // Re-run when `value` changes

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "qrcode.png"; // Set the name of the downloaded file
      link.click();
    }
  };

  if (!value) {
    return <p className="text-red-500">Error: QR Code value is required</p>; // Handle error if value is empty
  }

  return (
    <div className="relative w-[150px] h-[150px]">
      {/* ✅ Generate QR Code */}
      <Canvas
        text={value}
        options={{
          width: 150, // Customize QR Code size
          margin: 1,
          color: {
            dark: "#000000", // Dark color for QR code
            light: "#FFFFFF", // Light color for QR code background
          },
        }}
      />

      {/* ✅ Add logo in the center if provided */}
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={logo}
            alt="QR Code Logo"
            width={35} // Customize logo size
            height={35}
            className="rounded-b-md bg-white p-1" // Padding to ensure the logo does not overlap with QR code
          />
        </div>
      )}

      {/* ✅ Add download button */}
      <button
        onClick={handleDownload}
        className="mt-2 px-4 py-2 bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black rounded-md"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;

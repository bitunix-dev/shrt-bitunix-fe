import { useQRCode } from "next-qrcode";
import { useState, useEffect, useRef } from "react";

interface QRCodeGeneratorProps {
  value: string; // ✅ Required property for QR code
  logo?: string; // ✅ Optional property for logo in the center
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, logo }) => {
  const { Canvas } = useQRCode();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      setQrCodeUrl(imageUrl); // Store the generated image URL
    }
  }, [value]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Create a new canvas with the desired size (1080x1080)
      const downloadCanvas = document.createElement("canvas");
      const downloadContext = downloadCanvas.getContext("2d");

      if (downloadContext) {
        downloadCanvas.width = 1080;
        downloadCanvas.height = 1080;

        // Draw the original QR code on the larger canvas
        downloadContext.drawImage(canvas, 0, 0, 1080, 1080);

        // Draw the logo in the center of the new canvas
        if (logo) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoSize = 70; // You can adjust this size as needed
            downloadContext.drawImage(
              logoImg,
              (1080 - logoSize) / 2,
              (1080 - logoSize) / 2,
              logoSize,
              logoSize
            );

            // Trigger download once the logo is drawn
            const imageUrl = downloadCanvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "qrcode-1080x1080.png"; // Set the name of the downloaded file
            link.click();
          };
          logoImg.src = logo;
        }
      }
    }
  };

  if (!value) {
    return <p className="text-red-500">Error: QR Code value is required</p>;
  }

  return (
    <div className="relative w-[150px] h-[150px]">
      {/* Generate QR Code */}
      <Canvas
        ref={canvasRef}
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

      {/* Add static logo in the center if provided */}
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dilb4d364/image/upload/v1741247206/bitunix_icon-01_b9jsq4.png"
            alt="QR Code Logo"
            width={35} // Customize logo size
            height={35}
            className="rounded-b-md bg-white p-1" // Padding to ensure the logo does not overlap with QR code
          />
        </div>
      )}

      {/* Add download button */}
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

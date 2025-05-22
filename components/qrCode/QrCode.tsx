import { useQRCode } from "next-qrcode";
import { useState, useEffect, useRef } from "react";
import NextImage from "next/image";

interface QRCodeGeneratorProps {
  value: string; // ✅ Required property for QR code
  logo?: string; // ✅ Optional property for logo in the center
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, logo }) => {
  const { Canvas } = useQRCode();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(300);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // Update canvas size based on container width
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasContainerRef.current) {
        const containerWidth = canvasContainerRef.current.offsetWidth;
        // Set canvas size to container width with max limit
        const newSize = Math.min(containerWidth, 400); // Max 400px
        setCanvasSize(newSize);
      }
    };

    // Initial size calculation
    updateCanvasSize();

    // Add resize listener
    window.addEventListener('resize', updateCanvasSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    // After the QR code is rendered, capture the canvas and generate the image URL
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      setQrCodeUrl(imageUrl); // Store the generated image URL
    }
  }, [value, canvasSize]);

  const handleDownload = () => {
    // Create a new canvas with 1080x1080 size for download
    const downloadCanvas = document.createElement("canvas");
    const downloadContext = downloadCanvas.getContext("2d");

    if (downloadContext) {
      downloadCanvas.width = 1080;
      downloadCanvas.height = 1080;

      // Draw the original QR code onto the new canvas
      const canvas = canvasContainerRef.current?.querySelector("canvas");
      if (canvas) {
        downloadContext.drawImage(canvas, 0, 0, 1080, 1080);
      }

      // Add the logo in the center of the new canvas
      if (logo) {
        const logoImg = new window.Image();
        logoImg.crossOrigin = "anonymous";
        logoImg.onload = () => {
          const logoSize = 210; // Adjust logo size as needed
          downloadContext.drawImage(
            logoImg,
            (1080 - logoSize) / 2,
            (1080 - logoSize) / 2,
            logoSize,
            logoSize
          );

          // Trigger the download once the logo is drawn
          const imageUrl = downloadCanvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = "qrcode-1080x1080.png"; // File name for download
          link.click();
        };
        logoImg.src = logo;
      } else {
        // If no logo, download immediately
        const imageUrl = downloadCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "qrcode-1080x1080.png";
        link.click();
      }
    }
  };

  if (!value) {
    return <p className="text-red-500">Error: QR Code value is required</p>;
  }

  // Calculate logo size proportionally to canvas size
  const logoSize = Math.floor(canvasSize * 0.23); // ~23% of canvas size

  return (
    <div className="w-full max-w-md mx-auto" ref={canvasContainerRef}>
      {/* Generate QR Code */}
      <div className="relative w-full">
        <Canvas
          text={value}
          options={{
            width: canvasSize, // Dynamic size based on container
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
            <NextImage
              src="https://res.cloudinary.com/dilb4d364/image/upload/v1741247206/bitunix_icon-01_b9jsq4.png"
              alt="QR Code Logo"
              width={logoSize} // Responsive logo size
              height={logoSize}
              className="rounded-b-md bg-white p-1" // Padding to ensure the logo does not overlap with QR code
            />
          </div>
        )}
      </div>

      {/* Add download button */}
      <button
        onClick={handleDownload}
        className="mt-4 w-full px-6 py-3 bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black rounded-md flex items-center justify-center space-x-2"
      >
        <svg
          className="w-5 h-5 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7M12 4v12"
          />
        </svg>
        <span>Download QR Code</span>
      </button>
    </div>
  );
};

export default QRCodeGenerator;
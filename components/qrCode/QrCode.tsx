import { useQRCode } from "next-qrcode";
import Image from "next/image";

interface QRCodeGeneratorProps {
  value: string; // ✅ Properti wajib untuk QR code
  logo?: string; // ✅ Opsi tambahan untuk logo di tengah
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, logo }) => {
  const { Canvas } = useQRCode();

  if (!value) {
    return <p className="text-red-500">Error: QR Code value is required</p>; // ✅ Handling error jika value kosong
  }

  return (
    <div className="relative w-[150px] h-[150px]">
      {/* ✅ Generate QR Code */}
      <Canvas
        text={value}
        options={{
          width: 150, // ✅ Bisa disesuaikan ukuran QR Code
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        }}
      />

      {/* ✅ Tambahkan logo di tengah */}
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={logo}
            alt="QR Code Logo"
            width={35} // ✅ Sesuaikan ukuran logo
            height={35}
            className="rounded-b-md bg-white p-1" // ✅ Tambahkan padding agar logo tidak menutupi QR Code
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;

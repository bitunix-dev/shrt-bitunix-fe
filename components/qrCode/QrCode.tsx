import { useQRCode } from 'next-qrcode';

interface QRCodeGeneratorProps {
    value: string; // ✅ Properti wajib untuk QR code
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value }) => {
    const { Canvas } = useQRCode();

    if (!value) {
        return <p className="text-red-500">Error: QR Code value is required</p>; // ✅ Handling error jika value kosong
    }

    return (
        <Canvas
            text={value} // ✅ Menggunakan value sebagai input QR Code
            options={{
                width: 150, // ✅ Bisa disesuaikan ukuran QR Code
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                },
            }}
        />
    );
};

export default QRCodeGenerator;

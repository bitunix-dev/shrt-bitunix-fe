import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 text-white">
      {/* Left side with background image and text */}
      <div
        className="bg-neutral-950 relative hidden lg:flex items-center justify-center flex-col text-center"
        style={{
          backgroundImage:
            "url('https://static.bitunix.com/web/bitunix-assets/7aa9f3.DjOsEqIB.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="text-white">
          <h1 className="text-4xl font-semibold mb-2">
            URL Shortener with
            <br />
            Automatic UTM Generator
          </h1>
            <p
              className="text-md"
              style={{ color: "rgb(153, 153, 153)", fontWeight: "bold" }}
            >
              Bitunix-shorten simplifies your marketing campaigns
              <br /> with URL shortening & automatic UTM generation. <br />
              Track clicks, create QR codes, and optimize conversions
              effortlessly.
            </p>
          </div>
          <img
            src="https://static.bitunix.com/web/bitunix-assets/d4dcce.CePIhzzp.webp"
            alt="Image"
            className="h-100 w-100 object-contain dark:brightness-[0.2] dark:grayscale mt-3" // Memperkecil gambar
          />
      </div>

      {/* Right side with login form */}
      <div className="bg-gray-50 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Image
              src="https://res.cloudinary.com/dilb4d364/image/upload/v1741247207/logo_file-02_kiikdo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-36"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl text-neutral-950">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

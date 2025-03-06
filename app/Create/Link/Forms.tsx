import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ComboboxForLink } from "@/components/Combobox/ComboboxForLink";
import { ComboBoxForTags } from "@/components/Combobox/ComboboxForTags";
import React, { useEffect, useState } from "react";
import QRCodeGenerator from "@/components/qrCode/QrCode";

interface FormsProps {
  dataTags: any;
  setDestinationUrl: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<any>>;
  tags: any;
  setShortLink: React.Dispatch<React.SetStateAction<string>>;
  shortLink: string;
  destinationUrl: string;
}

export const Forms: React.FC<FormsProps> = ({
  dataTags,
  setDestinationUrl,
  setTags,
  tags,
  setShortLink,
  shortLink,
  destinationUrl,
}) => {
  const [isCustomShortLink, setIsCustomShortLink] = useState(false); // ✅ Menandai apakah user mengedit short link

  // ✅ Fungsi untuk generate random string 6 huruf
  const generateRandomString = (length = 6) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  // ✅ Gunakan useEffect untuk generate short link saat komponen pertama kali di-mount
  useEffect(() => {
    if (!shortLink) {
      setShortLink(generateRandomString(6));
    }
  }, [shortLink]);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <Label className="mb-3" htmlFor="link">
            Destination URL
          </Label>
          <Input
            onChange={(e) => {
              setDestinationUrl(e.target.value);
              if (!isCustomShortLink) {
                setShortLink(generateRandomString(6)); // ✅ Hanya generate jika user belum custom
              }
            }}
            value={destinationUrl}
            id="link"
            placeholder="https://bitunix.com/article/example"
          />
          <Label className="mb-3 mt-5" htmlFor="short-link">
            Short Link
          </Label>
          <div className="flex">
            <ComboboxForLink />
            <Input
              className="rounded-l-none"
              id="short-link"
              placeholder="Masukkan short link atau gunakan default"
              value={shortLink} // ✅ User bisa input manual
              onChange={(e) => {
                setShortLink(e.target.value);
                setIsCustomShortLink(true); // ✅ Tandai bahwa user mengedit short link
              }}
            />
          </div>
          <Label className="mt-5 mb-3">Tags</Label>
          <ComboBoxForTags
            dataTags={dataTags}
            setSelectedTags={setTags}
            selectedTags={tags}
          />
        </div>
        <div className="bg-neutral-900 text-white font-bold p-3 border border-neutral-900 rounded-md">
          <h2 className="text-center">QR CODE</h2> {/* ✅ Center the text */}
          <div
            className="relative mt-2 py-1 rounded-md flex items-center justify-center border border-neutral-900"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.2) 20%, transparent 20%)",
              backgroundSize: "5px 5px",
              opacity: 0.8, // ✅ Adjust opacity if needed
            }}
          >
            <QRCodeGenerator
              value={`short.bituniaxds.com/${shortLink}`}
              logo="https://res.cloudinary.com/dilb4d364/image/upload/v1741247206/bitunix_icon-01_b9jsq4.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};

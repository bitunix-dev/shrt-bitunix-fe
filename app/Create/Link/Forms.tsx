import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ComboboxForLink } from "@/components/Combobox/ComboboxForLink";
import React, { useEffect, useState } from "react";
import QRCodeGenerator from "@/components/qrCode/QrCode";
import { FormsUTM } from "../UTM/Forms";
import { ComboBoxForTags } from "@/components/Combobox/ComboboxForTags";
import { Tags } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface FormsProps {
  dataTags: any;
  setDestinationUrl: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<any>>;
  tags: any;
  setShortLink: React.Dispatch<React.SetStateAction<string>>;
  shortLink: string;
  destinationUrl: string;
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  medium: string;
  setMedium: React.Dispatch<React.SetStateAction<string>>;
  campaign: string;
  setCampaign: React.Dispatch<React.SetStateAction<string>>;
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  referral: string;
  setReferral: React.Dispatch<React.SetStateAction<string>>;
  sourceOptions: { id: string; name: string }[];
  mediumOptions: { id: string; name: string }[];
}

export const Forms: React.FC<FormsProps> = ({
  dataTags,
  setDestinationUrl,
  setTags,
  tags,
  setShortLink,
  shortLink,
  destinationUrl,
  source,
  setSource,
  medium,
  setMedium,
  campaign,
  setCampaign,
  term,
  setTerm,
  content,
  setContent,
  referral,
  setReferral,
  sourceOptions,
  mediumOptions,
}) => {
  const [isCustomShortLink, setIsCustomShortLink] = useState(false);
  const [validationError, setValidationError] = useState("");

  // ✅ Fungsi untuk generate random string 6 huruf
  const generateRandomString = (length = 6) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  // ✅ Validasi shortLink untuk memastikan tidak ada karakter khusus
  const validateShortLink = (value: string) => {
    // Hanya mengizinkan huruf dan angka (alphanumerik)
    const validRegex = /^[a-zA-Z0-9]*$/;

    if (!validRegex.test(value)) {
      setValidationError("Contains only letters and numbers.");
      return false;
    }

    setValidationError("");
    return true;
  };

  // ✅ Gunakan useEffect untuk generate short link hanya saat komponen pertama kali di-mount
  useEffect(() => {
    if (!shortLink && !isCustomShortLink) {
      setShortLink(generateRandomString(6));
    }
  }, []); // Hanya dijalankan sekali saat mount

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
                setShortLink(generateRandomString(6)); // ✅ Generate hanya jika belum custom
              }
            }}
            value={destinationUrl}
            id="link"
            placeholder="https://bitunix.com/article/example"
          />
          <Label className="mb-3 mt-5" htmlFor="short-link">
            Short Link
          </Label>
          <div className="flex flex-col">
            <div className="flex">
              <ComboboxForLink />
              <Input
                className={`rounded-l-none ${
                  validationError ? "border-red-500" : ""
                }`}
                id="short-link"
                placeholder="Masukkan short link atau gunakan default"
                value={shortLink}
                onChange={(e) => {
                  // Cek validasi sebelum mengubah nilai
                  const newValue = e.target.value;
                  if (validateShortLink(newValue)) {
                    setShortLink(newValue);
                    setIsCustomShortLink(newValue.trim() !== ""); // ✅ Tandai jika user mengedit short link
                  } else {
                    // Jika ada karakter tidak valid, filter semua karakter yang tidak valid
                    const filteredValue = newValue.replace(/[^a-zA-Z0-9]/g, "");
                    setShortLink(filteredValue);
                    setIsCustomShortLink(filteredValue.trim() !== "");
                  }
                }}
              />
            </div>
            {validationError && (
              <span className="text-red-500 text-sm mt-1">
                {validationError}
              </span>
            )}
          </div>
          <Label className="mt-5 mb-3">Tags</Label>
          <ComboBoxForTags
            dataTags={dataTags}
            setSelectedTags={setTags}
            selectedTags={tags}
          />
          <Label className="mt-5 mb-3">UTM</Label>
          <div className="mt-3">
            <FormsUTM
              source={source}
              setSource={setSource}
              medium={medium}
              setMedium={setMedium}
              campaign={campaign}
              setCampaign={setCampaign}
              term={term}
              setTerm={setTerm}
              content={content}
              setContent={setContent}
              referral={referral}
              setReferral={setReferral}
              destinationUrl={destinationUrl}
              setDestinationUrl={setDestinationUrl}
              sourceOptions={sourceOptions}
              mediumOptions={mediumOptions}
            />
          </div>
        </div>
        <div className="bg-neutral-900 text-white font-bold p-3 pb-5 border h-max border-neutral-900 rounded-md">
          <h2 className="text-center">QR CODE</h2>
          <div
            className="relative mt-2 py-1 rounded-md flex items-center justify-center border border-neutral-900"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.2) 20%, transparent 20%)",
              backgroundSize: "5px 5px",
              opacity: 0.8,
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

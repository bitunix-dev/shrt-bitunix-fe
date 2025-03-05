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
    destinationUrl: string
}

export const Forms: React.FC<FormsProps> = ({
    dataTags,
    setDestinationUrl,
    setTags,
    tags,
    setShortLink,
    shortLink,
    destinationUrl
}) => {
    const [isCustomShortLink, setIsCustomShortLink] = useState(false); // ✅ Menandai apakah user mengedit short link

    // ✅ Fungsi untuk generate random string 6 huruf
    const generateRandomString = (length = 6) => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
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
                    <Label className="mb-3" htmlFor="link">Link</Label>
                    <Input
                        onChange={(e) => {
                            setDestinationUrl(e.target.value);
                            if (!isCustomShortLink) {
                                setShortLink(generateRandomString(6)); // ✅ Hanya generate jika user belum custom
                            }
                        }}
                        value={destinationUrl}
                        id="link"
                        placeholder="Masukkan link tujuan"
                    />
                    <Label className="mb-3 mt-5" htmlFor="short-link">Short Link</Label>
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
                    <ComboBoxForTags dataTags={dataTags} setSelectedTags={setTags} selectedTags={tags} />
                </div>
                <div className="bg-gray-50 p-3 border rounded-md">
                    <h2>Qr Code</h2>
                    <div className="border mt-2 py-2 rounded-md flex items-center justify-center">
                        <QRCodeGenerator value={`short.bituniaxds.com/${shortLink}`} />
                    </div>
                    {/* <h2 className="mt-3">Custom Link Preview</h2> */}
                </div>
            </div>
        </>
    );
};

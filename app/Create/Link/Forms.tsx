import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ComboboxForLink } from "@/components/Combobox/ComboboxForLink"
import { ComboBoxForTags } from "@/components/Combobox/ComboboxForTags"
import React, { ReactPortal, SetStateAction } from "react"

interface FormsProps {
    dataTags: any
    setDestinationUrl: React.Dispatch<React.SetStateAction<any>>
    setTags: React.Dispatch<React.SetStateAction<any>>
    setSource: React.Dispatch<React.SetStateAction<any>>
    setMedium: React.Dispatch<React.SetStateAction<any>>
    setCampaign: React.Dispatch<React.SetStateAction<any>>
    setTerm: React.Dispatch<React.SetStateAction<any>>
    setContent: React.Dispatch<React.SetStateAction<any>>
    setReferral: React.Dispatch<React.SetStateAction<any>>
}

export const Forms:React.FC<FormsProps> = ({
    dataTags,
    setDestinationUrl,
    setTags,
    setSource,
    setMedium,
    setCampaign,
    setTerm,
    setContent,
    setReferral,
}) => {
    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    <Label className="mb-3" htmlFor="link">Link</Label>
                    <Input id="link" placeholder="" />
                    <Label className="mb-3 mt-5" htmlFor="short-link">Short Link</Label>
                    <div className="flex">
                        <ComboboxForLink />
                        <Input className="rounded-l-none" id="link" placeholder="" />
                    </div>
                    <Label className="mt-5 mb-3">Tags</Label>
                    <ComboBoxForTags dataTags={dataTags}/>
                </div>
                <div className="bg-gray-50 p-3 border rounded-md">
                    <h2>Qrcode</h2>
                </div>
            </div>
        </>
    )
}
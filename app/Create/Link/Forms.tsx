import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ComboboxForLink } from "@/components/Combobox/ComboboxForLink"
import { ComboBoxForTags } from "@/components/Combobox/ComboboxForTags"

interface FormsProps {
    dataTags: any
}

export const Forms:React.FC<FormsProps> = ({
    dataTags
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
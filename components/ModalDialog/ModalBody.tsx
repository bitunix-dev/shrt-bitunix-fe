import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { ComboboxForLink } from "../Combobox/ComboboxForLink"
import { ComboBoxForTags } from "./ComboboxForTags"


interface ModalBodyProps {
    children: React.ReactNode
}

export const ModalBody:React.FC<ModalBodyProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}
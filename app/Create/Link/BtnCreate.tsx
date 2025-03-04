import { Button } from "@/components/ui/button"

interface BtnCreateProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const BtnCreate: React.FC<BtnCreateProps> = ({
    setOpen
}) => {
    const handleClick = () => {
        setOpen(true)
    }
    return (
        <>
            <Button onClick={() => handleClick()}>Create Link</Button>
        </>
    )
}
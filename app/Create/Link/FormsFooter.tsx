import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"
import { Creata } from "../UTM/Create"
import { SubmitCreate } from "./Submit"

interface FormFooterProps {
    dataBody: any
}

export const FormFooter:React.FC<FormFooterProps> = ({
    dataBody
}) => {

    const handleClick = async () => {
        try {
            const response = await SubmitCreate({
                dataBody
            })
            console.log(response);
        } catch (error) {
            
        }
    }

    return (
        <>
            <hr className="mt-5"/>
            <div
                className="mt-5 flex justify-between"
            >
                <Creata />
                <Dialog.Close asChild>
                    <Button>Create</Button>
                </Dialog.Close>
            </div>
        </>
    )
}
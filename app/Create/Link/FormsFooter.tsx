import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"
import { Creata } from "../UTM/Create"

export const FormFooter = () => {
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
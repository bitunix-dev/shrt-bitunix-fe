import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"

export const FormFooter = () => {
    return (
        <>
            <hr className="mt-5"/>
            <div
                className="mt-5 text-end"
            >
                <Dialog.Close asChild>
                    <Button>Create</Button>
                </Dialog.Close>
            </div>
        </>
    )
}
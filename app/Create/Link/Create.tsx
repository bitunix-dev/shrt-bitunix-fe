'use client';

import Modal from "@/components/ModalDialog/Modal";
import { Forms } from "./Forms";
import { BtnCreate } from "./BtnCreate";
import { useState } from "react";
import { FormFooter } from "./FormsFooter";
import { useGetTags } from "@/hooks/useGetTags";

export const Create = () => {
    const [open, setOpen] = useState(false);

     const {data, isLoading, error} = useGetTags()

    return (
        <>
            <Modal
                ModalBodyComponents={<Forms 
                    dataTags={data?.data}
                />}
                BtnCreate={<BtnCreate setOpen={setOpen}/>}
                setOpen={setOpen}
                open={open}
                zIndex={"z-10"}
                width="max-w-5xl"
                ModalTitle="Link"        
                ModalDescription="Create a new Link"
                ModalFooter={<FormFooter/>}
            />
        </>
    )
}
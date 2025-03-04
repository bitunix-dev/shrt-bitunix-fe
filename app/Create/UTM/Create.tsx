'use client';

import Modal from "@/components/ModalDialog/Modal";
import { BtnCreate } from "./BtnCreate";
import { Forms } from "./Forms";
import { useState, useEffect } from "react";
import { FormFooter } from "./FormsFooter";


export const Creata = () => {

    const [open, setOpen] = useState(false);
    return(
        <>
            <Modal
                ModalBodyComponents={<Forms/>} 
                BtnCreate={<BtnCreate
                    setOpen={setOpen}
                />}
                setOpen={setOpen}
                open={open}
                zIndex="z-20"   
                width="max-w-xl" 
                ModalTitle="UTM"        
                ModalDescription="Create a UTM"
                ModalFooter={<FormFooter/>}
            />
        </>
    )
}
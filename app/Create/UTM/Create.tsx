'use client';

import Modal from "@/components/ModalDialog/Modal";
import { BtnCreate } from "./BtnCreate";
import { Forms } from "./Forms";
import { useState } from "react";
import { FormFooter } from "./FormsFooter";

interface CreateUtmProps {
    setDestinationUrl: React.Dispatch<React.SetStateAction<string>>
    destinationUrl: string
}

export const Create:React.FC<CreateUtmProps> = ({
    setDestinationUrl,
    destinationUrl
}) => {

    const [open, setOpen] = useState(false);
    const [source, setSource] = useState<string>('')
    const [medium, setMedium] = useState<string>('')
    const [campaign, setCampaign] = useState<string>('')
    const [term, setTerm] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [referral, setReferral] = useState<string>('')

    return (
        <>
            <Modal
                ModalBodyComponents={<Forms
                    setSource={setSource}
                    source={source}
                    setMedium={setMedium}
                    medium={medium}
                    setCampaign={setCampaign}
                    campaign={campaign}
                    setTerm={setTerm}
                    term={term}
                    setContent={setContent}
                    content={content}
                    setReferral={setReferral}
                    referral={referral}
                    setDestinationUrl={setDestinationUrl}
                    destinationUrl={destinationUrl}
                />}
                BtnCreate={<BtnCreate
                    setOpen={setOpen}
                    destinationUrl={destinationUrl}
                />}
                setOpen={setOpen}
                open={open}
                zIndex="z-20"
                width="max-w-xl"
                ModalTitle="UTM"
                ModalDescription="Create a UTM"
                ModalFooter={<FormFooter setOpen={setOpen}/>}
            />
        </>
    )
}
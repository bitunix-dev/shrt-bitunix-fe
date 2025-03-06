'use client';

import Modal from "@/components/ModalDialog/Modal";
import { BtnCreate } from "./BtnCreate";
import { Forms } from "./Forms";
import { FormFooter } from "./FormsFooter";
import { useState } from "react";

interface CreateUtmProps {
    setDestinationUrl: React.Dispatch<React.SetStateAction<string>>;
    destinationUrl: string;
    source: string;
    setSource: React.Dispatch<React.SetStateAction<string>>;
    medium: string;
    setMedium: React.Dispatch<React.SetStateAction<string>>;
    campaign: string;
    setCampaign: React.Dispatch<React.SetStateAction<string>>;
    term: string;
    setTerm: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    referral: string;
    setReferral: React.Dispatch<React.SetStateAction<string>>;
}

export const Create: React.FC<CreateUtmProps> = ({
    setDestinationUrl,
    destinationUrl,
    source,
    setSource,
    medium,
    setMedium,
    campaign,
    setCampaign,
    term,
    setTerm,
    content,
    setContent,
    referral,
    setReferral
}) => {

    const [open, setOpen] = useState<boolean>(false)

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
    );
};

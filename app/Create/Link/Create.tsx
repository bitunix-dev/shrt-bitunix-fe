'use client';

import Modal from "@/components/ModalDialog/Modal";
import { Forms } from "./Forms";
import { BtnCreate } from "./BtnCreate";
import { useState } from "react";
import { FormFooter } from "./FormsFooter";
import { useGetTags } from "@/hooks/useGetTags";

export const Create = () => {
    const [open, setOpen] = useState(false);
    const [destinationUrl, setDestinationUel] = useState<string>('')
    const [tags, setTags] = useState<[]>([])
    const [source, setSource] = useState<string>('')
    const [medium, setMedium] = useState<string>('')
    const [campaign, setCampaign] = useState<string>('')
    const [term, setTerm] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [referral, setReferral] = useState<string>('')

    const { data, isLoading, error } = useGetTags()

    const dataBody = {
        destination_url: destinationUrl,
        tags: tags,
        source: source,
        medium: medium,
        campaign: campaign,
        term: term,
        content: content,
        referral: referral       
    }

    return (
        <>
            <Modal
                ModalBodyComponents={<Forms
                    dataTags={data?.data}
                />}
                BtnCreate={<BtnCreate setOpen={setOpen} />}
                setOpen={setOpen}
                open={open}
                zIndex={"z-10"}
                width="max-w-5xl"
                ModalTitle="Link"
                ModalDescription="Create a new Link"
                ModalFooter={<FormFooter
                    dataBody={dataBody}
                />}
            />
        </>
    )
}
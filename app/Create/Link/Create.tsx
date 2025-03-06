'use client';

import Modal from "@/components/ModalDialog/Modal";
import { Forms } from "./Forms";
import { BtnCreate } from "./BtnCreate";
import React, { useState } from "react";
import { FormFooter } from "./FormsFooter";
import { useGetTags } from "@/hooks/useGetTags";

interface CreateProps {
    refetch: () => void; // ✅ Tambahkan prop untuk refetch
}

export const Create: React.FC<CreateProps> = ({
    refetch
}) => {
    const [open, setOpen] = useState(false);
    const [destinationUrl, setDestinationUrl] = useState<string>('')
    const [tags, setTags] = useState<[]>([])
    const [shortLink, setShortLink] = useState<string>(""); // ✅ State untuk menyimpan short link
    const [medium, setMedium] = useState<string>("")
    const [source, setSource] = useState<string>("")
    const [campaign, setCampaign] = useState<string>("")
    const [term, setTerm] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [referral, setReferral] = useState<string>("")

    const { data } = useGetTags()

    const dataBody = {
        "destination_url": destinationUrl,
        "tags": tags,
    }

    return (
        <>
            <Modal
                ModalBodyComponents={<Forms
                    dataTags={data?.data}
                    setTags={setTags}
                    tags={tags}
                    setDestinationUrl={setDestinationUrl}
                    setShortLink={setShortLink}
                    shortLink={shortLink}
                    destinationUrl={destinationUrl}
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
                    refetch={refetch}
                    setOpen={setOpen}
                    setDestinasionUrl={setDestinationUrl}
                    destinasiUrl={destinationUrl} 
                    open={false} 
                    source={source} 
                    setSource={setSource} 
                    medium={medium} 
                    setMedium={setMedium} 
                    campaign={campaign} 
                    setCampaign={setCampaign} 
                    term={term} 
                    setTerm={setTerm} 
                    content={content} 
                    setContent={setContent} 
                    referral={referral} 
                    setReferral={setReferral} 
                />}
            />
        </>
    )
}
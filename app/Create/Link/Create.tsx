'use client';

import Modal from "@/components/ModalDialog/Modal";
import { Forms } from "./Forms";
import { BtnCreate } from "./BtnCreate";
import React, { useState, useEffect } from "react";
import { FormFooter } from "./FormsFooter";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetSources } from "@/hooks/useGetSource";
import { useGetMediums } from "@/hooks/useGetMedium";

interface CreateProps {
    refetch: () => void; // ✅ Tambahkan prop untuk refetch
}

export const Create: React.FC<CreateProps> = ({
    refetch
}) => {
    const [data, setData] = useState<any>([])
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
    const [dataSource, setDataSource] = useState<any>([])
    const [dataMedium, setDataMedium] = useState<any>([])
    const { data: tagsData, refetch: refetchTags } = useGetTags();
    const { data: sourceData, refetch: refetchSources } = useGetSources();
    const { data: mediumData, refetch: refetchMediums } = useGetMediums();

    useEffect(() => {
        if (tagsData) setData(tagsData);
    }, [tagsData]);

    useEffect(() => {
        if (sourceData) setDataSource(sourceData);
    }, [sourceData]);

    useEffect(() => {
        if (mediumData) setDataMedium(mediumData);
    }, [mediumData]);

    const refetchAllData = async () => {
        await Promise.all([refetchTags(), refetchSources(), refetchMediums()]);
    };

    useEffect(() => {
        if (open) {
            refetchAllData();
        }
    }, [open]);

    const dataBody = {
        "destination_url": destinationUrl,
        "tags": tags,
        "short_link": shortLink,
        "source": source,
        "medium": medium,
        "campaign": campaign,
        "term": term,
        "content": content,
        "referral": referral
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
                    sourceOptions={dataSource?.data}
                    mediumOptions={dataMedium?.data} />}
                BtnCreate={<BtnCreate setOpen={setOpen} refetch={data.refetch} />}
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
                />}
            />
        </>
    )
}
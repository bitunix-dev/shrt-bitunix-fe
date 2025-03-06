import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Create } from "../UTM/Create";
import { SubmitCreate } from "./Submit";
import React from "react";

interface FormFooterProps {
  dataBody: any;
  refetch: () => void; // ✅ Tambahkan prop untuk refetch
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDestinasionUrl: React.Dispatch<React.SetStateAction<string>>;
  destinasiUrl: string;
  open: boolean;
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

export const FormFooter: React.FC<FormFooterProps> = ({
  dataBody,
  refetch,
  setOpen,
  setDestinasionUrl,
  destinasiUrl,
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
  const handleClick = async () => {
    try {
      const response = await SubmitCreate({
        dataBody,
      });
      console.log(response);
      if (response.status === 201) {
        refetch();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-8 flex justify-between">
        <Create
          setDestinationUrl={setDestinasionUrl}
          destinationUrl={destinasiUrl}
          setSource={setSource}
          source={source}
          setCampaign={setCampaign}
          campaign={campaign}
          setMedium={setMedium}
          medium={medium}
          setContent={setContent}
          content={content}
          setReferral={setReferral}
          referral={referral} 
          term={term} 
          setTerm={setTerm}        />
        <Dialog.Close asChild>
          <Button
            onClick={() => handleClick()}
            className="bg-lime-500 hover:bg-lime-600 text-black font-bold p-5"
          >
            Create
          </Button>
        </Dialog.Close>
      </div>
    </>
  );
};

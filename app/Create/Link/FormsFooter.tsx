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
}

export const FormFooter: React.FC<FormFooterProps> = ({
  dataBody,
  refetch,
  setOpen,
  setDestinasionUrl,
  destinasiUrl,
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
      <hr className="mt-5" />
      <div className="mt-5 flex justify-between">
        <Create
          setDestinationUrl={setDestinasionUrl}
          destinationUrl={destinasiUrl}
        />
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

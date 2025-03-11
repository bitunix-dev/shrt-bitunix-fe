import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";
import { SubmitCreate } from "./Submit";
import React from "react";

interface FormFooterProps {
  dataBody: any;
  refetch: () => void; // ✅ Tambahkan prop untuk refetch
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  dataBody,
  refetch,
  setOpen,
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
      <div className="mt-8 flex justify-end">
        <Dialog.Close asChild>
          <Button
            onClick={() => handleClick()}
            className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black font-bold p-5"
          >
            Create
          </Button>
        </Dialog.Close>
      </div>
    </>
  );
};

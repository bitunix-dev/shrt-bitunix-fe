import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";
import React from "react";

interface FormFooterProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormFooter: React.FC<FormFooterProps> = ({ setOpen }) => {
  return (
    <>
      <hr className="mt-5" />
      <div className="mt-5 text-end">
        <Dialog.Close asChild>
          <Button
            onClick={() => setOpen(false)}
            className="bg-lime-500 hover:bg-lime-600 text-black font-bold p-5"
          >
            Create
          </Button>
        </Dialog.Close>
      </div>
    </>
  );
};

import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import { ModalBody } from "./ModalBody";

interface ModalProps {
  ModalBodyComponents: React.ReactNode;
  BtnCreate: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  zIndex: string;
  width: string;
  ModalTitle: string;
  ModalDescription: string;
  ModalFooter: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  ModalBodyComponents,
  BtnCreate,
  open,
  setOpen,
  zIndex,
  width,
  ModalDescription,
  ModalTitle,
  ModalFooter,
}) => (
  <Dialog.Root open={open}>
    <Dialog.Trigger asChild>{BtnCreate}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={`${styles.Overlay} ${zIndex}`} />
      <Dialog.Content className={`${styles.Content} ${width} md:overflow-hidden overflow-y-scroll`}>
        <Dialog.Title className={styles.Title}>{ModalTitle}</Dialog.Title>
        <Dialog.Description className={styles.Description}>
          {ModalDescription}
        </Dialog.Description>
        <ModalBody>{ModalBodyComponents}</ModalBody>
        {ModalFooter}
        <Dialog.Close asChild>
          <button
            onClick={() => setOpen(false)}
            className={styles.IconButton}
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;

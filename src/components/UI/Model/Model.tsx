import * as React from "react";
import { Dialog } from "radix-ui";
import styles from "./styles.module.css";
import { CloseSVG } from "../../SVG/CloseSVG";

interface ModelProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Model = ({ open, handleClose, children }: ModelProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          {children}
          <Dialog.Close asChild>
            <button
              className={styles.IconButton}
              aria-label="Close"
              onClick={handleClose}
            >
              <CloseSVG />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Model;

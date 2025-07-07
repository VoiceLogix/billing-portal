import * as React from "react";
import { Dialog } from "radix-ui";
import styles from "./styles.module.css";
import { CloseSVG } from "../../SVG/CloseSVG";
import { Typography } from "../Typography";
import { Box } from "../Box";

interface ModelProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  width?: string | number;
  height?: string | number;
}

const Model = ({
  open,
  handleClose,
  children,
  title,
  subtitle,
  width = "600px",
  height = "auto",
}: ModelProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content
          className={styles.DialogContent}
          style={{ width, height }}
        >
          <Box display="flex" flexDirection="column">
            <Typography size="big" weight="semibold">
              {title}
            </Typography>
            <Typography color="secondaryText">{subtitle}</Typography>
          </Box>
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

import * as React from "react";
import { Dialog } from "radix-ui";
// import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";

const Model = ({ url }: { url?: string }) => {
  // console.log("Model URL:", url);

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          {/* <iframe src={url} id="paymentIframe" width="100%" height="600px" /> */}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              {/* <Cross2Icon /> */}
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Model;

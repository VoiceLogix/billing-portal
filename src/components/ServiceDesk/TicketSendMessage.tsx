import { useState } from "react";
import { DownloadSVG } from "../SVG/DownloadSVG";
import TextEditor from "../TextEditor";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";
import { Attachments } from "./Attachments";
import { AttachmentFile } from "./types";
import { useUpdateTicket } from "../../service/service_desk/UpdateTicket";

interface TicketSendMessageProps {
  ticketId: string;
}

const TicketSendMessage = ({ ticketId }: TicketSendMessageProps) => {
  const [files, setFiles] = useState<AttachmentFile[]>([]);
  const [message, setMessage] = useState<string>("");
  const { mutateAsync: updateTicket, isPending } = useUpdateTicket({
    ticketId,
  });

  const handleAttachmentsChange = (newFiles: AttachmentFile[]) => {
    setFiles(newFiles);
  };
  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const handleReply = async () => {
    const payload = {
      clientTicket: {
        conversations: [
          {
            conversation: message,
            attachments: files,
          },
        ],
      },
    };
    try {
      await updateTicket(payload);
      setMessage("");
      setFiles([]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box
      marginTop="20px"
      bgColor="bgPrimary"
      padding="12px"
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      gap="12px"
    >
      <Typography size="medium" weight="semibold">
        Message
      </Typography>

      <TextEditor onValueChange={handleMessageChange} value={message} />
      <Box>
        <Attachments
          files={files}
          setFiles={handleAttachmentsChange}
          withoutLabel
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="white"
          bgColor="blueAccent"
          borderSize="1px"
          text="Reply"
          onClick={handleReply}
          isLoading={isPending}
          disabled={message.trim() === "" || isPending}
        />
      </Box>
    </Box>
  );
};

export default TicketSendMessage;

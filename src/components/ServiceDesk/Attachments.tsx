import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";

import type { AttachmentFile } from "./types";

interface AttachmentsProps {
  files: AttachmentFile[];
  setFiles: (files: AttachmentFile[]) => void;
  withoutLabel?: boolean;
}

export const Attachments = ({
  files,
  setFiles,
  withoutLabel,
}: AttachmentsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const currentFiles = Array.isArray(files) ? files : [];

      const filePromises = newFiles.map((file) => {
        return new Promise<AttachmentFile>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            const base64Content = base64.split(",")[1];
            resolve({
              filename: file.name,
              fileContent: base64Content,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      try {
        const newAttachments = await Promise.all(filePromises);

        const existingFilenames = currentFiles.map((f) => f.filename);
        const uniqueAttachments = newAttachments.filter(
          (attachment) => !existingFilenames.includes(attachment.filename),
        );

        const allFiles = [...currentFiles, ...uniqueAttachments];
        console.log("Selected files:", allFiles);

        setFiles(allFiles);
        e.target.value = "";
      } catch (error) {
        console.error("Error processing files:", error);
      }
    }
  };

  const handleRemoveFile = (idx: number) => {
    const updatedFiles = files.filter((_, i) => i !== idx);
    setFiles(updatedFiles);
  };

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      {!withoutLabel && <Typography weight="medium">Attachments</Typography>}
      <Box>
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          borderColor="blueText"
          borderSize="1px"
          color="blueText"
          onClick={handleButtonClick}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="3px"
          >
            <Upload width={16} height={16} color="currentColor" />
            <>Upload file</>
          </Box>
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap="8px"
        style={{
          overflowX: "auto",
          padding: "4px 0",
        }}
      >
        {files.map((file, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            style={{
              whiteSpace: "nowrap",
              position: "relative",
            }}
          >
            <Typography color="secondaryText">{file.filename}</Typography>
            <Button
              type="button"
              onClick={() => handleRemoveFile(idx)}
              color="errorText"
              aria-label={`Remove ${file.filename}`}
            >
              <X />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

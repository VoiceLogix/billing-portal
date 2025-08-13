import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";

interface AttachmentsProps {
  files: string[];
  setFiles: (files: string[]) => void;
}

export const Attachments = ({ files, setFiles }: AttachmentsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const fileNames = newFiles.map((file) => file.name);
      const currentFiles = Array.isArray(files) ? files : [];
      const allFiles = [...currentFiles, ...fileNames];
      // Remove duplicates
      const uniqueFiles = Array.from(new Set(allFiles));
      setFiles(uniqueFiles);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (idx: number) => {
    const updatedFiles = files.filter((_, i) => i !== idx);
    setFiles(updatedFiles);
  };

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Typography weight="medium">Attachments</Typography>
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
            <Typography color="secondaryText">{file}</Typography>
            <Button
              type="button"
              onClick={() => handleRemoveFile(idx)}
              color="errorText"
              aria-label={`Remove ${file}`}
            >
              <X />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

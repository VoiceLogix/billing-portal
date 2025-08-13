import { useState } from "react";
import { formatDateTimeObject } from "../../utils/formatDate";
import { DownloadSVG } from "../SVG/DownloadSVG";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import Model from "../UI/Model/Model";
import { TicketData } from "./types";
import { getImageBase64Previews, splitAttachmentsByType } from "./utils";
import { Search } from "lucide-react";
import { PDFSVG } from "../SVG/PDFSVG";
import { ExcelSVG } from "../SVG/ExcelSVG";
import { FileSVG } from "../SVG/FileSVG";

interface TicketBodyProps {
  ticket: TicketData;
}

type Attachment = {
  image: string;
  name: string;
};

const TicketBody = ({ ticket }: TicketBodyProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { date, time } = formatDateTimeObject(ticket.createdDate);
  const { images, others } = splitAttachmentsByType(ticket.attachments);
  const imagesPreviews = getImageBase64Previews(images);

  const handleImageClick = (image: Attachment) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };
  return (
    <Box
      width="752px"
      height="fit-content"
      padding="12px"
      border="1px solid"
      borderColor="border"
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      gap="16px"
    >
      <Box display="flex" flexDirection="column" gap="2px">
        <Typography weight="medium">{ticket.contact}</Typography>
        <Typography
          size="xSmall"
          color="secondaryText"
        >{`${date} ${time}`}</Typography>
      </Box>
      <Box borderTop="1px solid" borderColor="border" />
      <Typography>{ticket.description}</Typography>
      <Box
        marginTop="16px"
        style={{
          overflowX: "scroll",
        }}
      >
        {imagesPreviews.length > 0 && (
          <Box display="flex" gap="20px" style={{ overflowX: "auto" }}>
            {imagesPreviews.map((image, index) => (
              <Box
                key={index}
                width="135px"
                height="90px"
                style={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.image}
                  alt={`attachment-${index}`}
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: "4px",
                    objectFit: "cover",
                    transition: "transform 0.2s ease",
                    transform:
                      hoveredImage === index ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {hoveredImage === index && (
                  <Box
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                    }}
                  >
                    <Search color="white" />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box display="flex" gap="8px" className="always-show-scrollbar">
        {others.map((attachment) => (
          <Box
            key={attachment}
            bgColor="bgPrimary"
            padding="4px"
            paddingLeft="8px"
            paddingRight="8px"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            {getFileIconType(attachment)}
            {attachment}
            <DownloadSVG />
          </Box>
        ))}
      </Box>

      <Model
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        title={selectedImage?.name || "Image Preview"}
        width="auto"
        minWidth="400px"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="16px"
          width="900px"
          height="544px"
        >
          {selectedImage && (
            <img
              src={selectedImage.image}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            />
          )}
        </Box>
      </Model>
    </Box>
  );
};

export default TicketBody;

export function getFileIconType(fileName: string) {
  const ext = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();

  if (ext === "pdf") return <PDFSVG />;
  if (["xls", "xlsx", "csv"].includes(ext)) return <ExcelSVG />;
  return <FileSVG />;
}

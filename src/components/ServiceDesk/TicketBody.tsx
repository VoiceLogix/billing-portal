import { useState, useMemo } from "react";
import DOMPurify from "dompurify";
import { formatDateTimeObject } from "../../utils/formatDate";
import { DownloadSVG } from "../SVG/DownloadSVG";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import Model from "../UI/Model/Model";
import {
  getImageBase64Previews,
  splitAttachmentsByType,
  processHtmlContent,
} from "./utils";
import { Search } from "lucide-react";
import { PDFSVG } from "../SVG/PDFSVG";
import { ExcelSVG } from "../SVG/ExcelSVG";
import { FileSVG } from "../SVG/FileSVG";
import { Ticket } from "../../types/TicketInterface";
import {
  TicketDetails,
  TicketDetailsAttachment,
} from "../../types/TicketDetailsInterface";

interface TicketBodyProps {
  ticket: TicketDetails;
}

type ImagePreview = {
  image: string;
  name: string;
};

const TicketBody = ({ ticket }: TicketBodyProps) => {
  const [selectedImage, setSelectedImage] = useState<ImagePreview | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const processedDescription = useMemo(() => {
    return processHtmlContent(ticket.description, ticket.inlineContentIds);
  }, [ticket.description, ticket.inlineContentIds]);

  const { date, time } = formatDateTimeObject(ticket.createdDate);
  const { images, others } = splitAttachmentsByType(ticket.attachments);
  const imagesPreviews = getImageBase64Previews(images);

  const handleImageClick = (image: ImagePreview) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  const handleAttachmentDownload = (attachment: TicketDetailsAttachment) => {
    if (attachment.presignedUrl) {
      const link = document.createElement("a");
      link.href = attachment.presignedUrl;
      link.download = attachment.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
        <Typography weight="medium">{`${ticket.createdByFirstName} ${ticket.createdByLastName}`}</Typography>
        <Typography
          size="xSmall"
          color="secondaryText"
        >{`${date} ${time}`}</Typography>
      </Box>
      <Box borderTop="1px solid" borderColor="border" />
      <Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(processedDescription, {
              ADD_ATTR: ["target"],
            }),
          }}
        />
      </Typography>
      {imagesPreviews.length > 0 && (
        <Box
          marginTop="16px"
          style={{
            overflowX: "scroll",
          }}
        >
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
                  width: "135px",
                  minWidth: "135px",
                  maxWidth: "135px",
                  flexShrink: 0,
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
        </Box>
      )}

      <Box
        display="flex"
        gap="8px"
        className={others.length > 0 ? "always-show-scrollbar" : "hidden"}
      >
        {others.map((attachment, index) => (
          <Box
            key={attachment.id || index}
            bgColor="bgPrimary"
            padding="4px"
            paddingLeft="8px"
            paddingRight="8px"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            gap="10px"
            style={{ cursor: "pointer" }}
            onClick={() => handleAttachmentDownload(attachment)}
          >
            {getFileIconType(attachment.filename)}
            {attachment.filename}
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

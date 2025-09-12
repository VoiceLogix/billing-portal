import { useState } from "react";
import { formatDateTimeObject } from "../../utils/formatDate";
import DOMPurify from "dompurify";
import { SupportSVG } from "../SVG/SupportSVG";
import Box, { Divider } from "../UI/Box";
import { Typography } from "../UI/Typography";
import {
  TicketDetails,
  TicketDetailsAttachment,
} from "../../types/TicketDetailsInterface";
import {
  getImageBase64Previews,
  processHtmlContent,
  splitAttachmentsByType,
} from "./utils";
import Model from "../UI/Model/Model";
import { DownloadSVG } from "../SVG/DownloadSVG";
import { Search } from "lucide-react";
import { getFileIconType } from "./TicketBody";

interface TicketCommentsProps {
  ticket: TicketDetails;
}

type ImagePreview = {
  image: string;
  name: string;
};

const TicketComments = ({ ticket }: TicketCommentsProps) => {
  const [selectedImage, setSelectedImage] = useState<ImagePreview | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  if (!ticket.conversations || ticket.conversations.length === 0) {
    return null;
  }
  return (
    <Box marginTop="20px" width="752px">
      <Typography size="medium" weight="semibold">
        Comments
      </Typography>
      <Box
        className="always-show-scrollbar"
        style={{
          overflowX: "hidden",
        }}
        max-height="480px"
      >
        {ticket.conversations.map((comment, commentIndex) => {
          const isSupport =
            ticket.createdByUsername === comment.createdByUsername;
          const { date, time } = formatDateTimeObject(comment.createdDate);

          const inlineContentIds =
            comment.inlineContentIds || ticket.inlineContentIds;

          const { images: commentImages, others: commentOthers } =
            splitAttachmentsByType(comment.attachments || []);
          const commentImagePreviews = getImageBase64Previews(commentImages);

          return (
            <Box
              key={comment.id || commentIndex}
              marginTop="16px"
              display="flex"
              flexDirection="column"
              gap="16px"
              border="1px solid"
              borderColor="border"
              padding="12px"
              borderRadius="8px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {isSupport && <SupportSVG />}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems={isSupport ? "flex-end" : "flex-start"}
                >
                  <Typography weight="medium">
                    {comment.createdByUsername}
                  </Typography>
                  <Typography size="xSmall" color="secondaryText">
                    {date} {time}
                  </Typography>
                </Box>
              </Box>
              <Divider />

              <Box
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    processHtmlContent(comment.conversation, inlineContentIds),
                    {
                      ADD_ATTR: ["target"],
                    },
                  ),
                }}
                style={{
                  whiteSpace: "pre-wrap",
                  textAlign: isSupport ? "right" : "left",
                }}
              />

              {commentImagePreviews.length > 0 && (
                <Box
                  marginTop="16px"
                  style={{
                    overflowX: "scroll",
                  }}
                >
                  <Box display="flex" gap="20px" style={{ overflowX: "auto" }}>
                    {commentImagePreviews.map((image, imageIndex) => {
                      const globalImageIndex = `${commentIndex}-${imageIndex}`;
                      return (
                        <Box
                          key={imageIndex}
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
                          onMouseEnter={() => setHoveredImage(globalImageIndex)}
                          onMouseLeave={() => setHoveredImage(null)}
                          onClick={() => handleImageClick(image)}
                        >
                          <img
                            src={image.image}
                            alt={`comment-attachment-${imageIndex}`}
                            width="100%"
                            height="100%"
                            style={{
                              borderRadius: "4px",
                              objectFit: "cover",
                              transition: "transform 0.2s ease",
                              transform:
                                hoveredImage === globalImageIndex
                                  ? "scale(1.05)"
                                  : "scale(1)",
                            }}
                          />
                          {hoveredImage === globalImageIndex && (
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
                      );
                    })}
                  </Box>
                </Box>
              )}

              {commentOthers.length > 0 && (
                <Box display="flex" gap="8px" className="always-show-scrollbar">
                  {commentOthers.map((attachment, attachmentIndex) => (
                    <Box
                      key={attachment.id || attachmentIndex}
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
              )}
            </Box>
          );
        })}
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

export default TicketComments;

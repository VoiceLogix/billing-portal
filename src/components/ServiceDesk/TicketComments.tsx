import { formatDateTimeObject } from "../../utils/formatDate";
import { SupportSVG } from "../SVG/SupportSVG";
import Box, { Divider } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { TicketData } from "./types";

const comments = [
  {
    id: 1,
    name: "Helen Harper",
    date: 1633036800000,
    content:
      "Hello, Michael. Can you please share logs of your local storage? Here are the instructions.",
    htmlContent:
      "Hello, Michael. Can you please share logs of your local storage? <a href='#'>Here are the instructions.</a>",
  },
  {
    id: 2,
    name: "Kevin Macalister",
    date: 1633036800000,
    content: "I did, but it won't help.",
    htmlContent: "I did, but it won&rsquo;t help.",
  },
  {
    id: 3,
    name: "Helen Harper",
    date: 1633036800000,
    content: "Could you send this log file to me?",
    htmlContent: "Could you send this log file to me?",
  },
  {
    id: 4,
    name: "Kevin Macalister",
    date: 1633036800000,
    content: "I did, but it won't help.",
    htmlContent: "I did, but it won&rsquo;t help.",
  },
];

interface TicketCommentsProps {
  ticket: TicketData;
}

const TicketComments = ({ ticket }: TicketCommentsProps) => {
  return (
    <Box marginTop="20px">
      <Typography size="medium" weight="semibold">
        Comments
      </Typography>
      <Box
        className="always-show-scrollbar"
        style={{
          overflowX: "hidden",
        }}
        height="480px"
      >
        {comments.map((comment) => {
          const isSupport = ticket.assignedTo === comment.name;

          const { date, time } = formatDateTimeObject(comment.date);
          return (
            <Box
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
                  <Typography weight="medium">{comment.name}</Typography>
                  <Typography size="xSmall" color="secondaryText">
                    {date} {time}
                  </Typography>
                </Box>
              </Box>
              <Divider />

              <Box
                dangerouslySetInnerHTML={{ __html: comment.htmlContent }}
                style={{
                  whiteSpace: "pre-wrap",
                  textAlign: isSupport ? "right" : "left",
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TicketComments;

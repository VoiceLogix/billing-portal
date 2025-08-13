import { DownloadSVG } from "../SVG/DownloadSVG";
import TextEditor from "../TextEditor";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";

const TicketSendMessage = () => {
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

      <TextEditor />
      <Box>
        <Button color="blueText" borderColor="blueText" borderSize="1px">
          <Box display="flex" alignItems="center" gap="8px">
            <DownloadSVG />
            Upload file
          </Box>
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="white"
          bgColor="blueAccent"
          borderSize="1px"
          text="Reply"
        />
      </Box>
    </Box>
  );
};

export default TicketSendMessage;

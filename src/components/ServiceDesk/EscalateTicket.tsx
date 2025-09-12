import Model from "../UI/Model/Model";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";
import Box from "../UI/Box";
import { Badge } from "../UI/Badge/Badge";
import Dropdown from "../UI/Dropdown/Dropdown";
import { getErrorMessage } from "./utils";
import TextEditor from "../TextEditor";
import { Attachments } from "./Attachments";
import type { AttachmentFile } from "./types";
import MultiEmailInput from "../UI/MultiEmailInput/MultiEmailInput";
import { useForm, Controller } from "react-hook-form";
import { useEscalateTicket } from "../../service/service_desk/EscalateTicket";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { TicketDetails } from "../../types/TicketDetailsInterface";
import { useGetTicketStatusListWithReasons } from "../../service/service_desk/getTicketStatusListWithReasons";
import TicketBadge from "../TicketBadge";

interface EscalateTicketProps {
  onClose: () => void;
  ticket: TicketDetails;
}

const EscalateTicket = ({ onClose, ticket }: EscalateTicketProps) => {
  const { data: statusList } = useGetTicketStatusListWithReasons();

  const statusData = statusList?.reduce(
    (acc, status) => {
      if (status.statusName === "Escalate") {
        status.reasons.forEach((reason) => {
          acc.escalateReasons.push(reason.value);
          acc.reasonIdMap[reason.value] = reason.id;
        });
      }
      if (status.statusName === "De-escalate") {
        status.reasons.forEach((reason) => {
          acc.deEscalateReasons.push(reason.value);
          acc.reasonIdMap[reason.value] = reason.id;
        });
      }
      return acc;
    },
    {
      deEscalateReasons: [] as string[],
      escalateReasons: [] as string[],
      reasonIdMap: {} as Record<string, string>,
    },
  ) || { deEscalateReasons: [], escalateReasons: [], reasonIdMap: {} };

  const { deEscalateReasons, escalateReasons, reasonIdMap } = statusData;
  const isFlagged = ticket.isEscalated;
  const getDefaultValues = () => ({
    reason: "",
    description: "",
    attachments: [],
    cc: [],
    bcc: [],
  });

  const {
    mutateAsync: escalateTicket,
    isPending: isEscalateTicketPending,
    isError: escalateTicketError,
    isSuccess: isEscalateTicketSuccess,
    error: escalateTicketErrorMessage,
  } = useEscalateTicket({ ticketId: ticket.ticketNumber });

  useEffect(() => {
    if (escalateTicketError) {
      toast.error(
        getErrorMessage(escalateTicketErrorMessage) ||
          "Something went wrong. Try again.",
      );
    }

    if (isEscalateTicketSuccess) {
      toast.success(
        isFlagged
          ? "Ticket de-escalated successfully."
          : "Ticket escalated successfully.",
      );
    }
  }, [escalateTicketError, isEscalateTicketSuccess]);

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const handleEscalate = async (data) => {
    const escalateData = {
      clientTicket: {
        status: "",
        conversations: [
          {
            conversation: data.description,
            attachments: data.attachments,
            reason: reasonIdMap[data.reason] || data.reason,
          },
        ],
        emailInfo: {
          ccAddressList: data.cc,
          bccAddressList: data.bcc,
        },
      },
    };
    await escalateTicket(escalateData);
    onClose();
  };

  const handleCCChange = (value: string[]) => {
    setValue("cc", value);
  };
  const handleBCCChange = (value: string[]) => {
    setValue("bcc", value);
  };

  const handleAttachmentsChange = (files: AttachmentFile[]) => {
    setValue("attachments", files);
  };

  const hadleReasonChange = (value: string) => {
    setValue("reason", value);
  };
  const files = watch("attachments");
  const reason = watch("reason");
  const cc = watch("cc");
  const bcc = watch("bcc");
  return (
    <Model open={true} handleClose={onClose} width="800px">
      <form onSubmit={handleSubmit(handleEscalate)}>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box display="flex" flexDirection="column" gap="8px">
            <Box display="flex" alignItems="center" gap="8px">
              <Typography weight="semibold" size="big">
                {isFlagged ? "De-Escalate Ticket" : "Escalate Ticket"}{" "}
                {ticket.ticketNumber}
              </Typography>
              <TicketBadge status={ticket?.status || "N/A"} />
            </Box>
            <Typography color="secondaryText">{ticket.subject}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="16px" marginTop="8px">
            <Dropdown
              label="Reason*"
              withBackground={false}
              items={isFlagged ? deEscalateReasons : escalateReasons}
              value={reason}
              onChange={hadleReasonChange}
            />

            <Box display="flex" flexDirection="column" gap="8px">
              <Typography weight="medium">Description*</Typography>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <TextEditor onValueChange={field.onChange} />
                )}
              />
              {errors.description && (
                <Typography color="errorText">
                  {errors.description.message}
                </Typography>
              )}
            </Box>
            <Attachments files={files} setFiles={handleAttachmentsChange} />
            <Box display="flex" gap="8px">
              <MultiEmailInput
                label="CC"
                emails={cc}
                setEmails={handleCCChange}
              />
              <MultiEmailInput
                label="BCC"
                emails={bcc}
                setEmails={handleBCCChange}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap="8px">
            <Button
              onClick={onClose}
              color="blueText"
              borderColor="blueText"
              borderSize="1px"
            >
              Cancel
            </Button>
            <Button
              bgColor="blueAccent"
              type="submit"
              disabled={isEscalateTicketPending}
              isLoading={isEscalateTicketPending}
            >
              {isFlagged ? "De-Escalate" : "Escalate"}
            </Button>
          </Box>
        </Box>
      </form>
    </Model>
  );
};

export default EscalateTicket;

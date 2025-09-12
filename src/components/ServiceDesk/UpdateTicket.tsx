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
import { useEffect, useMemo } from "react";
import { TicketDetails } from "../../types/TicketDetailsInterface";
import { useGetTicketStatusListWithReasons } from "../../service/service_desk/getTicketStatusListWithReasons";
import { TicketBadge } from "../TicketBadge";

interface UpdateTicketProps {
  onClose: () => void;
  ticket: TicketDetails;
}

const UpdateTicket = ({ onClose, ticket }: UpdateTicketProps) => {
  const { data: statusList } = useGetTicketStatusListWithReasons();
  console.log("Status list:", statusList);

  const filteredStatusList = useMemo(() => {
    if (!statusList) return [];
    return statusList.filter(
      (status) =>
        status.statusName !== "Escalate" &&
        status.statusName !== "De-escalate" &&
        status.statusName !== "New" &&
        status.statusName !== "Time-Entry",
    );
  }, [statusList]);

  const getDefaultValues = () => ({
    status: "Select",
    reason: "Select",
    description: "",
    attachments: [],
    cc: [],
    bcc: [],
  });

  const {
    mutateAsync: updateTicket,
    isPending: isUpdateTicketPending,
    isError: updateTicketError,
    isSuccess: isUpdateTicketSuccess,
    error: updateTicketErrorMessage,
  } = useEscalateTicket({ ticketId: ticket.ticketNumber });

  useEffect(() => {
    if (updateTicketError) {
      toast.error(
        getErrorMessage(updateTicketErrorMessage) ||
          "Something went wrong. Try again.",
      );
    }

    if (isUpdateTicketSuccess) {
      toast.success("Ticket updated successfully.");
    }
  }, [updateTicketError, isUpdateTicketSuccess]);

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const selectedStatus = watch("status");
  const selectedReason = watch("reason");
  const files = watch("attachments");
  const cc = watch("cc");
  const bcc = watch("bcc");

  const availableReasons = useMemo(() => {
    if (!selectedStatus || selectedStatus === "Select" || !filteredStatusList)
      return [];
    const status = filteredStatusList.find(
      (s) => s.statusName === selectedStatus,
    );
    return status ? ["Select", ...status.reasons.map((r) => r.value)] : [];
  }, [selectedStatus, filteredStatusList]);

  const handleUpdate = async (data) => {
    const selectedStatusObj = filteredStatusList.find(
      (s) => s.statusName === data.status,
    );
    const selectedReasonObj = selectedStatusObj?.reasons.find(
      (r) => r.value === data.reason,
    );

    const updateData = {
      clientTicket: {
        status: selectedStatusObj?.id || data.status,
        conversations: [
          {
            conversation: data.description,
            attachments: data.attachments,
            reason: selectedReasonObj?.id || data.reason,
          },
        ],
        emailInfo: {
          ccAddressList: data.cc,
          bccAddressList: data.bcc,
        },
      },
    };
    await updateTicket(updateData);
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

  const handleStatusChange = (value: string) => {
    setValue("status", value);
    setValue("reason", "Select");
  };

  const handleReasonChange = (value: string) => {
    setValue("reason", value);
  };
  return (
    <Model open={true} handleClose={onClose} width="800px">
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box display="flex" flexDirection="column" gap="8px">
            <Box display="flex" alignItems="center" gap="8px">
              <Typography weight="semibold" size="big">
                Update Ticket {ticket.ticketNumber}
              </Typography>
              <TicketBadge status={ticket?.status || "N/A"} />
            </Box>
            <Typography color="secondaryText">{ticket.subject}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="16px" marginTop="8px">
            <Dropdown
              label="Status*"
              withBackground={false}
              items={[
                "Select",
                ...filteredStatusList.map((status) => status.statusName),
              ]}
              value={selectedStatus}
              onChange={handleStatusChange}
            />
            {selectedStatus !== "Select" && (
              <Dropdown
                label="Reason*"
                withBackground={false}
                items={availableReasons}
                value={selectedReason}
                onChange={handleReasonChange}
              />
            )}

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
              disabled={isUpdateTicketPending}
              isLoading={isUpdateTicketPending}
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Model>
  );
};

export default UpdateTicket;

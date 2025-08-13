import { Controller, useForm } from "react-hook-form";
import { Box } from "../UI/Box";
import Model from "../UI/Model/Model";
import TextInput from "../UI/TextInput.tsx/TextInput";
import Dropdown from "../UI/Dropdown/Dropdown";
import MultiEmailInput from "../UI/MultiEmailInput/MultiEmailInput";
import { TicketData, TicketPriority } from "./types";
import { RadioSelect } from "../UI/RadioSelect/RadioSelect";
import { Typography } from "../UI/Typography";
import {
  addresses,
  getErrorMessage,
  incidentSubTypes,
  incidentTypes,
} from "./utils";
import { TextEditor } from "../TextEditor";
import { Button } from "../UI/Button";
import { Attachments } from "./Attachments";
import { Badge } from "../UI/Badge/Badge";
import { useCreateTicket } from "../../service/CreateTicket";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface AddTicketModelProps {
  show: boolean;
  onClose: () => void;
  ticket?: TicketData;
}

const AddTicketModel = ({ show, onClose, ticket }: AddTicketModelProps) => {
  if (!show) return null;

  const isUpdateMode = !!ticket;
  const getDefaultValues = () => ({
    subject: ticket?.subject || "",
    priority: ticket?.priority || TicketPriority.Low,
    incidentType: incidentTypes[0],
    incidentSubType: incidentSubTypes[0],
    description: ticket?.description || "",
    attachments: ticket?.attachments || [],
    address: ticket?.address || addresses[0],
    cc: ticket?.cc || [],
    bcc: ticket?.bcc || [],
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const {
    mutate: createTicket,
    isPending: isCreateTicketPending,
    isError: createTicketError,
    isSuccess: isCreateTicketSuccess,
    error: createTicketErrorMessage,
  } = useCreateTicket({ onClose });

  useEffect(() => {
    if (createTicketError) {
      toast.error(
        getErrorMessage(createTicketErrorMessage) ||
          "Something went wrong. Try again.",
      );
    }

    if (isCreateTicketSuccess) {
      toast.success(
        isUpdateMode
          ? "Ticket updated successfully."
          : "Ticket created successfully.",
      );
    }
  }, [createTicketError, isCreateTicketSuccess]);

  const subject = watch("subject");
  const selectedPriority = watch("priority");
  const incidentType = watch("incidentType");
  const incidentSubType = watch("incidentSubType");
  const files = watch("attachments");
  const cc = watch("cc");
  const bcc = watch("bcc");
  const handlePriorityChange = (value: TicketPriority) => {
    setValue("priority", value);
  };
  const handleIncidentTypeChange = (value: string) => {
    setValue("incidentType", value);
  };
  const handleIncidentSubTypeChange = (value: string) => {
    setValue("incidentSubType", value);
  };

  const handleCCChange = (value: string[]) => {
    setValue("cc", value);
  };
  const handleBCCChange = (value: string[]) => {
    setValue("bcc", value);
  };

  const handleAttachmentsChange = (files: string[]) => {
    setValue("attachments", files);
  };
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    const ticketData = {
      subject: data.subject,
      priority: data.priority,
      incidentType: data.incidentType,
      incidentSubType: data.incidentSubType,
      description: data.description,
      attachments: data.attachments,
      address: data.address,
      cc: data.cc,
      bcc: data.bcc,
    };
    createTicket(ticketData);
  };

  return (
    <Model open={show} handleClose={onClose} width="800px">
      <Box
        display="flex"
        flexDirection="column"
        style={{
          height: "calc(100vh - 100px)",
          minHeight: "500px",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box display="flex" flexDirection="column" gap="8px">
            {isUpdateMode && ticket ? (
              <Box display="flex" alignItems="center" gap="8px">
                <Typography weight="semibold" size="big">
                  Edit Ticket {ticket?.ticketNumber}
                </Typography>
                <Badge status={ticket.status} />
              </Box>
            ) : (
              <Typography weight="semibold" size="big">
                Submit Ticket
              </Typography>
            )}
            <Typography color="secondaryText">
              {subject || ticket?.subject}
            </Typography>
          </Box>

          {/* Scrollable content area */}
          <Box
            marginTop="16px"
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "4px",
              minHeight: 0,
            }}
          >
            <Box display="flex" flexDirection="column" gap="20px">
              <Box display="flex" gap="32px" alignItems="center">
                <Box width="368px">
                  <TextInput
                    label="Subject*"
                    name="subject"
                    register={register}
                    rules={{ required: "Subject is required", maxLength: 100 }}
                    error={errors.subject}
                  />
                </Box>

                <Box>
                  <Typography>Priority</Typography>
                  <Box display="flex" gap="8px" marginTop="8px">
                    <RadioSelect
                      label="Low"
                      checked={selectedPriority === TicketPriority.Low}
                      onChange={() => handlePriorityChange(TicketPriority.Low)}
                    />
                    <RadioSelect
                      label="Medium"
                      checked={selectedPriority === TicketPriority.Medium}
                      onChange={() =>
                        handlePriorityChange(TicketPriority.Medium)
                      }
                    />
                    <RadioSelect
                      label="High"
                      checked={selectedPriority === TicketPriority.High}
                      onChange={() => handlePriorityChange(TicketPriority.High)}
                    />
                    <RadioSelect
                      label="Critical"
                      checked={selectedPriority === TicketPriority.Critical}
                      onChange={() =>
                        handlePriorityChange(TicketPriority.Critical)
                      }
                    />
                  </Box>
                </Box>
              </Box>
              <Box display="flex" gap="8px">
                <Dropdown
                  label="Incident Category"
                  withBackground={false}
                  value={incidentType}
                  items={incidentTypes}
                  onChange={handleIncidentTypeChange}
                  width="100%"
                  error={errors.incidentType}
                />
                <Dropdown
                  label="Incident Subcategory"
                  withBackground={false}
                  value={incidentSubType}
                  items={incidentSubTypes}
                  onChange={handleIncidentSubTypeChange}
                  width="100%"
                  error={errors.incidentSubType}
                />
              </Box>

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
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
                marginBottom="10px"
              >
                <Dropdown
                  withBackground={false}
                  label="Address"
                  value={watch("address")}
                  items={addresses}
                  onChange={(value) => setValue("address", value)}
                  width="100%"
                  error={errors.address}
                />
                <Box display="flex" gap="8px" marginTop="8px">
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
            </Box>
          </Box>

          <Box
            display="flex"
            gap="8px"
            justifyContent="flex-end"
            marginTop="16px"
            paddingTop="16px"
            style={{
              borderTop: "1px solid #eee",
            }}
          >
            <Button
              text="Cancel"
              onClick={onClose}
              color="blueAccent"
              borderColor="blueAccent"
              borderSize="1px"
            />
            <Button
              type="submit"
              bgColor="blueAccent"
              text={isUpdateMode ? "Update" : "Submit"}
              disabled={isCreateTicketPending}
              isLoading={isCreateTicketPending}
            />
          </Box>
        </form>
      </Box>
    </Model>
  );
};
export default AddTicketModel;

import { Controller, useForm } from "react-hook-form";
import { Box } from "../UI/Box";
import Model from "../UI/Model/Model";
import TextInput from "../UI/TextInput.tsx/TextInput";
import Dropdown from "../UI/Dropdown/Dropdown";
import MultiEmailInput from "../UI/MultiEmailInput/MultiEmailInput";
import { TicketPriority } from "./types";
import { RadioSelect } from "../UI/RadioSelect/RadioSelect";
import { Typography } from "../UI/Typography";
import { getErrorMessage, getIncidentCategories, getIncidentSubCategories, getClassificationId } from "./utils";
import { TextEditor } from "../TextEditor";
import { Button } from "../UI/Button";
import { Attachments } from "./Attachments";
import type { AttachmentFile } from "./types";
import { useCreateTicket } from "../../service/service_desk/CreateTicket";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useGetSubscriberInfo } from "../../service/billing_center/getSubscriberInfo";
import { getAddressString } from "../UI/PaymentMethod/utils";
import { useGetTicketClassifications } from "../../service/service_desk/getTicketClassifications";

interface AddTicketModelProps {
  show: boolean;
  onClose: () => void;
}

interface formValues {
  subject: string;
  priority: TicketPriority;
  incidentType: string;
  incidentSubType: string;
  description: string;
  attachments: AttachmentFile[];
  address: string;
  cc: string[];
  bcc: string[];
}

const AddTicketModel = ({ show, onClose }: AddTicketModelProps) => {
  if (!show) return null;

  // Initial default values without ticketClassifications dependency
  const getInitialDefaultValues = () => ({
    subject: "",
    priority: TicketPriority.Critical,
    incidentType: "",
    incidentSubType: "",
    description: "",
    attachments: [],
    address: "",
    cc: [],
    bcc: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: getInitialDefaultValues(),
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
      toast.success("Ticket created successfully.");
    }
  }, [createTicketError, isCreateTicketSuccess]);

  const subject = watch("subject");
  const selectedPriority = watch("priority");

  const incidentType = watch("incidentType");
  const incidentSubType = watch("incidentSubType");
  const files = watch("attachments");
  const cc = watch("cc");
  const bcc = watch("bcc");

  const { data: subscriberInfo } = useGetSubscriberInfo();

  const { data: ticketClassifications } = useGetTicketClassifications();

  const incidentCategories = useMemo(() => {
    return getIncidentCategories(ticketClassifications);
  }, [ticketClassifications]);

  const incidentSubCategories = useMemo(() => {
    return getIncidentSubCategories(ticketClassifications, incidentType);
  }, [ticketClassifications, incidentType]);

  const addressOptions = useMemo(() => {
    return subscriberInfo?.address?.map((address) => {
      return {
        addressId: address.id,
        address: getAddressString(address),
      };
    });
  }, [subscriberInfo?.address]);

  const handlePriorityChange = (value: TicketPriority) => {
    setValue("priority", value);
  };
  const handleIncidentTypeChange = (value: string) => {
    setValue("incidentType", value);

    if (ticketClassifications) {
      const selectedCategory = ticketClassifications.find(
        (classification: any) => classification.incidentType === value,
      );
      const firstSubCategory =
        selectedCategory?.incidentSubTypeList?.[0]?.incidentSubType;
      if (firstSubCategory) {
        setValue("incidentSubType", firstSubCategory);
      } else {
        setValue("incidentSubType", "");
      }
    }
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

  const handleAttachmentsChange = (files: AttachmentFile[]) => {
    setValue("attachments", files);
  };
  const onSubmit = (data: formValues) => {
    const classificationId = getClassificationId(
      ticketClassifications,
      data.incidentType,
      data.incidentSubType
    );

    const ticketData = {
      clientTicket: {
        subject: data.subject,
        description: data.description,
        priority: data.priority,
        classificationId: classificationId,
        userId: subscriberInfo.accountId,
        attachments: data.attachments,
        addressId: addressOptions?.find((addr) => addr.address === data.address)
          ?.addressId,
        emailInfo: {
          ccAddressList: data.cc,
          bccAddressList: data.bcc,
        },
      },
    };

    createTicket(ticketData);
  };
  useEffect(() => {
    if (addressOptions && addressOptions.length > 0) {
      setValue("address", addressOptions[0].address);
    }
  }, [addressOptions]);

  // Set default incident type and subtype when ticketClassifications loads
  useEffect(() => {
    if (
      ticketClassifications &&
      ticketClassifications.length > 0 &&
      incidentCategories.length > 0 &&
      (!incidentType || incidentType === "")
    ) {
      const firstAllowedCategory = incidentCategories[0];
      let firstSubCategory: string | undefined;

      if (firstAllowedCategory) {
        const selectedCategory = ticketClassifications.find(
          (classification: any) =>
            classification.incidentType === firstAllowedCategory,
        );
        firstSubCategory =
          selectedCategory?.incidentSubTypeList?.[0]?.incidentSubType;
      }

      if (firstAllowedCategory && (!incidentType || incidentType === "")) {
        setValue("incidentType", firstAllowedCategory);
      }
      if (firstSubCategory && (!incidentSubType || incidentSubType === "")) {
        setValue("incidentSubType", firstSubCategory);
      }
    }
  }, [ticketClassifications, incidentCategories, incidentType, incidentSubType, setValue]);
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
            <Typography weight="semibold" size="big">
              Submit Ticket
            </Typography>
            <Typography color="secondaryText">{subject}</Typography>
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
                  items={incidentCategories}
                  onChange={handleIncidentTypeChange}
                  width="100%"
                  error={errors.incidentType}
                />
                <Dropdown
                  label="Incident Subcategory"
                  withBackground={false}
                  value={incidentSubType}
                  items={incidentSubCategories}
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
                  items={addressOptions?.map((addr) => addr.address) || []}
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
              text={"Submit"}
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

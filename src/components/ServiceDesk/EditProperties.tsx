import { useForm } from "react-hook-form";
import { Box } from "../UI/Box";
import Model from "../UI/Model/Model";
import { TicketPriority } from "./types";
import { RadioSelect } from "../UI/RadioSelect/RadioSelect";
import { Typography } from "../UI/Typography";
import Dropdown from "../UI/Dropdown/Dropdown";
import {
  getErrorMessage,
  getIncidentCategories,
  getIncidentSubCategories,
  getClassificationId,
} from "./utils";
import { useGetTicketClassifications } from "../../service/service_desk/getTicketClassifications";
import { Button } from "../UI/Button";
import { useEditProperties } from "../../service/service_desk/EditProperties";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { TicketDetails } from "../../types/TicketDetailsInterface";
import { useGetSubscriberInfo } from "../../service/billing_center/getSubscriberInfo";

interface EditPropertiesProps {
  onClose: () => void;
  ticket: TicketDetails;
}

const EditProperties = ({ onClose, ticket }: EditPropertiesProps) => {
  const getPriorityFromString = (priorityString: string): TicketPriority => {
    switch (priorityString?.toLowerCase()) {
      case "low":
        return TicketPriority.Low;
      case "medium":
        return TicketPriority.Medium;
      case "high":
        return TicketPriority.High;
      case "critical":
        return TicketPriority.Critical;
      default:
        return TicketPriority.Low;
    }
  };

  const getDefaultValues = () => ({
    priority: getPriorityFromString(ticket?.priority || ""),
    incidentType: ticket?.incidentType,
    incidentSubType: ticket?.incidentSubType,
  });

  const { mutateAsync: editProperties, isPending: isEditPropertiesPending } =
    useEditProperties({ ticketId: ticket.ticketNumber });

  const { data: ticketClassifications } = useGetTicketClassifications();
  const { data: subscriberInfo } = useGetSubscriberInfo();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
  });
  const selectedPriority = watch("priority");
  const incidentType = watch("incidentType");
  const incidentSubType = watch("incidentSubType");

  const incidentCategories = useMemo(() => {
    return getIncidentCategories(ticketClassifications);
  }, [ticketClassifications]);

  const incidentSubCategories = useMemo(() => {
    return getIncidentSubCategories(ticketClassifications, incidentType);
  }, [ticketClassifications, incidentType]);

  // useEffect(() => {
  //   if (isEditPropertiesError) {
  //     toast.error(
  //       getErrorMessage(editPropertiesErrorMessage) ||
  //         "Something went wrong. Try again.",
  //     );
  //   }

  //   if (isEditPropertiesSuccess) {
  //     toast.success("Ticket updated successfully.");
  //   }
  // }, [isEditPropertiesError, isEditPropertiesSuccess]);

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
  }, [
    ticketClassifications,
    incidentCategories,
    incidentType,
    incidentSubType,
    setValue,
  ]);
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

  const onSubmit = async (data: any) => {
    console.log("Form Data on Submit:", data);

    const classificationId = getClassificationId(
      ticketClassifications,
      data.incidentType,
      data.incidentSubType,
    );

    const submissionData = {
      clientTicket: {
        priority: data.priority,
        classificationId: classificationId,
        userId: subscriberInfo?.accountId,
        emailInfo: {
          ccAddressList: [],
          bccAddressList: [],
        },
        ticketNumber: ticket.ticketNumber,
      },
    };
    try {
      await editProperties(submissionData);
      toast.success("Ticket updated successfully.");
      onClose();
    } catch (error) {
      console.error("Error updating ticket properties:", error);
      toast.error(getErrorMessage(error) || "Something went wrong. Try again.");
    }
  };

  return (
    <Model open={true} handleClose={onClose} width="800px">
      <Box display="flex" flexDirection="column">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box display="flex" flexDirection="column" gap="8px">
            <Typography weight="semibold" size="big">
              Edit Properties
            </Typography>
          </Box>

          <Box marginTop="16px">
            <Box display="flex" flexDirection="column" gap="20px">
              <Box display="flex" gap="32px" alignItems="center">
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
              text="Update"
              isLoading={isEditPropertiesPending}
              disabled={isEditPropertiesPending}
            />
          </Box>
        </form>
      </Box>
    </Model>
  );
};
export default EditProperties;

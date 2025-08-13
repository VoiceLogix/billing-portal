import { useForm } from "react-hook-form";
import { Box } from "../UI/Box";
import Model from "../UI/Model/Model";
import { TicketData, TicketPriority } from "./types";
import { RadioSelect } from "../UI/RadioSelect/RadioSelect";
import { Typography } from "../UI/Typography";
import Dropdown from "../UI/Dropdown/Dropdown";
import { getErrorMessage, incidentSubTypes, incidentTypes } from "./utils";
import { Button } from "../UI/Button";
import { useEditProperties } from "../../service/EditProperties";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface AddTicketModelProps {
  onClose: () => void;
  ticket?: TicketData;
}

const EdiitProperties = ({ onClose, ticket }: AddTicketModelProps) => {
  const getDefaultValues = () => ({
    priority: ticket?.priority || TicketPriority.Low,
    incidentType: incidentTypes[0],
    incidentSubType: incidentSubTypes[0],
  });

  const {
    mutate: editProperties,
    isPending: isEditPropertiesPending,
    isError: isEditPropertiesError,
    isSuccess: isEditPropertiesSuccess,
    error: editPropertiesErrorMessage,
  } = useEditProperties({ onClose });

  useEffect(() => {
    if (isEditPropertiesError) {
      toast.error(
        getErrorMessage(editPropertiesErrorMessage) ||
          "Something went wrong. Try again.",
      );
    }

    if (isEditPropertiesSuccess) {
      toast.success("Ticket updated successfully.");
    }
  }, [isEditPropertiesError, isEditPropertiesSuccess]);

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
  const handlePriorityChange = (value: TicketPriority) => {
    setValue("priority", value);
  };
  const handleIncidentTypeChange = (value: string) => {
    setValue("incidentType", value);
  };
  const handleIncidentSubTypeChange = (value: string) => {
    setValue("incidentSubType", value);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    editProperties(data);
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
export default EdiitProperties;

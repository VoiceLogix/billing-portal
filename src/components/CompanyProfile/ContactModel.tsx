import { useForm } from "react-hook-form";
import { Box } from "../UI/Box";
import Model from "../UI/Model/Model";
import { Typography } from "../UI/Typography";
import TextInput from "../UI/TextInput.tsx/TextInput";
import { RadioSelect } from "../UI/RadioSelect/RadioSelect";
import { Button } from "../UI/Button";
import { ClientCustomerContact } from "../../types/ProfileDetailsInterface";
import { useEffect } from "react";
import { Badge } from "../UI/Badge/Badge";
import {
  useDeleteContact,
  useUpdateContact,
} from "../../service/updateContact";
import { getContactType } from "../UI/ContactsCard/utils";
import Dropdown from "../UI/Dropdown/Dropdown";
import { contactTypes, formatPhoneNumber, LanguageTypes } from "./utils";

interface ContactFormData {
  firstName: string;
  lastName: string;
  emailId: string;
  type: string;
  businessPhone: string;
  cellContactNumber: string;
  alternateContactNumber: string;
  locale: string;
  designation: string;
  primaryContact: boolean;
  billingContact: boolean;
}

export const ContactModel = ({
  openContactModel,
  handleClose,
  selectedContact,
}: {
  openContactModel: boolean;
  handleClose: () => void;
  selectedContact: ClientCustomerContact | null;
}) => {
  const isUpdate = !!selectedContact?.id;
  const { mutate: contactMutation, isPending: isContactMutationPending } =
    useUpdateContact({
      onClose: handleClose,
      isUpdate,
    });

  const {
    mutate: deleteContactMutation,
    isPending: isDeleteContactMutationPending,
  } = useDeleteContact({
    onClose: handleClose,
  });

  const getDefaultValues = () => ({
    firstName: selectedContact?.firstName || "",
    lastName: selectedContact?.lastName || "",
    emailId: selectedContact?.emailId || "",
    type: "",
    businessPhone:
      formatPhoneNumber(selectedContact?.contactNumber || "") || "",
    cellContactNumber:
      formatPhoneNumber(selectedContact?.cellContactNumber || "") || "",
    alternateContactNumber:
      formatPhoneNumber(selectedContact?.alternateContactNumber || "") || "",
    locale: "",
    designation: selectedContact?.designation || "",
    primaryContact: selectedContact?.primaryContact || false,
    billingContact: selectedContact?.billingContact || false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (data: ContactFormData) => {
    const formData = {
      clientCustomerContactDTO: {
        ...selectedContact,
        type: contactTypes.find((type) => type.label === data.type)?.value,
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
        contactNumber: data.businessPhone,
        cellContactNumber: data.cellContactNumber,
        alternateContactNumber: data.alternateContactNumber,
        designation: data.designation,
        userName: selectedContact?.userName,
        userRole: selectedContact?.userRole,
        locale: "en_US",
        billingContact: data.billingContact,
        primaryContact: data.primaryContact,
        clientCommunicationDTOList: [
          {
            contactId: null,
            id: null,
            value: data.emailId,
            type: "EMAIL",
          },
          {
            contactId: null,
            id: null,
            value: data.businessPhone,
            type: "PHONE",
          },
          {
            contactId: null,
            id: null,
            value: data.cellContactNumber,
            type: "CPHONE",
          },
          {
            contactId: null,
            id: null,
            value: data.alternateContactNumber,
            type: "APHONE",
          },
        ],
        groupsType: "1",
        lstContactAttributes: selectedContact?.lstContactAttributes || [],
      },
    };
    contactMutation(formData);
  };

  const isPrimaryContact = watch("primaryContact");
  const isBillingContact = watch("billingContact");

  const handlePrimaryContactChange = () => {
    setValue("primaryContact", !isPrimaryContact, {
      shouldDirty: true,
    });
  };

  const handleBillingContactChange = () => {
    setValue("billingContact", !isBillingContact, {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    const contactType = getContactType(selectedContact?.type || 0);
    setValue("type", contactType);
    const locale = LanguageTypes.find(
      (type) => type.value === selectedContact?.locale,
    )?.label;
    setValue("locale", locale || "");
  }, [selectedContact, setValue]);

  const handleTypeChange = (item: string) => {
    setValue("type", item);
  };

  const handleLocaleChange = (item: string) => {
    setValue("locale", item);
  };

  const locale = watch("locale");
  const type = watch("type");

  return (
    <Model open={openContactModel} handleClose={handleClose} width="720px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography size="big" weight="semibold">
          {selectedContact ? "Edit Contact" : "Add Contact"}
        </Typography>
        <Box display="flex" gap="10px">
          {isPrimaryContact && (
            <Badge status="Primary Contact" color="primary" />
          )}
          {isBillingContact && (
            <Badge status="Default for Service" color="primary" />
          )}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexWrap="wrap" gap="16px" marginTop="20px">
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                label="First Name*"
                name="firstName"
                register={register}
                rules={{ required: "First Name is required" }}
                placeholder="First Name"
                error={errors.firstName}
              />
              <TextInput
                label="Last Name*"
                name="lastName"
                register={register}
                rules={{ required: "Last Name is required" }}
                placeholder="Last Name"
                error={errors.lastName}
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <Dropdown
                label="Contact Assignment*"
                value={type.toString()}
                items={contactTypes.map((type) => type.label)}
                onChange={handleTypeChange}
                width="100%"
                error={errors.type}
              />
              <TextInput
                label="Email*"
                name="emailId"
                register={register}
                rules={{ required: "Email ID is required" }}
                placeholder="Email ID"
                error={errors.emailId}
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                name="businessPhone"
                register={register}
                label="Business Phone (Optional)"
                placeholder="Business Phone"
                error={errors.businessPhone}
                value={watch("businessPhone")}
                onChange={(e) =>
                  setValue("businessPhone", formatPhoneNumber(e.target.value))
                }
              />

              <TextInput
                name="alternateContactNumber"
                register={register}
                label="Alternate Phone (Optional)"
                placeholder="Alternate Phone"
                error={errors.alternateContactNumber}
                value={watch("alternateContactNumber")}
                onChange={(e) =>
                  setValue(
                    "alternateContactNumber",
                    formatPhoneNumber(e.target.value),
                  )
                }
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                name="cellContactNumber"
                register={register}
                label="Cell Phone (Optional)"
                placeholder="Cell Phone"
                error={errors.cellContactNumber}
                value={watch("cellContactNumber")}
                onChange={(e) =>
                  setValue(
                    "cellContactNumber",
                    formatPhoneNumber(e.target.value),
                  )
                }
              />

              <Dropdown
                label="Language (Optional)"
                value={locale}
                items={LanguageTypes.map((type) => type.label)}
                onChange={handleLocaleChange}
                width="100%"
                error={errors.locale}
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                label="Designation (Optional)"
                name="designation"
                register={register}
                placeholder="Designation"
                error={errors.designation}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" gap="24px" marginTop="30px">
            <RadioSelect
              label="Default for Billing"
              checked={!!isPrimaryContact}
              onChange={handlePrimaryContactChange}
            />
            <RadioSelect
              label="Default for Service"
              checked={!!isBillingContact}
              onChange={handleBillingContactChange}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={selectedContact ? "space-between" : "flex-end"}
            marginTop="32px"
          >
            {selectedContact && (
              <Button
                bgColor="redAccent"
                color="errorText"
                type="button"
                onClick={() => {
                  deleteContactMutation({
                    contactId: selectedContact?.id,
                  });
                }}
                text="Delete Contact"
                disabled={isPrimaryContact || isBillingContact}
                isLoading={isDeleteContactMutationPending}
              />
            )}
            <Button
              bgColor="blueAccent"
              type="submit"
              text={selectedContact ? "Update Contact" : "Add Contact"}
              disabled={!isDirty || isContactMutationPending}
              isLoading={isContactMutationPending}
            />
          </Box>
        </form>
      </Box>
    </Model>
  );
};

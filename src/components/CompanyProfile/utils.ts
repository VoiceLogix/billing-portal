export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 0) return "";

  if (cleaned.length <= 3) return `+${cleaned}`;
  return `+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
};

export const contactTypes = [
  { label: "Billing", value: 0 },
  { label: "Other", value: 1 },
  { label: "System", value: 2 },
];

export const LanguageTypes = [{ label: "US English", value: "en_US" }];

export const getAddressNotification = (
  isUpdate: boolean,
  deleteAddressMutationError: unknown | undefined,
  isUpdateAddressMutationSuccess: boolean,
  isUpdateAddressMutationError: boolean,
  isDeleteAddressMutationSuccess: boolean,
  isDeleteAddressMutationError: boolean,
) => {
  const showNotification =
    isUpdateAddressMutationSuccess ||
    isUpdateAddressMutationError ||
    isDeleteAddressMutationSuccess ||
    isDeleteAddressMutationError;

  let notificationMessage = "";

  if (isUpdate) {
    if (isUpdateAddressMutationSuccess) {
      notificationMessage = "Address updated successfully";
    } else if (isUpdateAddressMutationError) {
      notificationMessage = "Error updating address, please try again";
    }
  } else {
    if (isUpdateAddressMutationSuccess) {
      notificationMessage = "Address added successfully";
    } else if (isUpdateAddressMutationError) {
      notificationMessage = "Error adding address, please try again";
    }
  }

  if (isDeleteAddressMutationSuccess) {
    notificationMessage = "Address deleted successfully";
  } else if (isDeleteAddressMutationError) {
    notificationMessage =
      (deleteAddressMutationError as { message?: string })?.message ||
      "Error deleting address, please try again";
  }

  const notificationType: "error" | "success" =
    isUpdateAddressMutationError || isDeleteAddressMutationError
      ? "error"
      : "success";

  return {
    notificationType,
    notificationMessage,
    showNotification,
  };
};

export const getContactNotification = (
  isUpdate: boolean,
  isUpdateContactMutationSuccess: boolean,
  isUpdateContactMutationError: boolean,
  isDeleteContactMutationSuccess: boolean,
  isDeleteContactMutationError: boolean,
) => {
  const showNotification =
    isUpdateContactMutationSuccess ||
    isUpdateContactMutationError ||
    isDeleteContactMutationSuccess ||
    isDeleteContactMutationError;

  let notificationMessage = "";

  if (isUpdate) {
    if (isUpdateContactMutationSuccess) {
      notificationMessage = "Contact updated successfully";
    } else {
      notificationMessage = "Error updating contact, please try again";
    }
  } else {
    if (isUpdateContactMutationSuccess) {
      notificationMessage = "Contact added successfully";
    } else {
      notificationMessage = "Error adding contact, please try again";
    }
  }

  if (isDeleteContactMutationSuccess) {
    notificationMessage = "Contact deleted successfully";
  } else if (isDeleteContactMutationError) {
    notificationMessage = "Error deleting contact, please try again";
  }

  const notificationType: "error" | "success" =
    isUpdateContactMutationError || isDeleteContactMutationError
      ? "error"
      : "success";

  return {
    notificationType,
    notificationMessage,
    showNotification,
  };
};

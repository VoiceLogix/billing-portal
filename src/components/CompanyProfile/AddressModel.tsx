import { useForm } from "react-hook-form";
import { Box } from "../UI/Box";
import Model from "../UI/Model/Model";
import { Typography } from "../UI/Typography";
import TextInput from "../UI/TextInput.tsx/TextInput";
import Dropdown from "../UI/Dropdown/Dropdown";
import { RadioSelect } from "../UI/RadioSelect/RadioSelect";
import { Button } from "../UI/Button";
import { Address, ClientCountryDTO } from "../../types/ProfileDetailsInterface";
import { useMemo, useState, useEffect } from "react";
import { useGetStateInfo } from "../../service/getStateInfo";
import {
  useDeleteAddress,
  useUpdateAddress,
} from "../../service/updateAddress";
import { Notification } from "../UI/Notification/Notification";
import { getAddressNotification } from "./utils";

interface AddressFormData {
  zip: string;
  zipCodeExtension: string;
  country: string;
  state: string;
  city: string;
  county: string;
  addLine1: string;
  addLine2: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

export const AddressModel = ({
  openAddressModel,
  handleClose,
  selectedAddress,
  clientCountryDTOList,
}: {
  openAddressModel: boolean;
  handleClose: () => void;
  selectedAddress: Address | null;
  clientCountryDTOList: ClientCountryDTO[];
}) => {
  const isUpdate = !!selectedAddress?.id;
  const {
    mutate: updateAddressMutation,
    isPending: isUpdateAddressMutationPending,
    isSuccess: isUpdateAddressMutationSuccess,
    isError: isUpdateAddressMutationError,
  } = useUpdateAddress(handleClose);
  const {
    mutate: deleteAddressMutation,
    isPending: isDeleteAddressMutationPending,
    isSuccess: isDeleteAddressMutationSuccess,
    isError: isDeleteAddressMutationError,
    error: deleteAddressMutationError,
  } = useDeleteAddress(handleClose);

  const countries = useMemo(() => {
    return clientCountryDTOList?.map((c) => c.countryName) || [];
  }, [clientCountryDTOList]);

  const getCountryId = (country: string) => {
    return clientCountryDTOList?.find((c) => c.countryName === country)?.id;
  };

  const getStateName = (state: string) => {
    return stateInfo?.stateList?.find((s) => s.code === state)?.name;
  };

  const getStateCode = (state: string) => {
    return stateInfo?.stateList?.find((s) => s.name === state)?.code;
  };

  const [country, setCountry] = useState(
    selectedAddress?.country || "UNITED STATES",
  );
  const [state, setState] = useState(selectedAddress?.state || "");

  const { data: stateInfo } = useGetStateInfo(getCountryId(country));

  const states = useMemo(() => {
    return stateInfo?.stateList?.map((s) => s.name) || [];
  }, [stateInfo]);

  const getDefaultValues = () => ({
    zip: selectedAddress?.zip || "",
    zipCodeExtension: selectedAddress?.zipCodeExtension || "",
    country: selectedAddress?.country,
    state: "",
    city: selectedAddress?.city || "",
    county: selectedAddress?.county || "",
    addLine1: selectedAddress?.addLine1 || "",
    addLine2: selectedAddress?.addLine2 || "",
    isDefaultBilling: selectedAddress?.isDefaultBilling || false,
    isDefaultShipping: selectedAddress?.isDefaultShipping || false,
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

  const isDefaultBilling = watch("isDefaultBilling");
  const isDefaultShipping = watch("isDefaultShipping");

  useEffect(() => {
    setValue("country", country);
  }, [country, setValue]);

  useEffect(() => {
    setValue("state", state);
  }, [state, setValue]);

  useEffect(() => {
    register("state", {
      required: "State/Province is required",
    });
  }, [register]);

  useEffect(() => {
    if (stateInfo && selectedAddress?.state) {
      const stateName = getStateName(selectedAddress?.state);
      setState(stateName || "");
    }
  }, [stateInfo, selectedAddress?.state]);

  const handleCountryChange = (item: string) => {
    setCountry(item);
    setState("");
  };

  const handleStateChange = (item: string) => {
    setState(item);
  };
  const handleIsDefaultBillingChange = () => {
    setValue("isDefaultBilling", !isDefaultBilling, {
      shouldDirty: true,
    });
  };
  const handleIsDefaultShippingChange = () => {
    setValue("isDefaultShipping", !isDefaultShipping, {
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: AddressFormData) => {
    const formData = {
      lstAddresses: [
        {
          ...selectedAddress,
          ...data,
          state: getStateCode(data.state),
        },
      ],
    };

    updateAddressMutation(formData);
  };

  const handleDeleteAddress = async () => {
    deleteAddressMutation(selectedAddress?.id);
  };

  const { notificationType, notificationMessage, showNotification } =
    getAddressNotification(
      isUpdate,
      deleteAddressMutationError,
      isUpdateAddressMutationSuccess,
      isUpdateAddressMutationError,
      isDeleteAddressMutationSuccess,
      isDeleteAddressMutationError,
    );

  return (
    <Model open={openAddressModel} handleClose={handleClose} width="720px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography size="big" weight="semibold">
          {selectedAddress ? "Edit Address" : "Add Address"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexWrap="wrap" gap="16px" marginTop="20px">
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                label="Zip/Postal Code*"
                name="zip"
                register={register}
                rules={{
                  required: "Zip/Postal Code is required",
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: "Invalid zip code, must be 5 digits",
                  },
                }}
                placeholder="Zip/Postal Code"
                error={errors.zip}
              />
              <TextInput
                label="Zip/Postal Code Extension (Optional)"
                name="zipCodeExtension"
                register={register}
                placeholder="Extension"
                error={errors.zipCodeExtension}
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <Dropdown
                label="Country*"
                value={country}
                items={countries}
                onChange={handleCountryChange}
                width="100%"
                error={errors.country}
              />
              <Dropdown
                label="State/Province*"
                value={state}
                items={states}
                onChange={handleStateChange}
                width="100%"
                error={errors.state}
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                label="City*"
                name="city"
                register={register}
                rules={{
                  required: "City is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Invalid city name, no special symbols",
                  },
                }}
                placeholder="City"
                error={errors.city}
              />
              <TextInput
                label="County (Optional)"
                name="county"
                register={register}
                placeholder="County"
                error={errors.county}
              />
            </Box>
            <Box display="flex" gap="8px" width="100%">
              <TextInput
                label="Address Line 1*"
                name="addLine1"
                register={register}
                rules={{ required: "Address Line 1 is required" }}
                placeholder="Address Line 1"
                error={errors.addLine1}
              />
              <TextInput
                label="Address Line 2 (Optional)"
                name="addLine2"
                register={register}
                placeholder="Address Line 2"
                error={errors.addLine2}
              />
            </Box>
            {selectedAddress?.id && (
              <Box display="flex" gap="8px" width="50%">
                <TextInput
                  label="Site ID"
                  name="siteId"
                  placeholder={selectedAddress?.id || "Default"}
                  disabled={true}
                />
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="24px"
            marginTop="30px"
            marginBottom="10px"
          >
            <RadioSelect
              label="Default for Billing"
              checked={!!isDefaultBilling}
              onChange={handleIsDefaultBillingChange}
            />
            <RadioSelect
              label="Default for Service"
              checked={!!isDefaultShipping}
              onChange={handleIsDefaultShippingChange}
            />
          </Box>
          <Notification
            type={notificationType}
            message={notificationMessage}
            showNotification={showNotification}
          />
          <Box
            display="flex"
            flexDirection="row"
            marginTop="12px"
            justifyContent={selectedAddress ? "space-between" : "flex-end"}
          >
            {selectedAddress && (
              <Button
                type="button"
                bgColor="redAccent"
                color="errorText"
                isLoading={isDeleteAddressMutationPending}
                onClick={() => {
                  handleDeleteAddress();
                }}
                text="Delete Address"
                disabled={isDefaultBilling || isDefaultShipping}
              />
            )}
            <Button
              type="submit"
              bgColor="blueAccent"
              text={selectedAddress ? "Update Address" : "Add Address"}
              disabled={!isDirty}
              isLoading={isUpdateAddressMutationPending}
            />
          </Box>
        </form>
      </Box>
    </Model>
  );
};

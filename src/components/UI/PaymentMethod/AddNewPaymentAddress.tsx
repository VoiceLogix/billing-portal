import { useEffect, useMemo, useState } from "react";
import { Box } from "../Box";
import Dropdown from "../Dropdown/Dropdown";
import TextInput from "../TextInput.tsx/TextInput";
import { useGetStateInfo } from "../../../service/billing_center/getStateInfo";
import { Typography } from "../Typography";
import { useGetProfileDetails } from "../../../service/billing_center/getProfileDetails";
import { useFormContext } from "react-hook-form";
import { CardFormFormValues, ECheckFormValues } from "./utils";

export const AddNewPaymentAddress = ({}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CardFormFormValues | ECheckFormValues>();
  const { data: profileDetails } = useGetProfileDetails();
  const clientCountryDTOList = profileDetails?.clientCountryDTOList;
  const [country, setCountry] = useState("UNITED STATES");
  const [state, setState] = useState("");
  useEffect(() => {
    register("state", {
      required: "State/Province is required",
    });
  }, [register]);
  useEffect(() => {
    setValue("country", country);
  }, [country, setValue]);

  useEffect(() => {
    setValue("state", state);
  }, [state, setValue]);

  const countries = useMemo(() => {
    return clientCountryDTOList?.map((c) => c.countryName) || [];
  }, [clientCountryDTOList]);

  const getCountryId = (country: string) => {
    return (
      clientCountryDTOList
        ?.find((c) => c.countryName === country)
        ?.id.toString() || "1"
    );
  };

  const { data: stateInfo } = useGetStateInfo(getCountryId(country));

  const states = useMemo(() => {
    return stateInfo?.stateList?.map((s) => s.name) || [];
  }, [stateInfo]);

  const handleCountryChange = (item: string) => {
    setCountry(item);
    setState("");
  };

  const handleStateChange = (item: string) => {
    setState(item);
  };
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      height="310px"
      marginTop="-52px"
      paddingRight="12px"
      style={{
        position: "absolute",
      }}
    >
      <Typography weight="semibold">Add New Address</Typography>
      <Box display="flex" gap="8px" width="100%">
        <Dropdown
          label="Country*"
          value={country}
          items={countries}
          onChange={handleCountryChange}
          error={errors.country}
        />
        <Dropdown
          label="State/Province*"
          value={state}
          items={states}
          onChange={handleStateChange}
          error={errors.state}
        />
      </Box>
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
    </Box>
  );
};

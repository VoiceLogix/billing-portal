import { useForm, Controller, FormProvider } from "react-hook-form";
import styles from "./form.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { PayInfoItem } from "../../../types/SubscriberInfoInterface";
import { useGetSubscriberInfo } from "../../../service/billing_center/getSubscriberInfo";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import {
  ADDRESS_NOT_LISTED,
  ECheckFormValues,
  getAddressString,
  getCardNotification,
} from "./utils";
import {
  useCreatePaymentProfile,
  useDeletePaymentProfile,
} from "../../../service/billing_center/createPaymentProfile";
import { Box } from "../Box";
import { AddNewPaymentAddress } from "./AddNewPaymentAddress";
import ToggleSwitch from "../Toggle/Toggle";
import { Notification } from "../Notification/Notification";
import { Button } from "../Button";

const ACCOUNT_TYPES = ["Checking", "Savings"] as const;

const formatRoutingNumber = (value: string) => {
  const onlyDigits = value.replace(/\D/g, "").slice(0, 9);
  const parts: string[] = [];
  for (let i = 0; i < onlyDigits.length; i += 3) {
    parts.push(onlyDigits.substring(i, i + 3));
  }
  return parts.join(" ");
};

const ECheckForm = ({
  payInfo,
  handleClose,
  isDefault,
}: {
  payInfo?: PayInfoItem;
  handleClose?: () => void;
  isDefault?: boolean;
}) => {
  const { data: subscriberInfo } = useGetSubscriberInfo();

  const defaultAddress = useMemo(
    () => subscriberInfo?.address?.find((addr) => addr.defaultBilling === true),
    [subscriberInfo?.address],
  );

  const addressOptions = useMemo(() => {
    const addresses =
      subscriberInfo?.address?.map((address) => getAddressString(address)) ||
      [];
    return [...addresses, ADDRESS_NOT_LISTED];
  }, [subscriberInfo?.address]);

  const [useDefaultBilling, setUseDefaultBilling] = useState(true);
  const [selectedAddressText, setSelectedAddressText] = useState(
    addressOptions[0],
  );

  const echeck = payInfo?.echeckInfo;
  const isDefaultBilling = payInfo?.isDefault || false;

  const defaultValues: ECheckFormValues = {
    routingNumber: echeck?.routingNumber || "",
    bankName: echeck?.bankName || "",
    accountNumber: echeck?.bankAccountNumber || "",
    accountHolderName: echeck?.accountHolderName || "",
    accountType: echeck?.bankAccountType || "Checking",
  };

  const methods = useForm<ECheckFormValues>({
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const {
    mutate: createPaymentProfile,
    isPending: createPaymentProfilePending,
    error: createPaymentProfileError,
    isSuccess: createPaymentProfileSuccess,
  } = useCreatePaymentProfile(handleClose);

  const {
    mutate: deletePaymentProfile,
    isPending: deletePaymentProfilePending,
    error: deletePaymentProfileError,
    isSuccess: deletePaymentProfileSuccess,
  } = useDeletePaymentProfile(handleClose);

  const onSubmit = (data: ECheckFormValues) => {
    const rawRouting = data.routingNumber.replace(/\D/g, "");
    const formatteECheckInfo = {
      accountHolderName: data.accountHolderName,
      bankAccountNumber: data.accountNumber.replace(/\D/g, ""),
      bankAccountType: data.accountType,
      bankName: data.bankName,
      routingNumber: rawRouting,
    };
    let billingAddress;
    if (useDefaultBilling) {
      billingAddress = payInfo?.profileAddress || defaultAddress;
    } else if (selectedAddressText !== ADDRESS_NOT_LISTED) {
      billingAddress = subscriberInfo?.address.find(
        (addr) => getAddressString(addr) === selectedAddressText,
      );
    } else {
      billingAddress = {
        addLine1: data.addLine1,
        addLine2: data.addLine2,
        country: data.country,
        city: data.city,
        state: data.state,
        zip: data.zip,
      };
    }
    const payload = {
      echeckInfo: formatteECheckInfo,
      address: billingAddress,
      type: "ECHECK",
      accountNumber: subscriberInfo?.accountNumber,
    };

    createPaymentProfile(payload);
  };

  const handleDeleteMethod = useCallback(() => {
    if (payInfo?.paymentProfileId && subscriberInfo?.accountNumber) {
      deletePaymentProfile({
        profileId: payInfo.paymentProfileId,
        subscriberId: subscriberInfo.accountNumber,
      });
    }
  }, [
    deletePaymentProfile,
    payInfo?.paymentProfileId,
    subscriberInfo?.accountNumber,
  ]);

  const { notificationType, notificationMessage, showNotification } =
    getCardNotification(
      createPaymentProfileError,
      createPaymentProfileSuccess,
      createPaymentProfilePending,
      deletePaymentProfileError,
      deletePaymentProfilePending,
      deletePaymentProfileSuccess,
    );
  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Box display="flex" gap="16px">
            <Box
              display="flex"
              gap="20px"
              flexDirection="column"
              width={`${
                selectedAddressText === ADDRESS_NOT_LISTED && !useDefaultBilling
                  ? "470px"
                  : "100%"
              }`}
            >
              <div className={styles.grid2Cols}>
                <div>
                  <label className={styles.label}>Routing Number*</label>
                  <Controller
                    name="routingNumber"
                    disabled={!!payInfo}
                    control={control}
                    rules={{
                      required: "Routing number is required",
                      validate: (val) => {
                        const raw = val.replace(/\D/g, "");
                        return (
                          raw.length === 9 || "Routing number must be 9 digits"
                        );
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="000 000 000"
                        maxLength={11} // 9 digits + 2 spaces
                        className={styles.input}
                        autoComplete="routing-number"
                        onChange={(e) =>
                          field.onChange(formatRoutingNumber(e.target.value))
                        }
                        value={field.value}
                      />
                    )}
                  />
                  {errors.routingNumber && (
                    <p className={styles.error}>
                      {errors.routingNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={styles.label}>Bank Name*</label>
                  <input
                    {...register("bankName", {
                      required: "Bank name is required",
                    })}
                    disabled={!!payInfo}
                    type="text"
                    placeholder="Bank"
                    className={styles.input}
                    autoComplete="organization"
                  />
                  {errors.bankName && (
                    <p className={styles.error}>{errors.bankName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={styles.label}>Account Number*</label>
                <Controller
                  name="accountNumber"
                  control={control}
                  disabled={!!payInfo}
                  rules={{
                    required: "Account number is required",
                    validate: (val) => {
                      const raw = val.replace(/\D/g, "");
                      return (
                        raw.length >= 4 ||
                        "Account number must be at least 4 digits"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="0000000000"
                      className={styles.input}
                      autoComplete="off"
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        field.onChange(onlyDigits);
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors.accountNumber && (
                  <p className={styles.error}>{errors.accountNumber.message}</p>
                )}
              </div>

              <div className={styles.grid2Cols}>
                <div>
                  <label className={styles.label}>Name on Bank Account*</label>
                  <input
                    {...register("accountHolderName", {
                      required: "Account holder name is required",
                    })}
                    disabled={!!payInfo}
                    type="text"
                    placeholder="John Doe"
                    className={styles.input}
                    autoComplete="name"
                  />
                  {errors.accountHolderName && (
                    <p className={styles.error}>
                      {errors.accountHolderName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={styles.label}>Account Type*</label>
                  <Controller
                    name="accountType"
                    control={control}
                    disabled={!!payInfo}
                    rules={{ required: "Account type is required" }}
                    render={({ field }) => {
                      const dropdownItems = ACCOUNT_TYPES.map((type) => type);

                      return (
                        <Dropdown
                          value={field.value}
                          items={dropdownItems}
                          onChange={() => {}}
                          disabled={!!payInfo}
                        />
                      );
                    }}
                  />
                  {errors.accountType && (
                    <p className={styles.error}>{errors.accountType.message}</p>
                  )}
                </div>
              </div>
              {!payInfo && (
                <Box>
                  <ToggleSwitch
                    label="Use Default Billing Address"
                    checked={useDefaultBilling}
                    onChange={() => setUseDefaultBilling((prev) => !prev)}
                  />
                </Box>
              )}
              {!useDefaultBilling && (
                <Box>
                  <Dropdown
                    label="Select Billing Address*"
                    onChange={(item: string) => setSelectedAddressText(item)}
                    items={addressOptions}
                    value={selectedAddressText}
                  />
                </Box>
              )}
            </Box>

            {selectedAddressText === ADDRESS_NOT_LISTED &&
              !useDefaultBilling && (
                <Box width="470px">
                  <AddNewPaymentAddress />
                </Box>
              )}
          </Box>
          {showNotification && (
            <Notification
              type={notificationType}
              message={notificationMessage}
              showNotification={showNotification}
            />
          )}
          <Box
            display="flex"
            flexDirection="row"
            marginTop="10px"
            justifyContent={payInfo ? "space-between" : "flex-end"}
          >
            {payInfo && (
              <Button
                type="button"
                bgColor="redAccent"
                color="errorText"
                isLoading={deletePaymentProfilePending}
                onClick={() => {
                  handleDeleteMethod();
                }}
                text="Delete Method"
                disabled={
                  isDefaultBilling || isDefault || deletePaymentProfilePending
                }
              />
            )}
            {!payInfo && (
              <Button
                type="submit"
                bgColor="blueAccent"
                height="20px"
                disabled={createPaymentProfilePending}
                isLoading={createPaymentProfilePending}
              >
                Save Method
              </Button>
            )}
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default ECheckForm;

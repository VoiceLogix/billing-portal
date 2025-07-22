import { useForm, Controller, FormProvider } from "react-hook-form";
import { useMemo, useCallback, useEffect, useState } from "react";
import styles from "./form.module.css";

import {
  useCreatePaymentProfile,
  useDeletePaymentProfile,
} from "../../../service/createPaymentProfile";
import { useGetSubscriberInfo } from "../../../service/getSubscriberInfo";

import { AddNewPaymentAddress } from "./AddNewPaymentAddress";
import TextInput from "../TextInput.tsx/TextInput";
import { Notification } from "../Notification/Notification";
import { Button } from "../Button";
import { Box } from "../Box";
import Toggle from "../Toggle/Toggle";
import Dropdown from "../Dropdown/Dropdown";
import { CardTypeSVG, PaymentCardType } from "../../SVG/CardTypeSVG";

import { PayInfoItem } from "../../../types/SubscriberInfoInterface";
import {
  ADDRESS_NOT_LISTED,
  CARD_TYPES,
  CardFormFormValues,
  cardValidationRules,
  convertMMYYtoYYYYMM,
  formatCardNumber,
  formatExpiryDate,
  formatExpiryInput,
  getAddressString,
  getCardNotification,
} from "./utils";

const CardForm = ({
  payInfo,
  handleClose,
}: {
  payInfo?: PayInfoItem;
  handleClose: () => void;
}) => {
  const { data: subscriberInfo } = useGetSubscriberInfo();

  const defaultAddress = useMemo(
    () => subscriberInfo?.address.find((addr) => addr.defaultBilling === true),
    [subscriberInfo?.address],
  );

  const addressOptions = useMemo(() => {
    const addresses =
      subscriberInfo?.address.map((address) => getAddressString(address)) || [];
    return [...addresses, ADDRESS_NOT_LISTED];
  }, [subscriberInfo?.address]);

  const [useDefaultBilling, setUseDefaultBilling] = useState(true);
  const [selectedAddressText, setSelectedAddressText] = useState(
    addressOptions[0],
  );

  const card = payInfo?.creditCardInfo;
  const isDefaultBilling = payInfo?.isDefault || false;

  const methods = useForm<CardFormFormValues>({
    defaultValues: {
      firstName: card?.firstName || "",
      lastName: card?.lastName || "",
      cardType: (card?.cardType.toLowerCase() as PaymentCardType) || "visa",
      cardNumber: card?.cardNumber || "",
      expiryDate:
        formatExpiryDate(card?.cardExpiryMonth, card?.cardExpiryYear) || "",
      cvv: "***",
      addLine1: "",
      addLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = methods;

  const selectedCardType = watch("cardType");
  const selectedRules = cardValidationRules[selectedCardType];

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

  const onSubmit = useCallback(
    (data: CardFormFormValues) => {
      const formattedCardData = {
        ...data,
        cardNumber: data.cardNumber.replace(/\s/g, ""),
        expiryDate: convertMMYYtoYYYYMM(data.expiryDate),
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
        card: formattedCardData,
        address: billingAddress,
        type: "CC",
        accountNumber: subscriberInfo?.accountNumber,
      };

      createPaymentProfile(payload);
    },
    [
      createPaymentProfile,
      defaultAddress,
      payInfo?.profileAddress,
      selectedAddressText,
      subscriberInfo?.accountNumber,
      subscriberInfo?.address,
      useDefaultBilling,
    ],
  );

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
          <Box display="flex" gap="20px">
            <Box display="flex" gap="20px" flexDirection="column">
              <div className={styles.grid2Cols}>
                <TextInput
                  label="First Name*"
                  name="firstName"
                  register={register}
                  rules={{ required: "First name is required" }}
                  placeholder="John"
                  error={errors.firstName}
                  disabled={!!payInfo}
                />

                <TextInput
                  label="Last Name*"
                  name="lastName"
                  register={register}
                  rules={{ required: "Last name is required" }}
                  placeholder="Doe"
                  error={errors.lastName}
                  disabled={!!payInfo}
                />
              </div>
              <div>
                <label className={styles.label}>Card Type</label>
                <div className={styles.cardOptions}>
                  <Controller
                    name="cardType"
                    control={control}
                    disabled={!!payInfo}
                    render={({ field }) => (
                      <>
                        {CARD_TYPES.map((type) => (
                          <label
                            key={type}
                            className={`
                        ${styles.cardOption} 
                        ${field.value === type ? styles.selectedCard : ""}`}
                          >
                            <input
                              type="radio"
                              value={type}
                              checked={field.value === type}
                              disabled={!!payInfo}
                              onChange={field.onChange}
                            />
                            <CardTypeSVG type={type} />
                          </label>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className={styles.grid3Cols}>
                <div>
                  <label className={styles.label}>Card Number*</label>
                  <Controller
                    name="cardNumber"
                    control={control}
                    disabled={!!payInfo}
                    rules={{
                      required: "Card number is required",
                      validate: (val) => {
                        const raw = val.replace(/\D/g, "");
                        return (
                          selectedRules.re.test(raw) ||
                          `Invalid ${selectedCardType.toUpperCase()} number (e.g. ${
                            selectedRules.example
                          })`
                        );
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        maxLength={selectedRules?.maxLength + 3}
                        className={styles.input}
                        autoComplete="cc-number"
                        onChange={(e) =>
                          field.onChange(formatCardNumber(e.target.value))
                        }
                        value={field.value}
                      />
                    )}
                  />
                  {errors.cardNumber && (
                    <p className={styles.error}>{errors.cardNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className={styles.label}>Expiry Date*</label>
                  <Controller
                    name="expiryDate"
                    control={control}
                    disabled={!!payInfo}
                    rules={{
                      required: "Expiry date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Invalid format (MM/YY)",
                      },
                      validate: (val) => {
                        const [mm, yy] = val
                          .split("/")
                          .map((p) => parseInt(p, 10));
                        if (isNaN(mm) || isNaN(yy))
                          return "Invalid format (MM/YY)";
                        const year = 2000 + yy;
                        const monthIndex = mm - 1;
                        const lastDayOfMonth = new Date(
                          year,
                          monthIndex + 1,
                          0,
                        );
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return lastDayOfMonth >= today || "Card has expired";
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className={styles.input}
                        autoComplete="cc-exp"
                        onChange={(e) =>
                          field.onChange(formatExpiryInput(e.target.value))
                        }
                        value={field.value}
                      />
                    )}
                  />
                  {errors.expiryDate && (
                    <p className={styles.error}>{errors.expiryDate.message}</p>
                  )}
                </div>

                <div>
                  <label className={styles.label}>CVV*</label>
                  <Controller
                    name="cvv"
                    control={control}
                    disabled={!!payInfo}
                    rules={{
                      required: "CVV is required",
                      validate: (val) =>
                        new RegExp(`^\\d{${selectedRules?.cvvLength}}$`).test(
                          val,
                        ) || `CVV must be ${selectedRules?.cvvLength} digits`,
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder={"0".repeat(selectedRules?.cvvLength)}
                        maxLength={selectedRules?.cvvLength}
                        className={styles.input}
                        autoComplete="cc-csc"
                        onChange={(e) => {
                          const raw = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, selectedRules?.cvvLength);
                          field.onChange(raw);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.cvv && (
                    <p className={styles.error}>{errors.cvv.message}</p>
                  )}
                </div>
              </div>
              {!payInfo && (
                <Box>
                  <Toggle
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
                <Box width="600px">
                  <AddNewPaymentAddress />
                </Box>
              )}
          </Box>
          {!payInfo && (
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
                disabled={isDefaultBilling || deletePaymentProfilePending}
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

export default CardForm;

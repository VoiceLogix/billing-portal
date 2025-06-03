import { useForm, Controller } from "react-hook-form";
import styles from "./card-form.module.css";
import { CardTypeSVG, PaymentCardType } from "../../SVG/CardTypeSVG";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  cardType: PaymentCardType;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const CARD_TYPES: PaymentCardType[] = [
  "visa",
  "mastercard",
  "amex",
  "discover",
];

const cardValidationRules = {
  visa: {
    re: /^(?:4[0-9]{12}(?:[0-9]{3})?|4[0-9]{15}|4[0-9]{18})$/,
    example: "4xxx xxxx xxxx xxxx",
    maxLength: 19,
    cvvLength: 3,
  },
  mastercard: {
    re: /^(?:5[1-5][0-9]{14}|2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9]{2}|7(?:[0][0-1]|20))[0-9]{12})$/,
    example: "51xx xxxx xxxx xxxx",
    maxLength: 16,
    cvvLength: 3,
  },
  amex: {
    re: /^(?:3[47][0-9]{13})$/,
    example: "34x xxxxxx xxxxx",
    maxLength: 15,
    cvvLength: 4,
  },
  discover: {
    re: /^(?:6011[0-9]{12}|65[0-9]{14}|64[4-9][0-9]{13})$/,
    example: "6011 xxxx xxxx xxxx",
    maxLength: 16,
    cvvLength: 3,
  },
};

const formatCardNumber = (value: string) => {
  const onlyDigits = value.replace(/\D/g, "");
  return onlyDigits.match(/.{1,4}/g)?.join(" ") || "";
};

const formatExpiryDate = (value: string) => {
  const raw = value.replace(/\D/g, "");
  return raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2, 4)}` : raw;
};

const CardForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      cardType: "visa",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const selectedCardType = watch("cardType");
  const selectedRules = cardValidationRules[selectedCardType];

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* First & Last Name */}
        <div className={styles.grid2Cols}>
          <div>
            <label className={styles.label}>First Name*</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              type="text"
              placeholder="John"
              className={styles.input}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className={styles.label}>Last Name*</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              placeholder="Doe"
              className={styles.input}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className={styles.error}>{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={styles.label}>Email*</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="example@company.com"
            className={styles.input}
            autoComplete="email"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        {/* Card Type */}
        <div>
          <label className={styles.label}>Card Type</label>
          <div className={styles.cardOptions}>
            <Controller
              name="cardType"
              control={control}
              render={({ field }) => (
                <>
                  {CARD_TYPES.map((type) => (
                    <label
                      key={type}
                      className={`${styles.cardOption} ${
                        field.value === type ? styles.selectedCard : ""
                      }`}
                    >
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <CardTypeSVG type={type} />
                    </label>
                  ))}
                </>
              )}
            />
          </div>
        </div>

        {/* Card Details */}
        <div className={styles.grid3Cols}>
          {/* Card Number */}
          <div>
            <label className={styles.label}>Card Number*</label>
            <Controller
              name="cardNumber"
              control={control}
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
                  maxLength={selectedRules.maxLength + 3} // spaces
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

          {/* Expiry Date */}
          <div>
            <label className={styles.label}>Expiry Date*</label>
            <Controller
              name="expiryDate"
              control={control}
              rules={{
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Invalid format (MM/YY)",
                },
                validate: (val) => {
                  const [mm, yy] = val.split("/").map((p) => parseInt(p, 10));
                  if (isNaN(mm) || isNaN(yy)) return "Invalid format (MM/YY)";
                  const year = 2000 + yy;
                  const monthIndex = mm - 1;
                  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
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
                    field.onChange(formatExpiryDate(e.target.value))
                  }
                  value={field.value}
                />
              )}
            />
            {errors.expiryDate && (
              <p className={styles.error}>{errors.expiryDate.message}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label className={styles.label}>CVV*</label>
            <Controller
              name="cvv"
              control={control}
              rules={{
                required: "CVV is required",
                validate: (val) =>
                  new RegExp(`^\\d{${selectedRules.cvvLength}}$`).test(val) ||
                  `CVV must be ${selectedRules.cvvLength} digits`,
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={"0".repeat(selectedRules.cvvLength)}
                  maxLength={selectedRules.cvvLength}
                  className={styles.input}
                  autoComplete="cc-csc"
                  onChange={(e) => {
                    const raw = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, selectedRules.cvvLength);
                    field.onChange(raw);
                  }}
                  value={field.value}
                />
              )}
            />
            {errors.cvv && <p className={styles.error}>{errors.cvv.message}</p>}
          </div>
        </div>

        {/* Submit */}
        <div className={styles.submitWrapper}>
          {/* <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className={`${styles.submitButton} ${styles.deleteButton}`}
          >
            Delete Method
          </button> */}
          <button type="submit" className={styles.submitButton}>
            Save Method
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;

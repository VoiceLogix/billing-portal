import { useForm, Controller } from "react-hook-form";
import styles from "./form.module.css";
import Dropdown from "../Dropdown/Dropdown";

type FormValues = {
  routingNumber: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  accountType: "Checking" | "Savings";
  email: string;
};

const ACCOUNT_TYPES = ["Checking", "Savings"] as const;

const formatRoutingNumber = (value: string) => {
  // Strip non‐digits, then group into XXX XXX XXX
  const onlyDigits = value.replace(/\D/g, "").slice(0, 9);
  const parts: string[] = [];
  for (let i = 0; i < onlyDigits.length; i += 3) {
    parts.push(onlyDigits.substring(i, i + 3));
  }
  return parts.join(" ");
};

const ECheckForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      routingNumber: "",
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      accountType: "Checking",
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Strip spaces from routingNumber before sending
    const rawRouting = data.routingNumber.replace(/\D/g, "");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* ---------- Routing Number & Bank Name ---------- */}
        <div className={styles.grid2Cols}>
          {/* Routing Number */}
          <div>
            <label className={styles.label}>Routing Number*</label>
            <Controller
              name="routingNumber"
              control={control}
              rules={{
                required: "Routing number is required",
                validate: (val) => {
                  const raw = val.replace(/\D/g, "");
                  return raw.length === 9 || "Routing number must be 9 digits";
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
              <p className={styles.error}>{errors.routingNumber.message}</p>
            )}
          </div>

          {/* Bank Name */}
          <div>
            <label className={styles.label}>Bank Name*</label>
            <input
              {...register("bankName", { required: "Bank name is required" })}
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

        {/* ---------- Account Number ---------- */}
        <div>
          <label className={styles.label}>Account Number*</label>
          <Controller
            name="accountNumber"
            control={control}
            rules={{
              required: "Account number is required",
              validate: (val) => {
                const raw = val.replace(/\D/g, "");
                return (
                  raw.length >= 4 || "Account number must be at least 4 digits"
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

        {/* ---------- Name on Bank Account & Account Type ---------- */}
        <div className={styles.grid2Cols}>
          {/* Name on Bank Account */}
          <div>
            <label className={styles.label}>Name on Bank Account*</label>
            <input
              {...register("accountHolderName", {
                required: "Account holder name is required",
              })}
              type="text"
              placeholder="John Doe"
              className={styles.input}
              autoComplete="name"
            />
            {errors.accountHolderName && (
              <p className={styles.error}>{errors.accountHolderName.message}</p>
            )}
          </div>

          {/* Account Type (select) */}
          <div>
            <label className={styles.label}>Account Type*</label>
            <Controller
              name="accountType"
              control={control}
              rules={{ required: "Account type is required" }}
              render={({ field }) => {
                const dropdownItems = ACCOUNT_TYPES.map((type) => ({
                  label: type,
                  onSelect: () => field.onChange(type),
                }));

                return (
                  <div>
                    <Dropdown label={field.value} items={dropdownItems} />
                  </div>
                );
              }}
            />
            {errors.accountType && (
              <p className={styles.error}>{errors.accountType.message}</p>
            )}
          </div>
        </div>

        {/* ---------- Email ---------- */}
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

        {/* ---------- Submit Buttons ---------- */}
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

export default ECheckForm;

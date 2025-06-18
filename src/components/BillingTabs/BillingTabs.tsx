import { Tabs } from "radix-ui";
import styles from "./styles.module.css";
import { Dashboard } from "../Dashboard/Dashboard";
import BillingListing, { BillingType } from "../Billing/BillingListing";
import { Payments } from "../Payments/Payments";

const BillingTabs = () => (
  <>
    <Tabs.Root className={styles.TabsRoot} defaultValue="tab1">
      <Tabs.List className={styles.TabsList} aria-label="Manage your account">
        <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
          Dashboard
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
          Quotes
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab3">
          Orders
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab4">
          Invoices
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab5">
          Payment
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab6">
          Company Profile
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab7">
          Subscription
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab8">
          Hierarchy
        </Tabs.Trigger>
        <Tabs.Trigger
          disabled
          className={styles.TabsTrigger}
          value="tab9"
        ></Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={styles.TabsContent} value="tab1">
        <Dashboard />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab2">
        <BillingListing type={BillingType.Quotes} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab3">
        <BillingListing type={BillingType.Orders} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab4"></Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab5">
        <Payments />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab6"></Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab7"></Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab8"></Tabs.Content>
    </Tabs.Root>
  </>
);

export default BillingTabs;

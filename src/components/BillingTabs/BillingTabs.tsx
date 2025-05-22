import { Tabs } from "radix-ui";
import "./styles.module.css";

const BillingTabs = () => (
  <>
    <h1 className="text">text</h1>

    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          Dashboard
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          Quotes
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab3">
          Orders
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab4">
          Invoices
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab5">
          Payment
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab6">
          Compny Profile
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab7">
          Subscription
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab8">
          Hierarchy
        </Tabs.Trigger>
        <Tabs.Trigger
          disabled
          className="TabsTrigger"
          value="tab9"
        ></Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab3"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab4"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab5"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab6"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab7"></Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab8"></Tabs.Content>
    </Tabs.Root>
  </>
);

export default BillingTabs;

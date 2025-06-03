import { Tabs } from "radix-ui";
import styles from "./styles.module.css";

interface TabsComponentProps {
  tabs: {
    label: React.ReactNode;
    content: React.ReactNode;
  }[];
}

const TabsComponent = ({ tabs }: TabsComponentProps) => (
  <Tabs.Root className={styles.TabsRoot} defaultValue="tab1">
    <Tabs.List className={styles.TabsList}>
      {tabs.map((tab, index) => (
        <Tabs.Trigger
          key={index}
          className={styles.TabsTrigger}
          value={`tab${index + 1}`}
        >
          {tab.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {tabs.map((tab, index) => (
      <Tabs.Content
        key={index}
        className={styles.TabsContent}
        value={`tab${index + 1}`}
      >
        {tab.content}
      </Tabs.Content>
    ))}
  </Tabs.Root>
);

export default TabsComponent;

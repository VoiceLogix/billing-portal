import { useEffect } from "react";
import BillingTabs from "./components/BillingTabs/BillingTabs";
import { fetchToken } from "./service/auth";

const App = () => {
  useEffect(() => {
    fetchToken();
  }, []);
  return (
    <>
      <BillingTabs />
    </>
  );
};

export default App;

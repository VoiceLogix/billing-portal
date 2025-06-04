import { useEffect, useState } from "react";
import BillingTabs from "./components/BillingTabs/BillingTabs";
import { authenticateUser } from "./service/tokenStorage";
import { Box } from "./components/UI/Box";
import { Loading } from "./components/UI/Loading";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

const App = () => {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const { jsessionId, csrfToken } = await authenticateUser();
        if (jsessionId && csrfToken) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setStatus("unauthenticated");
      }
    };

    checkUserAuthentication();
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        No Billing Data Available. Please contact support.
      </Box>
    );
  }

  return <BillingTabs />;
};

export default App;

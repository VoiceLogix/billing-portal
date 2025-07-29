import { useEffect, useState } from "react";
import { authenticateUser } from "./service/tokenStorage";
import { Box } from "./components/UI/Box";
import { Loading } from "./components/UI/Loading";
import ServiceDesk from "./components/ServiceDesk/ServiceDesk";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

const ServiceDeskApp = () => {
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
        Error Loading Service Desk. Please contact support.
      </Box>
    );
  }

  return (
    <Box>
      <ServiceDesk />
    </Box>
  );
};

export default ServiceDeskApp;

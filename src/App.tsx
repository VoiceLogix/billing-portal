import NavWidget from "./components/NavWidget";
import { useNavStore } from "./store";

const App = () => {
  const activeNav = useNavStore((state) => state.activeNav);

  return (
    <>
      <NavWidget />
      <div>
        {activeNav === "billing_center" && <h1>Billing Center</h1>}
        {activeNav === "service_desk" && <h1>Service Desk</h1>}
      </div>
    </>
  );
};

export default App;

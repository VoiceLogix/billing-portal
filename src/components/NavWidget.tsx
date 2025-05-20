import { createPortal } from "react-dom";
import { NavItems, useNavStore } from "../store";

export default function NavWidget() {
  const navContainer = document.getElementById("nav-buttons");
  const activeNav = useNavStore((state) => state.activeNav);
  const setActiveNav = useNavStore((state) => state.setActiveNav);

  const items = [
    { id: NavItems.BILLING_CENTER, label: "Billing Center" },
    { id: NavItems.SERVICE_DESK, label: "Service Desk" },
  ];

  const navItems = items.map((item) => (
    <li
      key={item.id}
      className={activeNav === item.id ? "nav-link-current" : ""}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveNav(item.id);
        }}
      >
        <div className="nav-button" />
        <span>{item.label}</span>
      </a>
    </li>
  ));

  return navContainer ? createPortal(<>{navItems}</>, navContainer) : null;
}

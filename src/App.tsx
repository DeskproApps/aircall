import { Routes, Route } from "react-router-dom";
import GlobalApp from "@/pages/GlobalApp";
import UserSidebarApp from "./pages/UserSidebarApp";
import TicketSidebarApp from "./pages/TicketSidebarApp";

const App = () => {
  return (
    <Routes>
      <Route path="/global" element={<GlobalApp />} />
      <Route path="/ticket-sidebar" element={<TicketSidebarApp />} />
      <Route path="/user-sidebar" element={<UserSidebarApp />} />
    </Routes>
  );
}

export { App };

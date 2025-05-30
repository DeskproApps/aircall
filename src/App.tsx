import { Routes, Route } from "react-router-dom";
import { Main } from "@/pages";
import { VerifySettingsPage } from "./pages/admin";
import { ListCallsPage } from "./pages/calls";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
        <Route path="admin">
          <Route path="verify-settings" element={<VerifySettingsPage />} />
        </Route>

        <Route path="calls">
          <Route index element={<ListCallsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export { App };

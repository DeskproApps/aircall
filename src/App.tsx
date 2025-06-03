import { Routes, Route } from "react-router-dom";
import { Main } from "@/pages";
import { VerifySettingsPage } from "./pages/admin";
import { CallDetailsPage, ListCallsPage } from "./pages/calls";
import { CreateCallCommentPage } from "./pages/calls/comments";

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
          <Route path=":callId" >
            <Route index element={<CallDetailsPage />} />
            <Route path="comments/create" element={<CreateCallCommentPage />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export { App };

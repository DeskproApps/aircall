import { CallDetailsPage, ListCallsPage } from "./pages/calls";
import { ContactDetailsPage, CreateContactPage, ListContactsPage } from "./pages/contacts";
import { CreateCallCommentPage } from "./pages/calls/comments";
import { Main } from "@/pages";
import { Routes, Route } from "react-router-dom";
import { VerifySettingsPage } from "./pages/admin";
import CallListener from "./components/CallListener";
import GlobalApp from "./pages/global";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="global" element={<GlobalApp />} />
        <Route index element={<Main />} />
        <Route path="admin">
          <Route path="verify-settings" element={<VerifySettingsPage />} />
        </Route>

        <Route path="calls" element={<CallListener />}>
          <Route index element={<ListCallsPage />} />
          <Route path=":callId" >
            <Route index element={<CallDetailsPage />} />
            <Route path="comments/create" element={<CreateCallCommentPage />} />
          </Route>
        </Route>

        <Route path="contacts">
          <Route index element={<ListContactsPage/>} />
          <Route path="create" element={<CreateContactPage />} />
          <Route path=":contactId" >
            <Route index element={<ContactDetailsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export { App };

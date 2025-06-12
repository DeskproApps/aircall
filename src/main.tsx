import './instrument';
import "./main.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "simplebar/dist/simplebar.min.css";
import { App } from "./App";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { ErrorBoundary, reactErrorHandler } from '@sentry/react';
import { HashRouter } from "react-router-dom";
import { queryClient } from "@/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Scrollbar } from "@deskpro/deskpro-ui";

const root = ReactDOM.createRoot(document.getElementById('root') as Element, {
  onRecoverableError: reactErrorHandler(),
});
root.render((
  <StrictMode>
    <Scrollbar style={{ height: "100%", width: "100%" }} autoHide>
      <DeskproAppProvider>
        <HashRouter>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary fallback={<>here was an error!</>}>
                <App />
              </ErrorBoundary>
            </Suspense>
          </QueryClientProvider>
        </HashRouter>
      </DeskproAppProvider>
    </Scrollbar>
  </StrictMode>
));

import { AircallError, isErrorWithTroubleshoot } from "@/api/aircallRequest";
import { faExclamationTriangle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Stack, Button } from "@deskpro/deskpro-ui";
import Callout from "@/components/Callout";

interface ErrorFallbackPageProps {
  error: unknown;
  componentStack: string;
  eventId: string;
  resetError(): void;
}

export default function ErrorFallbackPage(props: Readonly<ErrorFallbackPageProps>) {
  const { error, resetError } = props
  let errorMessage = "An unknown error occurred."

  if (error instanceof AircallError && isErrorWithTroubleshoot(error.data)) {
    errorMessage = error.data.troubleshoot
  } else if (error instanceof Error && error.message.trim() !== "") {
    errorMessage = error.message
  }

  return (
    <Stack style={{ width: "100%" }} vertical gap={10} padding={12} role="alert">
      <Callout
        accent="red"
        headingText={"Something went wrong"}
        icon={faExclamationTriangle}
        style={{ width: "100%" }}
      >
        {errorMessage}
      </Callout>
      <Button
        text="Reload"
        onClick={resetError}
        icon={faRefresh}
        intent="secondary"
      />
    </Stack>
  );
};

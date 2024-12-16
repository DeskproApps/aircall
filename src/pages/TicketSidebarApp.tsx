import { useEffect } from "react";
import {
  LoadingSpinner,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import useCalls from "@/hooks/useCalls";
import CallList from "@/components/CallList";
import ButtonDial from "@/components/ButtonDial";

export default function TicketSidebarApp() {
  const { context } = useDeskproLatestAppContext<any, any>();
  const {
    setPhoneNumbers,
    calls,
  } = useCalls();

  const phoneNumbers = (context?.data?.ticket?.primaryUser?.phoneNumbers) as { number: string }[] | undefined;

  useEffect(() => {
    if (phoneNumbers) {
      setPhoneNumbers(phoneNumbers.map((phoneNumber) => phoneNumber.number));
    }
  }, [phoneNumbers]);

  if (phoneNumbers === undefined) {
    return <LoadingSpinner />;
  }

  return <>
    {(phoneNumbers??[]).map(phoneNumber => <ButtonDial key={phoneNumber.number} phoneNumber={phoneNumber.number} />)}
    <CallList calls={calls} />;
  </>
};
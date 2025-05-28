import { useEffect } from "react";
import {
  LoadingSpinner,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import useCalls from "@/hooks/useCalls";
import CallList from "@/components/CallList";
import ButtonDial from "@/components/ButtonDial";
import { ContextData, ContextSettings } from "@/types/deskpro/context";

export default function UserSidebarApp() {
  const { context } = useDeskproLatestAppContext<ContextData, ContextSettings>()
  const {
    setPhoneNumbers,
    calls,
  } = useCalls();

  const phoneNumbers = context?.data?.user?.phoneNumbers

  useEffect(() => {
    if (phoneNumbers) {
      setPhoneNumbers(phoneNumbers.map((phoneNumber) => phoneNumber.number));
    }
  }, [phoneNumbers, setPhoneNumbers]);

  if (phoneNumbers === undefined) {
    return <LoadingSpinner />;
  }

  return <>
    {phoneNumbers.map(phoneNumber => <ButtonDial key={phoneNumber.number} phoneNumber={phoneNumber.number} />)}
    <CallList calls={calls} />;
  </>
};

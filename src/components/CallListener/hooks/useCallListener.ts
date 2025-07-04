import { ActiveCall } from "@/types/aircall";
import { getContacts } from "@/api/contacts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryWithClient } from "@deskpro/app-sdk";
import useLocalStorageState from "use-local-storage-state";

export default function useCallListener() {
  const navigate = useNavigate()

  const [activeCall] = useLocalStorageState<ActiveCall | undefined>("aircall-active-call", undefined)

  const { data: contactResponse, isLoading: isQueryLoading } = useQueryWithClient(
    ["activeCall", activeCall?.callId?.toString() ?? ""],
    (client) => {

      return getContacts(client, { phoneNumber: activeCall?.phoneNumber ?? "" })
    },
    {
      enabled: !!activeCall
    }
  )

  useEffect(() => {
    if (activeCall && !isQueryLoading && contactResponse) {

      if (contactResponse.contacts.length < 1) {
        // navigate to the create contact page.
        navigate(`/contacts/create?phoneNumber=${encodeURIComponent(activeCall.phoneNumber)}`)
        return
      }

      if (contactResponse.contacts.length > 1) {
        // navigate to the contact list page.
        navigate(`/contacts?filter=${activeCall.phoneNumber}`)
        return
      }

      navigate(`/contacts/${contactResponse.contacts[0].id}`)
    }
  }, [activeCall, contactResponse, isQueryLoading, navigate])

  return {
    isLoading: !!activeCall && (isQueryLoading || (!isQueryLoading && !!contactResponse))
  }
}
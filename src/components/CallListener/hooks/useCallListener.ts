import { ActiveCall } from "@/types/aircall";
import { getContactsByNumber } from "@/api/contacts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryWithClient } from "@deskpro/app-sdk";
import useLocalStorageState from "use-local-storage-state";

export default function useCallListener() {
  const navigate = useNavigate()

  const [activeCall] = useLocalStorageState<ActiveCall | undefined>("aircall-active-call", undefined)
  const [isNavigating, setIsNavigating] = useState(false)

  const { data: contactResponse, isLoading: isQueryLoading } = useQueryWithClient(
    ["activeCall", activeCall?.callId?.toString() ?? ""],
    (client) => {

      return getContactsByNumber(client, activeCall?.phoneNumber ?? "")
    },
    {
      enabled: !!activeCall
    }
  )

  useEffect(() => {
    if (activeCall && !isQueryLoading && contactResponse) {
      setIsNavigating(true)

      if (contactResponse.contacts.length < 1) {
        // navigate to the create page
        navigate(`/contacts/create`)
        return
      }

      if (contactResponse.contacts.length > 1) {
        // navigate to the select page.
        navigate(`/contacts?filter=${activeCall.phoneNumber}`)
        return
      }

      navigate(`/contacts/${contactResponse.contacts[0].id}`)
    }
  }, [activeCall, contactResponse, isQueryLoading, navigate])

  return {
    isLoading: !!activeCall && (isQueryLoading || isNavigating)
  }
}
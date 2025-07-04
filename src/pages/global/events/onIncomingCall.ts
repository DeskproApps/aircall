import { ActiveCall } from "@/types/aircall";
import { AircallEventIncomingCall } from "aircall-everywhere";
import { IDeskproClient } from "@deskpro/app-sdk";

interface OnIncomingCallParams {
  event: AircallEventIncomingCall
  client: IDeskproClient
  setActiveCall: React.Dispatch<React.SetStateAction<ActiveCall | undefined>>
}

export function onIncomingCall(params: OnIncomingCallParams) {
  const {event, client, setActiveCall } = params

  client.focus()
  setActiveCall({callId: event.call_id, phoneNumber: event.from})
}
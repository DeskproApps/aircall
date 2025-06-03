import { ActiveCall } from "@/types/aircall";
import { AircallEventOutgoingCall } from "aircall-everywhere";

interface OnOutgoingCallParams {
  event: AircallEventOutgoingCall
  setActiveCall: React.Dispatch<React.SetStateAction<ActiveCall | undefined>>
}

export function onOutgoingCall(params: OnOutgoingCallParams) {
  const { event, setActiveCall } = params
  setActiveCall({ callId: event.call_id, phoneNumber: event.to })
}
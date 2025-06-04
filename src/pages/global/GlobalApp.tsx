import "./GlobalApp.css"
import { ActiveCall } from "@/types/aircall";
import { LoadingSpinner, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { onIncomingCall, onOutgoingCall } from "./events/";
import { useEffect, useState } from "react";
import AircallWorkspace from "aircall-everywhere";
import useLocalStorageState from "use-local-storage-state";

export default function GlobalApp() {
  const [aircallWorkspace, setAircallWorkspace] = useState<AircallWorkspace | undefined>(undefined)
  const [activeCall, setActiveCall] = useLocalStorageState<ActiveCall | undefined>("aircall-active-call", undefined)
  const [dialledNumber, setDialledNumber] = useLocalStorageState<string | undefined>('aircall-dialled-number', undefined)

  useEffect(() => {
    const aircallWorkspace = new AircallWorkspace({
      onLogin: (_settings) => {
      },
      onLogout: () => { },
      domToLoadWorkspace: '#workspace',
      size: 'big',
    })

    setAircallWorkspace(aircallWorkspace)
  }, [])

  useInitialisedDeskproAppClient((client) => {
    if (!aircallWorkspace) {
      return
    }

    aircallWorkspace.on('incoming_call', (event) => { onIncomingCall({ event, client, setActiveCall }) })
    aircallWorkspace.on('outgoing_call', (event) => { onOutgoingCall({ event, setActiveCall }) })
    aircallWorkspace.on('external_dial', (event) => { setActiveCall({ phoneNumber: event.phone_number, callId: undefined }) })
    aircallWorkspace.on('call_end_ringtone', () => { setActiveCall(undefined) }) // Revisit later, we can handle this better.
    aircallWorkspace.on('call_ended', () => setActiveCall(undefined))
  }, [aircallWorkspace])

  // Focus the app when the agent dials a number from the ticket/user sidebar with the dialled number.
  useInitialisedDeskproAppClient((client) => {
    if (dialledNumber === undefined || aircallWorkspace === undefined) {
      return
    }

    setDialledNumber(undefined)
    client.focus()
    aircallWorkspace.send('dial_number', { phone_number: dialledNumber }, (_success) => undefined)
  }, [dialledNumber, aircallWorkspace])

  // Update the app header when the agent is making a call.
  useInitialisedDeskproAppClient((client) => {
    const phoneNumber = activeCall?.phoneNumber
    client.setTitle(
      phoneNumber ? 'Aircall: ' + phoneNumber : 'Aircall'
    )
  }, [activeCall?.phoneNumber])

  return (
    <section style={{ height: "100%", width: "100%", position: "relative" }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <LoadingSpinner />
      </div>
      <div id="workspace" style={{ position: 'absolute', zIndex: 2 }} />
    </section>
  )
}
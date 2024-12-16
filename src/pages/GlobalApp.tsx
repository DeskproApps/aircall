import { memo, useEffect, useState } from "react";
import {
  LoadingSpinner,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import AircallPhone from 'aircall-everywhere'
import useLocalStorageState from "use-local-storage-state";

const AircallPhoneContainer = memo(() => <div id="aircall-phone" style={{ zIndex: 10, height: "100vh", width: "100vw" }} />)

export default function GlobalApp() {
  const [aircallPhone, setAircallPhone] = useState<AircallPhone | undefined>(undefined);
  const [call, setCall] = useState<{callId?: number, phoneNumber: string}|undefined>(undefined);
  const [dial, setDial] = useLocalStorageState<string|undefined>('aircall-phone-make', undefined);

  // Boot Aircall.
  useEffect(() => {
    const aircallPhone = new AircallPhone({
      onLogin: () => undefined,
      onLogout: () => undefined,
      domToLoadPhone: '#aircall-phone',
      // integrationToLoad: '', // @todo: We need this to be "deskpro"?
      size: 'auto',
    });

    // Listen to events to update the phone number the user is/will talk/talking/talked to.
    aircallPhone.on('incoming_call', (event) => setCall({phoneNumber: event.from, callId: event.call_id}));
    aircallPhone.on('outgoing_call', (event) => setCall({phoneNumber: event.to, callId: event.call_id}));
    aircallPhone.on('external_dial', (event) => setCall({phoneNumber: event.phone_number, callId: undefined}));
    aircallPhone.on('call_end_ringtone', () => setCall(undefined));
    aircallPhone.on('call_ended', () => setCall(undefined));

    setAircallPhone(aircallPhone)
  }, [setAircallPhone, setCall]);

  // Act on call data.
  useInitialisedDeskproAppClient((client) => {
    const phoneNumber = call?.phoneNumber;
    client.setTitle(
      phoneNumber ? 'Aircall: ' + phoneNumber : 'Aircall'
    );
  }, [call?.phoneNumber])

  // Act on dial data.
  useInitialisedDeskproAppClient((client) => {
    if (dial === undefined || aircallPhone === undefined) {
      return;
    }

    // Remove it from the queue and call it.
    setDial(undefined);
    client.focus();
    aircallPhone.send('dial_number', { phone_number: dial }, () => undefined);
  }, [dial, aircallPhone]);

  return <>
    <div style={{position: 'absolute', inset: 0, zIndex: 0}}><LoadingSpinner /></div>
    <AircallPhoneContainer />
  </>;
};

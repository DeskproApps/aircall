import { Call } from '@/AirCallTypes';
import { IDeskproClient, proxyFetch, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { useState } from 'react';

async function getCallsForNumber(client: IDeskproClient, number: string): Promise<Call[]> {
    const fetch = await proxyFetch(client);
    const response = await fetch(
        'https://api.aircall.io/v1/calls/search?phone_number=' + number,
        {
            headers: {
                Authorization: `Basic __aircall_api_id+':'+aircall_api_secret.base64__`,
            },
        },
    );
    const data = (await response.json()).calls ?? [];
    
    return data;
}

export default function useCalls() {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
    const [calls, setCalls] = useState<Call[]>([]);

    useInitialisedDeskproAppClient((client) => {
        Promise.all(phoneNumbers.map(phoneNumbers => getCallsForNumber(client, phoneNumbers)))
            .then(results => results.flat())
            .then(setCalls);
    }, [phoneNumbers, setCalls])

    return {
        setPhoneNumbers,
        phoneNumbers,
        calls,
    };
}
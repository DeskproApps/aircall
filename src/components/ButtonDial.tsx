import useLocalStorageState from "use-local-storage-state";

export default function ButtonDial(props: {phoneNumber: string}) {
    const [dial, setDial] = useLocalStorageState<string|undefined>('aircall-phone-make', undefined);
    
    return <button style={{display: "block"}} onClick={() => {
        setDial(props.phoneNumber)
    }}>Call <strong>{props.phoneNumber}</strong></button>
}
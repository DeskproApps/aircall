import { CSSProperties } from "react";
import { DeskproTheme } from "@deskpro/deskpro-ui";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorageState from "use-local-storage-state";

interface ButtonDialProps {
    number: string
    theme: DeskproTheme
    width?: string
}

export default function ButtonDial(props: Readonly<ButtonDialProps>) {
    const { number, theme, width = "fit-content" } = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dialledNumber, setDialledNumber] = useLocalStorageState<string | undefined>('aircall-dialled-number', undefined);

    const buttonStyles: CSSProperties = {
        width,
        cursor: "pointer",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        color: theme.colors.grey100,
        border: `1px solid ${theme.colors.grey30}`,
        borderRadius: "4px",
        font: "inherit",
        fontSize: "12px",
        fontWeight: 500,
        backgroundColor: "white",
        padding: "8px 12px",
    }

    return (
        <button style={buttonStyles} onClick={() => { setDialledNumber(number) }}>
            <span style={{ color: theme.colors.turquoise100 }}>
                <FontAwesomeIcon size="sm" icon={faPhone} />
            </span>
            Call {number}
        </button>
    )
}
import { DeskproTheme } from "@deskpro/deskpro-ui";
import { CSSProperties } from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonDialProps {
    number: string
    theme: DeskproTheme
    width?: string
}

export default function ButtonDial(props: Readonly<ButtonDialProps>) {
    const { number, theme, width = "fit-content" } = props

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
        <button style={buttonStyles} onClick={() => { console.log("To be implemented") }}>
            <span style={{ color: theme.colors.turquoise100 }}>
                <FontAwesomeIcon size="sm" icon={faPhone} />
            </span>
            Call {number}
        </button>
    )
}
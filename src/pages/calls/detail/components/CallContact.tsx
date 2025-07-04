import { Call } from "@/types/aircall";
import { DeskproTheme, P1, Stack } from "@deskpro/deskpro-ui";

interface CallContactProps {
    call: Call
    theme: DeskproTheme
    contact: NonNullable<Call["contact"]>
}

export function CallContact(props: Readonly<CallContactProps>) {
    const { call, theme, contact } = props

    return (
        <Stack gap={5} style={{ flexWrap: "wrap" }}>
            <P1 style={{ fontSize: "11px" }}>{contact.first_name} {contact.last_name}</P1>
            <P1 style={{ fontSize: "11px", color: theme.colors.grey60 }}>{call.raw_digits}</P1>
        </Stack>
    )
}
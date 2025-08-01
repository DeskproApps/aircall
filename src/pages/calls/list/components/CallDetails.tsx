import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@/components/icons"
import { Call } from "@/types/aircall"
import { DeskproTheme, P1, Stack } from "@deskpro/deskpro-ui"
import { formatDuration, formatTimestamp } from "@/utils/date"
import { Link } from "@deskpro/app-sdk"
import { NavigateFunction } from "react-router-dom"

interface CallDetailsProps {
    call: Call,
    theme: DeskproTheme,
    navigate: NavigateFunction
}

export function CallDetails(props: Readonly<CallDetailsProps>) {
    const { call, theme, navigate } = props

    const targetUser = getCallTargetUser(call)

    return (
        <Stack justify="space-between" style={{ width: "100%", padding: "8px 12px" }}>
            <Stack gap={5}>
                <Stack >
                    {call.direction === "outbound" ?

                        <ArrowUpRightIcon />
                        :
                        <ArrowDownLeftIcon />
                    }
                </Stack>

                <Stack vertical gap={3}>
                    <Link
                        color={"grey100"}
                        href={`#`}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`/calls/${call.id}`)
                        }}
                        style={{ fontWeight: 500, fontSize: "12px" }}
                    >
                        {targetUser.name}
                    </Link>

                    {targetUser.email && (
                        <P1 style={{ fontWeight: 400, fontSize: "11px", color: theme.colors.grey80, wordBreak: "break-all" }}>
                            {targetUser.email}
                        </P1>
                    )}

                    <P1 style={{ fontWeight: 400, fontSize: "11px" }}>
                        {formatTimestamp(call.started_at)}
                    </P1>

                    <P1 style={{ fontWeight: 400, fontSize: "11px", color: theme.colors.grey80 }}>
                        {formatDuration(call.started_at, call.ended_at)}
                    </P1>
                </Stack>
            </Stack>
        </Stack>
    )
}

function getCallTargetUser(call: Call): {
    name: string;
    email?: string;
} {

    if (call.user) {
        return {
            name: call.user.name,
            email: call.user.email,
        }
    }

    return {
        name: call.number.name
    }
}
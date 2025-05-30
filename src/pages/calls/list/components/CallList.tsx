import { Call } from "@/types/aircall";
import { HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { DeskproTheme, Stack } from "@deskpro/deskpro-ui";
import { Fragment } from "react/jsx-runtime";
import { CallDetails } from "./CallDetails";

interface CallListProps {
    calls: Call[]
    theme: DeskproTheme
    isLoading: boolean
}
export function CallList(props: Readonly<CallListProps>) {
    const { calls, theme, isLoading } = props

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Stack style={{ width: "100%" }} vertical>
            {calls.map((call) => {
                return (
                    <Fragment key={call.id}>
                        <CallDetails
                            call={call}
                            theme={theme}
                        />
                        <HorizontalDivider style={{ width: "100%" }} />
                    </Fragment>
                )
            })}
        </Stack>
    )
}

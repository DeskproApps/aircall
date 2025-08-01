import { Call } from "@/types/aircall";
import { CallDetails } from "./CallDetails";
import { DeskproTheme, Stack } from "@deskpro/deskpro-ui";
import { Fragment } from "react/jsx-runtime";
import { HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { NavigateFunction } from "react-router-dom";

interface CallListProps {
    calls: Call[]
    theme: DeskproTheme
    isLoading: boolean
    navigate: NavigateFunction
}
export function CallList(props: Readonly<CallListProps>) {
    const { calls, theme, isLoading, navigate } = props

    if (isLoading) {
        return (
            <Stack align="center" justify="center" style={{ width: "100%" }}>
                <LoadingSpinner />
            </Stack>
        )
    }

    if (calls.length < 1) {
        return (
            <Stack padding={12}>
                <em style={{
                    color: theme.colors.grey80,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    fontSize: "12px"
                }}>
                    No Call History Found For The Provided Number(s).
                </em>
            </Stack>
        )
    }

    return (
        <Stack style={{ width: "100%" }} vertical>
            {calls.map((call) => {
                return (
                    <Fragment key={call.id}>
                        <CallDetails
                            call={call}
                            theme={theme}
                            navigate={navigate}
                        />
                        <HorizontalDivider style={{ width: "100%" }} />
                    </Fragment>
                )
            })}
        </Stack>
    )
}

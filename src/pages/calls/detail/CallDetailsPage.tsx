import { CallComments, CallContact, CallTags, CallUser } from "./components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDuration, formatTimestamp } from "@/utils/date";
import { HorizontalDivider, Link, LoadingSpinner, Property, useDeskproAppTheme, useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { P3, Stack } from "@deskpro/deskpro-ui";
import { useNavigate, useParams } from "react-router-dom";
import Callout from "@/components/Callout";
import isValidInteger from "@/utils/isValidInteger";
import useCall from "./hooks/useCall";

export default function CallDetailsPage(): JSX.Element {
    useInitialisedDeskproAppClient((client) => {
        client.setTitle("Call Details")
    }, [])

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements()
        registerElement("home", { type: "home_button" })
        registerElement("refresh", { type: "refresh_button" })
        registerElement("menu", {
            type: "menu",
            items: [
                {
                    title: "View Contacts",
                    payload: {
                        type: "changePath",
                        path: "/contacts"
                    },
                }
            ]
        })
    }, [])

    const { callId } = useParams()
    const { theme } = useDeskproAppTheme()
    const { isLoading, call } = useCall(callId ?? "")
    const navigate = useNavigate()

    if (!callId || !isValidInteger(callId)) {
        return (
            <Stack padding={12}>
                <Callout accent="red" style={{ width: "100%" }}>
                    Invalid url parameter: callId.
                </Callout>
            </Stack>
        )
    }

    if (isLoading) {
        return (
            <Stack align="center" justify="center" style={{ width: "100%" }}>
                <LoadingSpinner />
            </Stack>
        )
    }

    if (!call) {
        return (
            <Stack padding={12}>
                <Callout accent="red" style={{ width: "100%" }}>
                    No call found with the id "{callId}".
                </Callout>
            </Stack>
        )
    }

    const callContact = call.call.contact
    const callUser = call.call.user
    const hasCallTags = call.call.tags && call.call.tags.length > 0


    return (
        <Stack vertical>
            <Stack vertical gap={3} padding={12}>
                <Property label={"Call ID"} text={callId} />
                <Property label={"Contact"} text={callContact ? <CallContact call={call.call} theme={theme} contact={callContact} /> : undefined} />
                <Property label={"User"} text={callUser ? <CallUser user={callUser} /> : undefined} />
                <Property label={"Direction"} text={<div style={{ fontSize: "11px", textTransform: "capitalize" }}>{call.call.direction}</div>} />
                <Property label={"Started at"} text={formatTimestamp(call.call.started_at)} />
                <Property label={"Duration"} text={formatDuration(call.call.started_at, call.call.ended_at)} />
                <Property label={"Tags"} text={hasCallTags ? <CallTags theme={theme} tags={call.call.tags ?? []} /> : undefined} />
            </Stack>

            <HorizontalDivider style={{ width: "100%" }} />

            <Stack vertical gap={12} padding={12} style={{ width: "100%" }}>
                <P3>
                    Comments {(call.call.comments?.length ?? 0) < 4 && (
                        <Link
                            color="grey40"
                            href={`#`}
                            onClick={(e) => {
                                e.preventDefault()

                                navigate(`/calls/${callId}/comments/create`)
                            }}
                        >
                            <FontAwesomeIcon size="sm" icon={faPlus} />

                        </Link>
                    )}
                </P3>

                <CallComments comments={call.call.comments ?? []} theme={theme} />
            </Stack>
        </Stack>
    )

}
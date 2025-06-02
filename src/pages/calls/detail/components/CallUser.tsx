import { Call } from "@/types/aircall";
import { P1, Stack } from "@deskpro/deskpro-ui";

interface CallUserProps {
    user: NonNullable<Call["user"]>
}

export function CallUser(props: Readonly<CallUserProps>) {
    const { user } = props

    return (
        <Stack gap={5} style={{ flexWrap: "wrap" }}>
            <P1>{user.name}</P1>
        </Stack>
    )
}
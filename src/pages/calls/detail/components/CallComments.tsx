import { Avatar, DeskproTheme, P1, Stack, TSpan } from "@deskpro/deskpro-ui";
import { Call, CallComment } from "@/types/aircall";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { formatTimeSince } from "@/utils/date";
import { Fragment } from "react/jsx-runtime";
import { HorizontalDivider } from "@deskpro/app-sdk";


interface CallCommentsProps {
    comments: NonNullable<Call["comments"]>
    theme: DeskproTheme
}
export function CallComments(props: Readonly<CallCommentsProps>): JSX.Element {
    const { comments, theme } = props

    if (comments.length < 1) {
        return (
            <Stack style={{ width: "100%" }}>
                <em style={{
                    color: theme.colors.grey80,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    fontSize: "12px"
                }}>
                    No comment available.
                </em>
            </Stack>
        )
    }

    return (
        <Stack vertical style={{ width: "100%" }} gap={10}>
            {comments.map((comment) => {
                return (
                    <Fragment key={comment.id}>
                        <CommentCard theme={theme} comment={comment} />

                        <HorizontalDivider style={{ width: "100%", margin: 0 }} />
                    </Fragment>
                )
            })}

        </Stack>
    )

}

interface CommentCardProps {
    comment: CallComment
    theme: DeskproTheme

}

function CommentCard(props: Readonly<CommentCardProps>) {
    const { comment, theme } = props
    return (
        <Stack wrap="nowrap" gap={4} style={{ width: "100%" }}>

            <Stack vertical gap={4} style={{ width: "35px" }}>
                <Avatar
                    size={18}
                    name={comment.posted_by?.name}
                    backupIcon={faUser}
                />
                <TSpan
                    style={{
                        color: theme.colors.grey80,
                        fontSize: "9px"
                    }}>
                    {formatTimeSince(new Date(comment.posted_at * 1000))}
                </TSpan>
            </Stack>

            <Stack>
                <P1>
                    {comment.content}
                </P1>
            </Stack>
        </Stack>
    )

}
import { Call } from "@/types/aircall";
import { DeskproTheme, Tag, Stack } from "@deskpro/deskpro-ui";

interface CallContactProps {
    theme: DeskproTheme
    tags: NonNullable<Call["tags"]>
}

export function CallTags(props: Readonly<CallContactProps>) {
    const { tags, theme } = props

    return (
        <Stack gap={5} style={{ flexWrap: "wrap" }}>
            {tags.map((tag) => {
                const tagStyling = {
                    backgroundColor: theme.colors.grey5,
                    borderColor: theme.colors.grey20,
                    textColor: theme.colors.grey100
                }
                return <Tag key={tag.id} label={tag.name} color={tagStyling} />
            })}
        </Stack>
    )
}
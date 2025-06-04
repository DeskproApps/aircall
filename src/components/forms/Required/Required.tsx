import { DeskproTheme } from "@deskpro/deskpro-ui";

interface RequiredProps {
    theme: DeskproTheme
}
export default function Required(props: Readonly<RequiredProps>) {
    const { theme } = props
    return (
        <span style={{ color: theme.colors?.red100 }}>*</span>
    )
}
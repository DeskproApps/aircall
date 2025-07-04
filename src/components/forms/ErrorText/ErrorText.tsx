import { DeskproTheme, P8 } from "@deskpro/deskpro-ui"

interface ErrorTextProps {
    children: React.ReactNode | string | JSX.Element
    theme: DeskproTheme
}

export default function ErrorText(props: Readonly<ErrorTextProps>) {
    const { children, theme } = props

    if (!props.children) {
        return null
    }
    return (
        <P8 style={{ color: theme.colors.red80 }}>{children}</P8>
    )
}
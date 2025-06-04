import { DeskproTheme, Input, P8, Stack } from "@deskpro/deskpro-ui";
import { UseFormRegisterReturn } from "react-hook-form";
import Required from "../Required";

interface InputGroupProps extends React.ComponentPropsWithoutRef<'input'> {
    hasError: boolean
    label: string
    name: string
    register: UseFormRegisterReturn
    theme: DeskproTheme
}

export default function InputGroup(props: Readonly<InputGroupProps>) {
    const { label, hasError, required, name, theme, placeholder, register, ...inputProps } = props

    return (
        <Stack vertical style={{ width: "100%", }}>
            <label htmlFor={name} style={{ color: theme.colors?.grey80 }}>
                <P8>{label} {required && <Required theme={theme} />}</P8>
            </label>

            <Input
                {...inputProps}
                id={name}
                style={{ fontWeight: "normal" }}
                error={hasError}
                variant="inline"
                placeholder={placeholder ?? "Enter value"}
                {...register}
            />
        </Stack>
    )

}
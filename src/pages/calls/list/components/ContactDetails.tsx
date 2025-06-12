import { DeskproTheme, H2, Stack } from "@deskpro/deskpro-ui";
import ButtonDial from "@/components/ButtonDial";

interface ContactDetailsProps {
    contact: {
        name?: string
        phoneNumbers: string[]
    }
    theme: DeskproTheme
}
export function ContactDetails(props: Readonly<ContactDetailsProps>) {
    const { contact, theme } = props

    return (
        <Stack vertical gap={12} padding={12} style={{ width: "100%" }}>
            <Stack align={"center"} justify={"space-between"} style={{ width: "100%" }}>
                <H2 style={{ fontWeight: 500 }}>{contact.name ?? "No Name Available"}</H2>
            </Stack>

            {contact.phoneNumbers.length > 0 && (
                <Stack vertical gap={8} style={{ width: "100%" }}>
                    {contact.phoneNumbers.map((phone, index) => {
                        return (
                            <ButtonDial
                                theme={theme}
                                number={phone}
                                key={`${phone}-${index}`}
                                width="100%"
                            />
                        )
                    })}
                </Stack>
            )}

        </Stack>
    );
}
import { CallList, ContactDetails } from "./components";
import { ContextData, ContextSettings } from "@/types/deskpro/context";
import { HorizontalDivider, useDeskproAppTheme, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Stack } from "@deskpro/deskpro-ui";
import { useCalls } from "./hooks";
import getDeskproUserFromContext from "@/utils/getDeskproUser";

export default function ListCallsPage() {
    useInitialisedDeskproAppClient((client) => {
        client.setTitle("Aircall")
    }, [])

    useDeskproElements(({ clearElements, registerElement, deRegisterElement }) => {
        clearElements()
        deRegisterElement("home")
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

    const { theme } = useDeskproAppTheme()
    const { context } = useDeskproLatestAppContext<ContextData, ContextSettings>();
    const deskproUser = getDeskproUserFromContext(context?.data)
    const phoneNumbers = deskproUser?.phoneNumbers.map((number) => number.number)
    const { isLoading, calls } = useCalls(phoneNumbers ?? [])

    return (
        <Stack vertical style={{ width: "100%" }}>
            <ContactDetails
                contact={
                    {
                        name: deskproUser?.name ?? "",
                        phoneNumbers: deskproUser?.phoneNumbers.map((phone) => phone.number) ?? []
                    }
                }
                theme={theme}
            />

            <HorizontalDivider style={{ width: "100%" }} />
            <CallList isLoading={isLoading} theme={theme} calls={calls} />
        </Stack>
    )

}
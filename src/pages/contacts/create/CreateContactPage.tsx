import { CreateContactForm } from "./components";
import { useDeskproAppTheme, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useLocation } from "react-router-dom";

export default function CreateContactPage() {
  const { theme } = useDeskproAppTheme()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const phoneNumber = searchParams.get('phoneNumber')

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Create Contact")
  }, [])

  return (
    <CreateContactForm theme={theme} phoneNumber={phoneNumber ?? undefined} />
  )
}
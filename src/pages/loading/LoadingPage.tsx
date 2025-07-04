import { LoadingSpinner, useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { pingAircallApi } from "@/api/auth";
import { Stack } from "@deskpro/deskpro-ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Callout from "@/components/Callout";

export default function LoadingPage() {
  useDeskproElements(({ registerElement, clearElements, deRegisterElement }) => {
    clearElements()
    deRegisterElement("home")
    deRegisterElement("menu")
    registerElement("refresh", { type: "refresh_button" })
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isFetchingAuth, setIsFetchingAuth] = useState<boolean>(true)
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  useInitialisedDeskproAppClient(async (client) => {
    client.setTitle("Aircall")

    const authStatus = await pingAircallApi(client)
    setIsAuthenticated(authStatus)
    setIsFetchingAuth(false)
  }, [])

  if (isFetchingAuth) {
    return (<LoadingSpinner />)
  }

  if (!isAuthenticated) {
    return (
      <Stack padding={12} style={{ width: "100%" }}>
        <Callout
          style={{ width: "100%" }}
          accent="red"
        >
          The Aircall API credentials provided during the app setup process are invalid or expired. Please contact your admin to verify your Aircall API ID & Token and try again.
        </Callout>
      </Stack>
    )
  }

  navigate("/calls")
  return (<LoadingSpinner />)
}
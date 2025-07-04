import { useDeskproAppEvents } from "@deskpro/app-sdk"
import { useNavigate } from "react-router-dom"
import isValidPayload from "../isValidPayload"

export default function useAppNavigation() {
  const navigate = useNavigate()

  useDeskproAppEvents({
    onElementEvent(id, _type, payload) {

      switch (id) {
        case "home":
          void navigate("/calls")
          break
      }

      if (isValidPayload(payload)) {
        switch (payload.type) {
          case "changePath":
            if (payload.path) {
              void navigate(payload.path)
            }
            break
        }
      }
    },
  }, [])
}
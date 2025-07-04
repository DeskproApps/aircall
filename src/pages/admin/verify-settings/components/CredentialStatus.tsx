import { DeskproTheme, Spinner, TSpan } from "@deskpro/deskpro-ui"
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CredentialStatusProps {
  isLoading: boolean
  isValid: boolean | undefined
  theme: DeskproTheme
}

export function CredentialStatus(props: Readonly<CredentialStatusProps>) {
  const { isLoading, isValid, theme } = props

  if (isLoading) {
    return (<TSpan><Spinner size="extra-small" /></TSpan>)
  }

  if (isValid === undefined) {
    return <></>
  }

  return (
    <TSpan style={{
      fontSize: "12px",
      color: isValid ? theme.colors.brandShade100 : theme.colors.red100,
    }}>
      <FontAwesomeIcon icon={isValid ? faCheckCircle : faTimesCircle} />
    </TSpan>
  )

}
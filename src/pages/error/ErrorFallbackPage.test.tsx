import { AircallError } from "@/api/aircallRequest";
import { lightTheme } from "@deskpro/deskpro-ui";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import ErrorFallbackPage from "./ErrorFallbackPage";


function renderErrorPage(error: unknown) {
  const props = {
    error: error,
    componentStack: "test stack",
    eventId: "test-id",
    resetError: () => { },
  };

  return render(
    <ThemeProvider theme={lightTheme}>
      <ErrorFallbackPage {...props} />
    </ThemeProvider>
  )
}

const genericMessage = "An unknown error occurred."

describe("ErrorFallbackPage", () => {
  describe("Invalid Errors", () => {
    it("should render a generic message when non-errors are thrown", () => {
      renderErrorPage({})
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })

    it("should render a generic message when a valid error is thrown with no message", () => {
      renderErrorPage(new Error())
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })

    it("should render a generic message when a valid error is thrown with an empty message", () => {
      renderErrorPage(new Error("         "))
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })
  })

  describe("Errors", () => {
    it("should accurately render valid error messages when they are thrown", () => {
      renderErrorPage(new Error("Testing Aircall"))
      expect(screen.getByText("Testing Aircall")).toBeInTheDocument()
    })
  })

  describe("Aircall Errors", () => {
    it("should prioritise the error troubleshoot if available", () => {
      renderErrorPage(new AircallError("Aircall Error", { statusCode: 0, data: { troubleshoot: "I should be helpful" } }))
      expect(screen.getByText("I should be helpful")).toBeInTheDocument()
    })

    it("should fallback to the error message if troubleshoot isn't a string", () => {
      renderErrorPage(new AircallError("Aircall API Error", { statusCode: 0, data: { troubleshoot: 5173 } }))
      expect(screen.getByText("Aircall API Error")).toBeInTheDocument()
    })

    it("should fallback to the error message if there is no", () => {
      renderErrorPage(new AircallError("Aircall API Error", { statusCode: 0, data: {} }))
      expect(screen.getByText("Aircall API Error")).toBeInTheDocument()
    })

    it("should render the generic error if no troubleshoot is found and the error message is empty", () => {
      renderErrorPage(new AircallError("", { statusCode: 0, data: {} }))
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })
  })

})
import { LoadingSpinner } from "@deskpro/app-sdk";
import { Outlet } from "react-router-dom";
import { Stack } from "@deskpro/deskpro-ui";
import React from "react";
import useCallListener from "./hooks/useCallListener";

export default function CallListener() {
  const { isLoading } = useCallListener()

  if (isLoading) {
    return (
      <Stack align="center" justify="center" style={{ width: "100%" }}>
        <LoadingSpinner />
      </Stack>
    )
  }


  return <Outlet />
}
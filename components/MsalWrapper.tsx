"use client";

import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/utility/msal/authConfig";

if (!msalConfig.auth.clientId || !msalConfig.auth.authority || !msalConfig.auth.redirectUri) {
  throw new Error("MSAL configuration is missing required fields.");
}

const msalInstance = new PublicClientApplication({
  ...msalConfig,
  auth: {
    ...msalConfig.auth,
    clientId: msalConfig.auth.clientId as string,
    authority: msalConfig.auth.authority as string,
    redirectUri: msalConfig.auth.redirectUri as string,
  },
});

const MsalWrapper = ({ children }: { children: React.ReactNode }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default MsalWrapper;

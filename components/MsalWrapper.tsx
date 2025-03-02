"use client"; // <-- this makes it a client component

import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/utility/msal/authConfig";

// Create MSAL instance for client-side
const msalInstance = new PublicClientApplication(msalConfig);

const MsalWrapper = ({ children }: { children: React.ReactNode }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default MsalWrapper;

export const msalConfig = {
	auth: {
		clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
		authority: process.env.NEXT_PUBLIC_MSAL_AUTHORITY,
		redirectUri: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI,
		postLogoutRedirectUri: "http://localhost:8080",
	},
};

export const loginRequest = {
	scopes: ["User.Read", "Calendars.ReadWrite"], // Add other scopes/permissions as needed
};

export const logoutRequest = {
	postLogoutRedirectUri: "http://localhost:8080", // Redirect to home page after logout
};
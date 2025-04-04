export const msalConfig = {
	auth: {
		clientId: "a8a89601-f97b-4b01-8b8a-3c52a28f6e9b",
		authority: "https://login.microsoftonline.com/common",
		redirectUri: "http://localhost:8080",
		postLogoutRedirectUri: "http://localhost:8080",
	},
};

export const loginRequest = {
	scopes: ["User.Read", "Calendars.ReadWrite"], // Add other scopes/permissions as needed
};

export const logoutRequest = {
	postLogoutRedirectUri: "http://localhost:8080", // Redirect to home page after logout
};
export const msalConfig = {
	auth: {
		clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
		authority: process.env.NEXT_PUBLIC_AUTHORITY,
		redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
		postLogoutRedirectUri: "/",
	},
	cache: {
		cacheLocation: "local storage", // Cache location is session storage
		storeAuthStateInCookie: false, // Do not store state in cookie
	},
};

export const loginRequest = {
	scopes: ["User.Read", "Calendars.ReadWrite"], // Add other scopes/permissions as needed
};

export const logoutRequest = {
	postLogoutRedirectUri: "http://localhost:8080/", // Redirect to home page after logout
};
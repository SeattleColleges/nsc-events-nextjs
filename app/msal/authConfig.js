export const API_SCOPE =
	"api://" + NEXT_PUBLIC_MSAL_CLIENT_ID + "/troywashington";

export const msalConfig = {
	auth: {
		clientId: CLIENT_ID,
		authority:
			"https://login.microsoftonline.com/14bdf0b5-9e92-4331-bdae-a65f4df0b5fd",
		redirectUri: "/",
		postLogoutRedirectUri: "/",
		scope: API_SCOPE,
		domain: "localhost",
	},
	cache: {
		// Optional
		cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	},
};

export const loginRequest = {
	scopes: [API_SCOPE],
};

export const userDataLoginRequest = {
	scopes: ["user.read"],
};

export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

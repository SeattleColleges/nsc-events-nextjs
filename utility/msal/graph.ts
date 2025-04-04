export const callMsGraph = async (accessToken: string) => {
	const response = await fetch("https://graph.microsoft.com/v1.0/me", {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	return response.json();
};

export const getUserPhoto = async (accessToken: string) => {
	const response = await fetch(
		"https://graph.microsoft.com/v1.0/me/photo/$value",
		{
			headers: { Authorization: `Bearer ${accessToken}` },
		},
	);

	if (!response.ok) {
		return null; // Return null if no profile picture is available
	}

	const blob = await response.blob();
	return URL.createObjectURL(blob);
};

export const getCalendarEvents = async (accessToken: string) => {
	const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch calendar events");
	}

	const data = await response.json();
	return data.value; // Returns an array of events
};

export const updateCalendarEvent = async (
	accessToken: string,
	eventId: string,
	updatedData: [],
) => {
	const response = await fetch(
		`https://graph.microsoft.com/v1.0/me/events/${eventId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		},
	);

	if (!response.ok) {
		throw new Error("Failed to update the event");
	}

	return await response.json(); // Returns the updated event details
};

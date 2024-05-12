export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // PST is 8 hours behind Coordinated Universal Time (UTC).
    // Therefore, we set hours to 16 since setUTCHours takes
    // absolute hours values from 0-23.
    date.setUTCHours(16, 0, 0, 0);
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    };
    return date.toLocaleString('en-US', options);
}
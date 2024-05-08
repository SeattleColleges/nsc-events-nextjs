export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // 8 hours ahead of Coordinated Universal Time (UTC)
    date.setUTCHours(8, 0, 0, 0);
    const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Los_Angeles', month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleString('en-US', options);
}
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}-${year}`;
}
// decode the current user's Id from localStorage
export const getCurrentUserId = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
        return JSON.parse(atob(token.split(".")[1])).id;
    }
    return null;
}
import {useQuery} from "@tanstack/react-query";
import {ActivityDatabase} from "@/models/activityDatabase";

const getEvents = async(page: any) => {
    const params = new URLSearchParams({
        page: String(page),
        isArchived: String(false),
    });
    const response = await fetch(`http://localhost:3000/api/events?${params.toString()}`);
    return response.json();
}
export function useFilteredEvents(page: any) {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["events", page],
        queryFn: () => getEvents(page),
    });
}
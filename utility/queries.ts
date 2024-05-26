import {useQuery} from "@tanstack/react-query";
import {ActivityDatabase} from "@/models/activityDatabase";

const getEvents = async() => {
    const response = await fetch(`http://localhost:3000/api/events`);
    return response.json();
}
export function useFilteredEvents() {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["events"],
        queryFn: getEvents,
        select: (data: ActivityDatabase[]) => data.filter( event =>
            !(event.isHidden) && !(event.isArchived))?.sort((event1, event2) => {
            return new Date(event1.eventDate).getTime() - new Date(event2.eventDate).getTime();
        }),
    });
}

const getMyEvents = async(userId: string, page: any) => {
    const params = new URLSearchParams({
        page: String(page),
        numEvents: String(5),
    });
    const response = await fetch(`http://localhost:3000/api/events/user/${userId}?${String(params)}`);
    return response.json();
}
export function useMyEvents(userId: string, page: any) {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["myEvents", page],
        queryFn: async () => getMyEvents(userId, page),
    });
}
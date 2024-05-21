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

const getArchivedEvents = async() => {
    const response = await fetch(`http://localhost:3000/api/events?numEvents=0`);
    return response.json();
}
export function useArchivedEvents() {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["events"],
        queryFn: getArchivedEvents,
        select: (data: ActivityDatabase[]) => data.filter(event => event.isArchived)
            ?.sort((event1, event2) => {
            return new Date(event1.eventDate).getTime() - new Date(event2.eventDate).getTime();
        }),
    });
}
import { useQuery } from "@tanstack/react-query";
import { ActivityDatabase } from "@/models/activityDatabase";
import React from "react";

const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
const getEvents = async(page: any, tags: string[]) => {
    const params = new URLSearchParams({
        page: String(page),
        isArchived: String(false),
        tags: String(tags),
    });
    const response = await fetch(`${apiUrl}/events?${params.toString()}`);
    return response.json();
}
export function useFilteredEvents(page: any, isEnabled: boolean, tags: string[] = []) {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["events", page, tags],
        queryFn: () => getEvents(page, tags),
        enabled: isEnabled
    });
}

const getArchivedEvents = async(page: any) => {
    const params = new URLSearchParams({
        page: String(page),
        numEvents: String(5),
        isArchived: String(true)
    });
    const response = await fetch(`${apiUrl}/events?${String(params)}`);
    return response.json();
}
export function useArchivedEvents(page: any, isEnabled: boolean) {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["archivedEvents", page],
        queryFn: async () => getArchivedEvents(page),
        enabled: isEnabled
    });
}

const getMyEvents = async(userId: string, page: any) => {
    const params = new URLSearchParams({
        page: String(page),
        numEvents: String(5),
    });
    const response = await fetch(`${apiUrl}/events/user/${userId}?${String(params)}`);
    return response.json();
}
export function useMyEvents(userId: string, page: any, isEnabled: boolean) {
    return useQuery<ActivityDatabase[], Error>({
        queryKey: ["myEvents", page],
        queryFn: async () => getMyEvents(userId, page),
        enabled: isEnabled
    });
}

const getEventById = async (id: string | null) => {
    const response = await fetch(`${apiUrl}/events/find/${id}`);
    return response.json();
}

export function useEventById(eventId: string | null) {
    return useQuery<ActivityDatabase, Error>({
        queryKey:[eventId],
        queryFn: async () => getEventById(eventId),
    })
}
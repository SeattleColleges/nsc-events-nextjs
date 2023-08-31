"use client";
import { ChangeEventHandler, FormEvent, useState } from "react";
import TagSelector from "@/components/TagSelector"
import { Event } from "@/models/activity";
import activityAutofill from "@/models/activityAutofill";

//test
const CreateEvent = () => {
    const [eventData, setEventData] = useState<Event>(activityAutofill);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setEventData(prevEventData => ({
            ...prevEventData,
            [name]: value
        }));
    };

    const handleTagClick = (tag: string) => {
        setEventData(prevEventData => {
            if (prevEventData.eventTags.includes(tag)) {
                // If the tag is already selected, remove it from the array
                return {
                    ...prevEventData,
                    eventTags: prevEventData.eventTags.filter(t => t !== tag)
                };
            } else {
                // If the tag is not selected, add it to the array
                return {
                    ...prevEventData,
                    eventTags: [...prevEventData.eventTags, tag]
                };
            }
        });
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(eventData);
        createActivity(eventData);

    };

    const createActivity = async (activityData: any) => {
        try {
            const response = await fetch('http://localhost:3000/api/activity/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Activity created:', data);
            } else {
                console.log('Failed to create activity:', response.status);
            }
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };


    return (
        <div className="ml-4">
            <form onSubmit={handleSubmit} className="space-y-4 mr-4">
                <div>
                    <h2 className="text-lg font-bold mt-4">General Information</h2>
                    <div className="space-y-2">
                        <label>
                            Event Title
                            <input name="eventTitle" value={eventData.eventTitle} onChange={handleInputChange}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Category
                            <input name="eventCategory" value={eventData.eventCategory} onChange={handleInputChange}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <div className="space-y-2">
                            <TagSelector selectedTags={eventData.eventTags}
                                         allTags={['Professional Development', 'Social', 'Tech', 'Conference', 'Networking', 'Pizza', 'LGBTQIA']}
                                         onTagClick={handleTagClick}/>

                        </div>
                        {/* Repeat for other fields in the "General Information" group */}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold">Event Schedule</h2>
                    <div className="space-y-2">
                        {/* Add fields for eventDate, eventStartTime, eventEndTime, eventSchedule */}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold">Event Details</h2>
                    <div className="space-y-2">
                        {/* Add fields for eventLocation, eventHost, eventWebsite, eventRegistration, eventCapacity, eventCost, eventSpeakers, eventPrerequisites, eventCancellationPolicy */}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold">Contact & Accessibility</h2>
                    <div className="space-y-2">
                        {/* Add fields for eventContact, eventPrivacy, eventAccessibility */}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold">Event Media</h2>
                    <div className="space-y-2">
                        {/* Add fields for eventCoverPhoto, eventSocialMedia */}
                    </div>
                </div>

                <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">Create
                    Event
                </button>
            </form>
        </div>
    );
};


export default CreateEvent;

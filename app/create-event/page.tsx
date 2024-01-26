"use client";
import { ChangeEventHandler, FormEvent, useState } from "react";
import TagSelector from "@/components/TagSelector"
import { Activity } from "@/models/activity";
import activityAutofill from "@/models/activityAutofill";

//test
const CreateEvent = () => {
    const [eventData, setEventData] = useState<Activity>(activityAutofill);

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
                    <h2 className="text-lg font-bold mt-4">Add Event</h2>
                    <div className="space-y-2">
                        <label>
                            Event Title
                            <input name="eventTitle" value={eventData.eventTitle} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Description
                            <input name="eventDescription" value={eventData.eventDescription} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Category
                            <input name="eventCategory" value={eventData.eventCategory} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Date
                            <input name="eventDate" value={eventData.eventDate} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Start Time
                            <input name="eventStartTime" value={eventData.eventStartTime} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event End Time
                            <input name="eventEndTime" value={eventData.eventEndTime} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Location
                            <input name="eventLocation" value={eventData.eventLocation} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Cover Photo
                            <input name="eventCoverPhoto" value={eventData.eventCoverPhoto} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Host
                            <input name="eventHost" value={eventData.eventHost} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Website
                            <input name="eventWebsite" value={eventData.eventWebsite} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Registration
                            <input name="eventRegistration" value={eventData.eventRegistration} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Capacity
                            <input name="eventCapacity" value={eventData.eventCapacity} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Cost
                            <input name="eventCost" value={eventData.eventCost} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <div className="space-y-2">
                            <TagSelector selectedTags={eventData.eventTags}
                                         allTags={['Professional Development', 'Social', 'Tech', 'Conference', 'Networking', 'Pizza', 'LGBTQIA']}
                                         onTagClick={handleTagClick}/>

                        </div>
                        {/* Repeat for other fields in the "General Information" group */}
                        <label>
                            Event Schedule
                            <input name="eventSchedule" value={eventData.eventSchedule} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Speakers
                            <input name="eventSpeakers" value={eventData.eventSpeakers} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Prerequisites
                            <input name="eventPrerequisites" value={eventData.eventPrerequisites} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Cancellation Policy
                            <input name="eventCancellationPolicy" value={eventData.eventCancellationPolicy} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Contact
                            <input name="eventContact" value={eventData.eventContact} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Facebook
                            <input name="facebook" value={eventData.eventSocialMedia.facebook} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Twitter
                            <input name="twitter" value={eventData.eventSocialMedia.twitter} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Instagram
                            <input name="instagram" value={eventData.eventSocialMedia.instagram} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Hashtag
                            <input name="hashtag" value={eventData.eventSocialMedia.hashtag} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Privacy
                            <input name="eventPrivacy" value={eventData.eventPrivacy} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
                        <label>
                            Event Accessibility
                            <input name="eventAccessibility" value={eventData.eventAccessibility} onChange={handleInputChange} style={{ color: 'black' }}
                                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        </label>
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

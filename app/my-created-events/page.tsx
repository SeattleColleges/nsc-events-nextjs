"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import DateFilter from "./components/DateFilter";
import EventCard from "./components/EventCard2";
import { Box, Container } from "@mui/material";

const MyCreatedEventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Sample event data
  const events = [
    {
      title: "Seattle Center Sculpture Walk 2024-25",
      location: "Seattle Center",
      description: "A walk around Seattle Center's sculptures.",
      date: "2024-08-01",
    },
    {
      title: "Tech Talk: AI Innovations",
      location: "North Seattle College",
      description: "A deep dive into the latest AI innovations.",
      date: "2024-08-02",
    },
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate ? event.date === selectedDate : true;

    return matchesSearch && matchesDate;
  });

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <DateFilter onDateChange={handleDateChange} />
      </Box>

      <div>
        {filteredEvents.length === 0 ? (
          <p>No events found</p>
        ) : (
          filteredEvents.map((event, index) => (
            <EventCard
              key={event.title}
              title={event.title}
              location={event.location}
              description={event.description}
              date={event.date}
            />
          ))
        )}
      </div>
    </Container>
  );
};

export default MyCreatedEventsPage;

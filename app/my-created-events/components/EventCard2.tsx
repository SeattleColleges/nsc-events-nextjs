import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import styles from "./EventCard2.module.css";

interface EventCardProps {
  title: string;
  location: string;
  description: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  location,
  description,
  date,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short", // e.g. "Mon"
    year: "numeric",
    month: "short", // e.g. "Jul"
    day: "numeric",
  });

  return (
    <Card className={styles.cardContainer}>
      <CardContent>
        <Typography variant="h6" className={styles.cardTitle}>
          {title}
        </Typography>
        <Typography variant="body2" className={styles.cardLocation}>
          Location: {location}
        </Typography>
        <Typography variant="body2" className={styles.cardDescription}>
          Description: {description}
        </Typography>
        <Typography variant="body2" className={styles.cardDescription}>
          Date: {date.toString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.cardButton}
        >
          View Event
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;

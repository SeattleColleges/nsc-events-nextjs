import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { formatDate } from "@/utility/dateUtils";
import { ActivityDatabase } from "@/models/activityDatabase";

// declare the event prop that will get passed to the component
interface EventCardProps {
    event: ActivityDatabase;
}

function HomeEventsCard({ event }: EventCardProps) {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSmallLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));


    const { palette } = theme;

    return (
        <Box
            sx={{
                width: (isMobile || isTablet || isSmallLaptop) ? "100vw" : "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    borderRadius: 2,
                    boxShadow: 2,
                    overflow: "hidden",
                    marginLeft: isMobile || isTablet || isSmallLaptop ? 2 : 0,
                    marginRight: isMobile || isTablet || isSmallLaptop ? 2 : 0,
                }}
            >
                {!isMobile && (
                    <CardMedia
                        component="img"
                        image={event.eventCoverPhoto}
                        alt={event.eventTitle}
                        sx={{
                            height: 250, // fixed height of the image
                            objectFit: "cover",
                            marginBlock: 2,
                            marginLeft: 2,
                            minWidth: 100,
                            maxWidth: 200,
                        }}
                    />
                )}

                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        gap: 2,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 2,
                            flexWrap: "wrap",
                            minWidth: 0, // prevent overflow from children
                        }}
                    >
                        <Box sx={{ flex: 1, minWidth: 0 }}> {/* prevent overflow from children */}
                            <Link
                                key={event._id}
                                href={{ 
                                    pathname: "/event-detail", 
                                    query: { id: event._id } 
                                }}
                                style={{ textDecoration: "none", display: "block" }} // prevent underline on header
                            >
                                <Box
                                    sx={{
                                        backgroundColor: palette.primary.dark,
                                        color: palette.primary.contrastText,
                                        borderRadius: 1,
                                        px: 2,
                                        py: 1,
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={500}
                                        fontFamily="font-serif"
                                        sx={{
                                            whiteSpace: "normal",
                                            overflowWrap: "break-word",
                                            wordBreak: "break-word",
                                            lineHeight: 1.3,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2, // clamp to 2 lines, adjust if necessary
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxHeight: "3.5rem", // roughly 2 lines
                                        }}
                                    >
                                        {event.eventTitle}
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>

                        <Box
                            sx={{
                                backgroundColor: palette.secondary.light,
                                width: 60,
                                height: 60,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: 20,
                                textAlign: "center",
                                flexShrink: 0, // prevents the date box from shrinking
                            }}
                        >
                            {new Date(event.eventDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                timeZone: "UTC",
                            })}
                        </Box>
                    </Box>

                    <Box>
                        <Typography fontFamily="font-serif">
                            <strong>Location:</strong> {event.eventLocation}
                        </Typography>
                        <Typography fontFamily="font-serif">
                            <strong>Start Time:</strong> {event.eventStartTime}
                            <br />
                            <strong>End Time:</strong> {event.eventEndTime}
                        </Typography>

                        <Typography
                            fontFamily="font-serif"
                            mt={1}
                            sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3, // adjust if necessary
                                overflow: "hidden",
                                textOverflow: "ellipsis",  
                                height: "4.5rem", // fixed height for 3 lines
                                wordBreak: "break-word", // allow word wrapping
                            }}
                        >
                            {event.eventDescription}
                        </Typography>
                    </Box>

                    <Box mt="auto">
                        <Typography>
                            Tags:
                            {event.eventTags.map((tag, index) => (
                                <Box
                                    key={index}
                                    component="span"
                                    sx={{
                                        backgroundColor: palette.secondary.light,
                                        borderRadius: 1,
                                        px: 1,
                                        py: 0.5,
                                        ml: 1,
                                        fontSize: 10,
                                        height: 20,
                                        fontWeight: "bold",
                                        display: "inline-block",
                                    }}
                                >
                                    {tag}
                                </Box>
                            ))}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default HomeEventsCard;




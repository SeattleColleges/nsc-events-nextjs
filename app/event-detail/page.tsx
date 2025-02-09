"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";

const EventDetailPage: React.FC = () => {
  const { isAuth, user } = useAuth(); // 

  return (
    <div>
      {isAuth && user ? `Welcome, ${user.role}` : "Not authenticated"}
    </div>
  );
};

//  Explicitly set display name to fix ESLint warning
EventDetailPage.displayName = "EventDetailPage";

export default EventDetailPage;


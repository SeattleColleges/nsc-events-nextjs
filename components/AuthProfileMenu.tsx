"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AuthProfileMenu() {
  const {data, status} = useSession();

  const isAuth = status === "authenticated";

  if (isAuth) {
    return (
        <div className="flex items-center justify-center">
            <a href="/profile" className="hover:underline">Hi {data?.user?.name},</a>
            <a className="ml-3 hover:underline" href="/create-event">Create Event</a>
            <button className="ml-3 hover:underline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
        </div>
    );
  }
}
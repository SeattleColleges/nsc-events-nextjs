import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center max-w-screen-lg mx-auto px-5 py-2 shadow-md justify-between mt-4 rounded">
      <Link href="/">Home</Link>      
    </nav>
  )
};
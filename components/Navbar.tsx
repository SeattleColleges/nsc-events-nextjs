import Profile from "@/app/profile/page";
import Link from "next/link";
import React from "react";
import AuthProfileMenu from "./AuthProfileMenu";
import Image from 'next/image';
import logo from '../app/logo.png';

export default function Navbar() {
  return (
    <nav className="flex items-center max-w-screen-lg mx-auto px-5 py-2 shadow-md justify-between mt-2 mb-2 rounded">
      <a href="/"><Image src={logo} alt="logo" width={40} height={40}/></a>
      <Link href="/">Home</Link>
      <AuthProfileMenu />      
    </nav>
  )
};

// comment to trigger CI
"use client";

import InputField from "@/components/InputFields";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import Router, { useRouter } from "next/navigation";

// similar to sign-up page, but we're only handling email and password 
const Signin = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // handle form submission logic. Import signIn from next-auth react
    // since we're using email and password, we need to pass in credentials option
    const res = await signIn("credentials", {
      email, 
      password,
      // this prevents the defualt redirect and it's needed to render error message coming from backend
      redirect: false,
    });

    // check if the response contains an error and update error state if necessary
    if (res?.error) return setError(res.error);
    // if no error, we've successfully signed in, then we'll route user to their profile
    router.replace("/profile")
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="w-1/3" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button 
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit">Sign Up</button>
      </form>
    </div>
  )
};

export default Signin;
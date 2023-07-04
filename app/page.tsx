import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"/>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
            Sign In
          </button>
        </form>
        <p className="text-center">
          <a href="/api/auth/forgot-password" className="text-blue-500 underline font-bold">
            Forgot Password
          </a>
        </p>
        <p className="text-center">
          <a href="/api/auth/sign-up" className="text-blue-500 underline font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

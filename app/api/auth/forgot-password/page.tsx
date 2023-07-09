'use client';
import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4">Forgot Password</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter your email"/>
            </div>
            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

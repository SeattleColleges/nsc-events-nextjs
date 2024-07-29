/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { 
  // Double check which to comment out
    // TODO: PULL THIS FROM GITHUB ACTIONS
    // NSC_EVENTS_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,// Connects locally
    NSC_EVENTS_PUBLIC_API_URL: "https://northseattlecollegeevents.com/api",
  },
}

module.exports = nextConfig

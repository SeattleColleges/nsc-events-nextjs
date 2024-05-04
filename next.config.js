/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // TODO: PULL THIS FROM GITHUB ACTIONS
    NSC_EVENTS_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // NSC_EVENTS_PUBLIC_API_URL: "https://northseattlecollegeevents.com/api",
  },
}

module.exports = nextConfig

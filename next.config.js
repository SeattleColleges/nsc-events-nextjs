/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { 
    // TODO: PULL THIS FROM GITHUB ACTIONS
    NSC_EVENTS_PUBLIC_API_URL: process.env.API_URL,// Connects locally
  },
}

module.exports = nextConfig

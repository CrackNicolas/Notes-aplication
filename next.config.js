/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_cHJldHR5LWtpdGUtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA",
        CLERK_SECRET_KEY: "sk_test_20kfVy7gI6MgWd9kLV7pwnqbn9aoizSunTu5dM1ZCi",
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/sign-up",
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/",
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: "/"
    }
}

module.exports = nextConfig

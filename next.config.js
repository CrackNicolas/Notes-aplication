/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname:'img.clerk.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_cHJldHR5LWtpdGUtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA",
        CLERK_SECRET_KEY: "sk_test_20kfVy7gI6MgWd9kLV7pwnqbn9aoizSunTu5dM1ZCi",
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/",
        CLOUDINARY_CLOUD_NAME: "cracknicolas",
        CLOUDINARY_API_KEY: "716978288343629",
        CLOUDINARY_API_SECRET: "b0SkQa2gfooFNsGMO5yDNgMBaIM"
    }
}

module.exports = nextConfig

import { AuthConfig } from "convex/server";

const clerkDomain = process.env.CLERK_JWT_ISSUER_DOMAIN;

if (!clerkDomain) {
  throw new Error(
    "Missing required environment variable: CLERK_JWT_ISSUER_DOMAIN. " +
    "Please add it to your .env file."
  );
}



export default {
  providers: [
    {
      domain: clerkDomain,
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;
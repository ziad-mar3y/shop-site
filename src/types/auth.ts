import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    token: string;
  }
}

export type AuthSession = DefaultSession & {
  token: string;
}

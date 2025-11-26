import { SessionOptions } from "iron-session";

export interface SessionData {
  user?: AuthUser | null;
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  restaurantId: string | null;
  branchId: string | null;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}

export interface ClientSessionData {
  user?: ClientAuthUser | null;
}

export type ClientAuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  restaurantId: string | null;
  branchId: string | null;
};

export const clientSessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "client_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData extends ClientSessionData {}
}

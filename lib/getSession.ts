import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  sessionOptions,
  SessionData,
  clientSessionOptions,
  ClientSessionData,
} from "./session";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export async function getAuth(
  allowedRoles?: string[],
  redirectUrl: string = "/"
) {
  console.log("Get Auth - ", allowedRoles, redirectUrl);
  const session = await getSession();

  if (!session.user) {
    console.log("No session user");

    redirect(`/auth/dashboard/login?redirect=${redirectUrl}`);
  }

  if (allowedRoles && !allowedRoles.includes(session.user!.role)) {
    throw new Error("Forbidden");
  }

  console.log("Session user - ", session.user);

  return session?.user;
}

// Client
export async function getClientSession() {
  const session = await getIronSession<ClientSessionData>(
    cookies(),
    clientSessionOptions
  );
  return session;
}

export async function getClientAuth(redirectUrl: string = "/") {
  console.log("Get Client Auth - ", redirectUrl);
  const session = await getClientSession();

  if (!session.user) {
    console.log("No session user");

    redirect(`/auth/login?redirect=${redirectUrl}`);
  }

  console.log("Client Session user - ", session.user);

  return session?.user;
}

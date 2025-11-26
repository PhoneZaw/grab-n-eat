import PasswordEditForm from "./passwordEditForm";
import PersonalInformationEditForm from "./personalInformationEditForm";
import { getAuth, getSession } from "@/lib/getSession";

export default async function Profile() {
  var user = await getAuth(["ADMIN", "OWNER", "MANAGER"], "/dashboard/profile");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[1fr] lg:grid-cols-[1fr]">
          <div className="grid gap-6">
            <PersonalInformationEditForm data={user} />
            <PasswordEditForm email={user.email} />
          </div>
        </div>
      </main>
    </div>
  );
}

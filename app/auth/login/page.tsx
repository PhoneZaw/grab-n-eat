import LoginForm from "./form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  var redirectUrl = searchParams["redirect"] as string | undefined;

  return (
    <div className="h-screen grid place-items-center">
      <LoginForm redirectUrl={redirectUrl ?? "/"} />
    </div>
  );
}

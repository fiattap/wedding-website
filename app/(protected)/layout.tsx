import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasAccess = cookies().get("site-access")?.value === "true";

  if (!hasAccess) {
    redirect("/");
  }

  return <>{children}</>;
}
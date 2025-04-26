import { getServerSession } from "next-auth";
import { authOptions } from  "../lib/Auth.ts" 
import { redirect } from "next/navigation";

interface SessionAuthProps {
  children: React.ReactNode;
}

export default async function SessionAuth({ children }: SessionAuthProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/Auth/Signup");
  }

  return <>{children}</>;
}


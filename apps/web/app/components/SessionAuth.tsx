// app/components/SessionAuth.tsx
import { getServerSession } from "next-auth";
import { authOptions } from  "../lib/Auth.ts" // Adjust path
import { redirect } from "next/navigation"; // <-- Correct import

interface SessionAuthProps {
  children: React.ReactNode;
}

export default async function SessionAuth({ children }: SessionAuthProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/Auth/Signup"); // If no session, redirect to login page
  }

  return <>{children}</>;
}


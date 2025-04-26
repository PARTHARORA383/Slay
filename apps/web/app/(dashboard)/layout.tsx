// app/(dashboard)/layout.tsx

import SessionAuth from "../components/SessionAuth.tsx";
import { Sidebar } from "../components/Sidebar.tsx";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
   <>
    <SessionAuth>

      <Sidebar />
      <main className="">{children}</main>
    </SessionAuth>
   </>
  
  );
}

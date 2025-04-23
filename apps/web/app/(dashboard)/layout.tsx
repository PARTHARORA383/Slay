// app/(dashboard)/layout.tsx

import { Sidebar } from "../components/Sidebar.tsx";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
   <>
    
      <Sidebar />

      <main className="">{children}</main>
   </>
  
  );
}

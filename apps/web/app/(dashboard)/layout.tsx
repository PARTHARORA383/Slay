// app/(dashboard)/layout.tsx

import { Sidebar } from "../components/Sidebar.tsx";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
    
      <Sidebar />

      <main className="flex-1 ml-[250px] p-4">{children}</main>
    </div>
  );
}

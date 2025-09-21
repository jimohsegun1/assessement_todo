import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/header";
import KanbanBoard  from "@/components/dashboard";
import { Todo3DExperience } from "@/components/threejs3D";
// import Todo3DExperience from "@/components/threejs3D";


export default function Home() {
  return (
    <main className="h-screen flex overflow-hidden">
      <Todo3DExperience />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <div className="flex-1 overflow-auto">
          <KanbanBoard />
        </div>
      </div>
    </main>
  );
}

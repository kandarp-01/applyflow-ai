import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children
}) {

  return (

    <div
      className="
    flex min-h-screen
    bg-slate-50 text-slate-900
    dark:bg-slate-950 dark:text-white
    transition-colors duration-300
  "
    >

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>
  );
}

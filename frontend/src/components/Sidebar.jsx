import {
  LayoutDashboard,
  Briefcase,
  FileSearch,
  LogOut,
} from "lucide-react";

import {
  NavLink
} from "react-router-dom";

export default function Sidebar() {

  const navItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Applications",
      path: "/applications",
      icon: Briefcase,
    },

    {
      name: "Resume Match",
      path: "/resume-match",
      icon: FileSearch,
    },
  ];

  return (

    <aside
      className="
  hidden md:flex
  w-72 flex-col

  border-r border-slate-200
  bg-white/70

  dark:border-white/10
  dark:bg-white/5

  backdrop-blur-xl
  transition-colors duration-300
"
    >

      {/* Logo */}

      <div
        className="
          px-8 py-8
          text-2xl font-bold
        "
      >

        <span
          className="
            bg-gradient-to-r
            from-cyan-400
            to-violet-500
            bg-clip-text
            text-transparent
          "
        >
          ApplyFlow AI
        </span>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4">

        <div className="space-y-2">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}

                className={({ isActive }) => `

                  flex items-center gap-4
                  rounded-2xl px-5 py-4
                  transition-all duration-300

                  ${isActive
                    ? `
                      bg-gradient-to-r
                      from-cyan-500/20
                      to-violet-500/20
                      text-white
                      shadow-lg
                    `
                    : `
                      text-slate-400
                      hover:bg-white/5
                      hover:text-white
                    `
                  }
                `}
              >

                <Icon size={22} />

                <span className="font-medium">
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* Logout */}

      <div className="p-4">

        <button
          className="
            flex w-full items-center gap-3
            rounded-2xl
            border border-white/10
            px-5 py-4
            text-slate-400
            transition-all duration-300

            hover:bg-red-500/10
            hover:text-red-400
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

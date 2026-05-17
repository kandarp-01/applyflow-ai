export default function RecentApplications({

  applications

}) {

  const getStatusColor = (status) => {

    switch (status.toLowerCase()) {

      case "applied":

        return `
          bg-cyan-500/10
          text-cyan-400
        `;

      case "interview":

        return `
          bg-violet-500/10
          text-violet-400
        `;

      case "offer":

        return `
          bg-emerald-500/10
          text-emerald-400
        `;

      case "rejected":

        return `
          bg-rose-500/10
          text-rose-400
        `;

      default:

        return `
          bg-slate-500/10
          text-slate-400
        `;
    }
  };

  return (

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >

      {/* Heading */}

      <div className="mb-6">

        <h3 className="text-2xl font-semibold">
          Recent Applications
        </h3>

        <p className="mt-1 text-slate-400">
          Latest application activity
        </p>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
                border-b border-white/10
                text-left text-slate-400
              "
            >

              <th className="pb-4 font-medium">
                Company
              </th>

              <th className="pb-4 font-medium">
                Role
              </th>

              <th className="pb-4 font-medium">
                Status
              </th>

              <th className="pb-4 font-medium">
                Location
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((app) => (

              <tr

                key={app.id}

                className="
                  border-b border-white/5
                  transition-all duration-300

                  hover:bg-white/5
                "
              >

                <td className="py-5 font-medium">
                  {app.company}
                </td>

                <td className="py-5 text-slate-300">
                  {app.role}
                </td>

                <td className="py-5">

                  <span
                    className={`
                      rounded-xl
                      px-3 py-1
                      text-sm font-medium

                      ${getStatusColor(app.status)}
                    `}
                  >

                    {app.status}

                  </span>

                </td>

                <td className="py-5 text-slate-400">
                  {app.location}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

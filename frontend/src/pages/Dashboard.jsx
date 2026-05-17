import {

  useEffect,
  useState

} from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import RecentApplications from "../components/RecentApplications";
import AddApplicationModal from "../components/AddApplicationModal";
import StatsCard from "../components/StatsCard";

import StatusChart from "../components/StatusChart";

import api from "../services/api";

import {

  Briefcase,
  Clock3,
  BadgeCheck,
  XCircle

} from "lucide-react";

export default function Dashboard() {

  const [stats, setStats] = useState(null);

  const [distribution, setDistribution] =
    useState(null);
    const [recentApplications, setRecentApplications] =
  useState([]);
  const [openModal, setOpenModal] =
  useState(false);

  useEffect(() => {

    fetchStats();
    fetchDistribution();
    fetchRecentApplications();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await api.get(
        "/dashboard/stats"
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchDistribution = async () => {

    try {

      const response = await api.get(
        "/dashboard/status-distribution"
      );

      setDistribution(response.data);

    } catch (error) {

      console.error(error);
    }
  };
  const fetchRecentApplications = async () => {

  try {

    const response = await api.get(
      "/dashboard/recent-applications"
    );

    setRecentApplications(
      response.data
    );

  } catch (error) {

    console.error(error);
  }
};

  return (

    <DashboardLayout>

      {/* Heading */}

      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          Dashboard Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Track your job applications and progress.
        </p>

      </div>
      <div className="mb-8 flex justify-end">

  <button

    onClick={() => setOpenModal(true)}

    className="
      rounded-2xl

      bg-gradient-to-r
      from-cyan-500
      to-violet-500

      px-6 py-3

      font-semibold
      text-white

      transition-all duration-300

      hover:scale-105
    "
  >

    + Add Application

  </button>

</div>

      {/* Loading */}

      {!stats && (

        <p className="text-slate-400">
          Loading dashboard...
        </p>
      )}

      {/* Stats Cards */}

      {stats && (

        <div
          className="
            grid gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatsCard
            title="Total Applications"

            value={stats.total_applications}

            icon={
              <Briefcase size={28} />
            }

            gradient="
              bg-gradient-to-br
              from-cyan-500/20
              to-cyan-900/10
            "
          />

          <StatsCard
            title="Applied"

            value={stats.applied}

            icon={
              <Clock3 size={28} />
            }

            gradient="
              bg-gradient-to-br
              from-violet-500/20
              to-violet-900/10
            "
          />

          <StatsCard
            title="Interviews"

            value={stats.interviews}

            icon={
              <BadgeCheck size={28} />
            }

            gradient="
              bg-gradient-to-br
              from-emerald-500/20
              to-emerald-900/10
            "
          />

          <StatsCard
            title="Rejected"

            value={stats.rejected}

            icon={
              <XCircle size={28} />
            }

            gradient="
              bg-gradient-to-br
              from-rose-500/20
              to-rose-900/10
            "
          />

        </div>
      )}

      {/* Chart */}

      {distribution && (

        <div className="mt-10">

          <StatusChart
            data={distribution}
          />

        </div>
      )}

      {recentApplications.length > 0 && (

  <div className="mt-10">

    <RecentApplications
      applications={recentApplications}
    />

  </div>
)}
{openModal && (

  <AddApplicationModal

    onClose={() =>
      setOpenModal(false)
    }

    onSuccess={() => {

      fetchStats();

      fetchDistribution();

      fetchRecentApplications();
    }}
  />
)}

    </DashboardLayout>
  );
}

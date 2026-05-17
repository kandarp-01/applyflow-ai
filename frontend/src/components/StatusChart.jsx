import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

  ResponsiveContainer

} from "recharts";

const COLORS = [

  "#06b6d4",

  "#8b5cf6",

  "#10b981",

  "#f43f5e"
];

export default function StatusChart({

  data
}) {

  const chartData = Object.entries(data).map(

    ([name, value]) => ({

      name,

      value
    })
  );

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

      <div className="mb-6">

        <h3 className="text-2xl font-semibold">
          Application Status
        </h3>

        <p className="mt-1 text-slate-400">
          Track application progress
        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie

              data={chartData}

              dataKey="value"

              nameKey="name"

              innerRadius={70}

              outerRadius={120}

              paddingAngle={5}
            >

              {chartData.map((entry, index) => (

                <Cell

                  key={index}

                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

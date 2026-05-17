import { motion } from "framer-motion";

export default function StatsCard({

  title,
  value,
  icon,
  gradient

}) {

  return (

    <motion.div

      whileHover={{
        y: -5,
        scale: 1.02
      }}

      transition={{
        duration: 0.2
      }}

      className={`
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        p-6

        backdrop-blur-xl

        ${gradient}
      `}
    >

      {/* Glow */}

      <div
        className="
          absolute inset-0
          bg-white/5
          opacity-40
        "
      />

      <div className="relative z-10">

        {/* Top */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-300">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {value}
            </h2>

          </div>

          <div
            className="
              rounded-2xl
              bg-white/10
              p-4
            "
          >

            {icon}

          </div>

        </div>

      </div>

    </motion.div>
  );
}

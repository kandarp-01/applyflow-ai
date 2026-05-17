import {

  useState

} from "react";

import {

  motion

} from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

export default function ResumeMatch() {

  const [jobDescription, setJobDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await api.post(

        "/resume/match",

        {
          job_description:
            jobDescription
        }
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <DashboardLayout>

      {/* Heading */}

      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          Resume Match Analyzer
        </h2>

        <p className="mt-2 text-slate-400">
          Compare your skills with job descriptions
        </p>

      </div>

      {/* Form */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
          rounded-3xl
          border border-white/10
          bg-white/5

          p-8

          backdrop-blur-xl
        "
      >

        <form
          onSubmit={handleSubmit}
        >

          <textarea

            rows="10"

            placeholder="
Paste complete job description here...
            "

            value={jobDescription}

            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }

            className="
              w-full rounded-3xl

              border border-white/10
              bg-slate-900/60

              p-5

              text-white
              outline-none

              placeholder:text-slate-500

              focus:border-cyan-400
            "
          />

          <button

            disabled={loading}

            className="
              mt-6 rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-violet-500

              px-8 py-3

              font-semibold
              text-white

              transition-all duration-300

              hover:scale-105
            "
          >

            {loading
              ? "Analyzing..."
              : "Analyze Match"
            }

          </button>

        </form>

      </motion.div>

      {/* Result */}

      {result && (

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="
            mt-10

            rounded-3xl
            border border-white/10
            bg-white/5

            p-8

            backdrop-blur-xl
          "
        >

          {/* Match Percentage */}

          <div className="mb-10 text-center">

            <h3 className="text-2xl font-semibold">

              Match Score

            </h3>

            <div
              className="
                mt-6 inline-flex

                h-40 w-40
                items-center justify-center

                rounded-full

                border-8 border-cyan-400/30

                text-5xl font-bold
              "
            >

              {result.match_percentage}%

            </div>

          </div>

          {/* Skills Grid */}

          <div
            className="
              grid gap-8
              md:grid-cols-2
            "
          >

            {/* Matched */}

            <div>

              <h4
                className="
                  mb-4 text-xl font-semibold
                  text-emerald-400
                "
              >

                Matched Skills

              </h4>

              <div className="flex flex-wrap gap-3">

                {result.matched_skills.map(
                  (skill) => (

                    <span

                      key={skill}

                      className="
                        rounded-2xl

                        bg-emerald-500/10

                        px-4 py-2

                        text-sm
                        text-emerald-400
                      "
                    >

                      {skill}

                    </span>
                  )
                )}

              </div>

            </div>

            {/* Missing */}

            <div>

              <h4
                className="
                  mb-4 text-xl font-semibold
                  text-rose-400
                "
              >

                Missing Skills

              </h4>

              <div className="flex flex-wrap gap-3">

                {result.missing_skills.map(
                  (skill) => (

                    <span

                      key={skill}

                      className="
                        rounded-2xl

                        bg-rose-500/10

                        px-4 py-2

                        text-sm
                        text-rose-400
                      "
                    >

                      {skill}

                    </span>
                  )
                )}

              </div>

            </div>

          </div>

        </motion.div>
      )}

    </DashboardLayout>
  );
}

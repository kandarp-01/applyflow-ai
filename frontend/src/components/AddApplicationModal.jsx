import {

  useState

} from "react";

import {

  motion

} from "framer-motion";

import api from "../services/api";

export default function AddApplicationModal({

  onClose,

  onSuccess

}) {

  const [formData, setFormData] = useState({

    company: "",

    role: "",

    status: "Applied",

    location: "",

    job_link: "",

    notes: ""
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await api.post(

        "/applications/",

        formData
      );

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center

        bg-black/60
        backdrop-blur-md

        px-4
      "
    >

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.9
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          duration: 0.25
        }}

        className="
          w-full max-w-2xl

          rounded-3xl
          border border-white/10
          bg-slate-900/90

          p-8

          shadow-2xl
        "
      >

        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Add Application
          </h2>

          <p className="mt-2 text-slate-400">
            Track a new job application
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Grid */}

          <div
            className="
              grid gap-5
              md:grid-cols-2
            "
          >

            {/* Company */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">

                Company

              </label>

              <input
                type="text"

                name="company"

                required

                value={formData.company}

                onChange={handleChange}

                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5

                  px-4 py-3

                  text-white
                  outline-none

                  focus:border-cyan-400
                "
              />

            </div>

            {/* Role */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">

                Role

              </label>

              <input
                type="text"

                name="role"

                required

                value={formData.role}

                onChange={handleChange}

                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5

                  px-4 py-3

                  text-white
                  outline-none

                  focus:border-violet-400
                "
              />

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">

                Status

              </label>

              <select

                name="status"

                value={formData.status}

                onChange={handleChange}

                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5

                  px-4 py-3

                  text-white
                  outline-none
                "
              >

                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

            {/* Location */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">

                Location

              </label>

              <input
                type="text"

                name="location"

                value={formData.location}

                onChange={handleChange}

                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5

                  px-4 py-3

                  text-white
                  outline-none
                "
              />

            </div>

          </div>

          {/* Job Link */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">

              Job Link

            </label>

            <input
              type="url"

              name="job_link"

              value={formData.job_link}

              onChange={handleChange}

              className="
                w-full rounded-2xl
                border border-white/10
                bg-white/5

                px-4 py-3

                text-white
                outline-none
              "
            />

          </div>

          {/* Notes */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">

              Notes

            </label>

            <textarea

              rows="4"

              name="notes"

              value={formData.notes}

              onChange={handleChange}

              className="
                w-full rounded-2xl
                border border-white/10
                bg-white/5

                px-4 py-3

                text-white
                outline-none
              "
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">

            <button

              type="button"

              onClick={onClose}

              className="
                rounded-2xl
                border border-white/10

                px-6 py-3

                text-slate-300

                hover:bg-white/5
              "
            >

              Cancel

            </button>

            <button

              disabled={loading}

              className="
                rounded-2xl

                bg-gradient-to-r
                from-cyan-500
                to-violet-500

                px-6 py-3

                font-semibold
                text-white

                hover:scale-105

                transition-all
              "
            >

              {loading
                ? "Saving..."
                : "Save Application"
              }

            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
}

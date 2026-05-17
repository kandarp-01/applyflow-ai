import {

  useState

} from "react";

import {

  motion

} from "framer-motion";

import {

  Link,

  useNavigate

} from "react-router-dom";

import {

  Mail,

  Lock

} from "lucide-react";

import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const form = new URLSearchParams();

      form.append(
        "username",
        formData.email
      );

      form.append(
        "password",
        formData.password
      );

      const response = await api.post(

        "/login",

        form,

        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          }
        }
      );

      localStorage.setItem(

        "token",

        response.data.access_token
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden

        bg-slate-950
        px-4
      "
    >

      {/* Background Glow */}

      <div
        className="
          absolute left-20 top-20
          h-72 w-72
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />

      <div
        className="
          absolute bottom-10 right-10
          h-80 w-80
          rounded-full
          bg-violet-500/20
          blur-3xl
        "
      />

      {/* Card */}

      <motion.div

        initial={{
          opacity: 0,
          y: 30
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}

        className="
          relative z-10
          w-full max-w-md

          rounded-3xl
          border border-white/10
          bg-white/5

          p-8

          shadow-2xl
          backdrop-blur-2xl
        "
      >

        {/* Heading */}

        <div className="mb-8 text-center">

          <h1
            className="
              bg-gradient-to-r
              from-cyan-400
              to-violet-500

              bg-clip-text
              text-4xl font-bold
              text-transparent
            "
          >
            ApplyFlow AI
          </h1>

          <p className="mt-3 text-slate-400">

            Smart job tracking platform

          </p>

        </div>

        {/* Error */}

        {error && (

          <div
            className="
              mb-5 rounded-2xl
              border border-red-500/20
              bg-red-500/10
              px-4 py-3
              text-sm text-red-400
            "
          >

            {error}

          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label
              className="
                mb-2 block
                text-sm text-slate-300
              "
            >
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                name="email"

                value={formData.email}

                onChange={handleChange}

                required

                placeholder="Enter your email"

                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5

                  py-3 pl-12 pr-4

                  text-white
                  outline-none

                  transition-all duration-300

                  placeholder:text-slate-500

                  focus:border-cyan-400
                  focus:ring-2
                  focus:ring-cyan-400/20
                "
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label
              className="
                mb-2 block
                text-sm text-slate-300
              "
            >
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="password"

                name="password"

                value={formData.password}

                onChange={handleChange}

                required

                placeholder="Enter password"

                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5

                  py-3 pl-12 pr-4

                  text-white
                  outline-none

                  transition-all duration-300

                  placeholder:text-slate-500

                  focus:border-violet-400
                  focus:ring-2
                  focus:ring-violet-400/20
                "
              />

            </div>

          </div>

          {/* Button */}

          <button

            disabled={loading}

            className="
              w-full rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-violet-500

              py-3
              font-semibold
              text-white

              transition-all duration-300

              hover:scale-[1.02]
              hover:shadow-lg

              disabled:opacity-50
            "
          >

            {loading
              ? "Signing In..."
              : "Sign In"
            }

          </button>

        </form>

        {/* Footer */}

        <p
          className="
            mt-6 text-center
            text-sm text-slate-400
          "
        >

          Don’t have an account?{" "}

          <Link

            to="/register"

            className="
              text-cyan-400
              hover:text-cyan-300
            "
          >

            Create Account

          </Link>

        </p>

      </motion.div>

    </div>
  );
}

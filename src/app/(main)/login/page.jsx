"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import ForgotPasswordModal from "@/components/Forgotpassword";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const router = useRouter();

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("CLIENT");
  const [provider, setProvider] = useState({
    username: "",
    password: "",
    loginFor: "CLIENT",
    siteUrl: "",
    callbackUrl: "",
  });

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await axios.get("/api/admin/site-settings");
        if (res.status === 200 && res.data[0]) {
          setProvider((prev) => ({
            ...prev,
            siteUrl: res?.data[0]?.siteurl,
            callbackUrl: res?.data[0]?.callbackurl,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch site settings", error);
      }
    };
    fetchSiteData();
  }, []);

  useEffect(() => {
    setProvider((prev) => ({
      ...prev,
      loginFor: selectedRole === "ADMIN" ? "ARN" : selectedRole,
    }));
  }, [selectedRole]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/login/arn-login`,
        provider
      );
      if (res.data.status === true) {
        router.push(res.data.url);
      } else {
        setError(res.data.msg);
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="main-section">
      <div className="max-w-screen-2xl mx-auto px-2">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[600px] rounded-3xl overflow-hidden shadow-lg">
          {/* Left: Login Form */}
          <div className="flex flex-col justify-center p-8 md:p-16 bg-gradient-to-br from-[var(--rv-primary)]  to-[var(--rv-forth)]">
            <div className="max-w-md w-full mx-auto">
              <h2 className={`${styles.title} `}>Welcome Back</h2>
              <p className={`${styles.subtitle} text-[#111] mb-3`}>
                Every Investment, A Step Closer to Your Dreams
              </p>
              <p className={`${styles.subtitle} text-gray-300 mb-6`}>
                LOG IN TO ACCESS YOUR DASHBOARD.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={`${styles.input}`}
                >
                  <option value="CLIENT">Client</option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="ADVISOR">Admin</option>
                  <option value="BROKER">Broker</option>
                  <option value="BRANCH">Branch</option>
                </select>
                <input
                  type="text"
                  placeholder="Username"
                  value={provider.username}
                  onChange={(e) =>
                    setProvider({ ...provider, username: e.target.value })
                  }
                  className={`${styles.input}`}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={provider.password}
                  onChange={(e) =>
                    setProvider({ ...provider, password: e.target.value })
                  }
                  className={`${styles.input}`}
                />
                <div className="flex justify-end text-xs text-gray-600">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[var(--rv-secondary)] underline"
                  >
                    Forgot your password?
                  </button>
                </div>
                {error && <div className="text-red-600 text-xs">{error}</div>}
                <button
                  type="submit"
                  className={`${styles.submitBtn}`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="text-center mt-6 text-sm text-gray-300">
                Don’t have an account?{" "}
                <Link
                  href="/contact-us"
                  className="underline text-[var(--rv-secondary)]"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
          {/* Right: Background Image & Overlays */}
          <div className={`${styles.rightSection} relative hidden md:grid`}>
            <img
              src="/images/login-page.webp"
              alt="Team Collaboration"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className={`${styles.overlay}`}>
              {/* Optional task card, uncomment if needed */}
              {/* <div className={styles.taskCard}>
      Strategy Session <br /><span>10:00am–10:30am</span>
    </div> */}

              <div className={styles.meetingCard}>
                <div className={styles.avatars}>
                  <img
                    className={styles.avatar}
                    src="/images/avatar1.png"
                    alt="A"
                  />
                  <img
                    className={styles.avatar}
                    src="/images/avatar2.png"
                    alt="B"
                  />
                  <img
                    className={styles.avatar}
                    src="/images/avatar3.png"
                    alt="C"
                  />
                </div>
                {/* <div className={styles.meetingText}>
        Daily Standup <br /><span>12:00pm–1:00pm</span>
      </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        logintype={selectedRole === "ADMIN" ? "ARN" : selectedRole}
      />
    </section>
  );
};

export default LoginPage;

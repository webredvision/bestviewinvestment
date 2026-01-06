"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Contact.module.css";

export default function ContactReusableForm({ sitedata }) {
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const generateCaptchaText = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const createCaptchaSVG = (text) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="40" width="120">
      <rect width="100%" height="100%" fill="#f8d7c3"/>
      <text x="10" y="28" font-size="24" fill="#a30a00" font-family="monospace">${text}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const refreshCaptcha = () => {
    const next = generateCaptchaText();
    setCaptcha(next);
    setCaptchaImage(createCaptchaSVG(next));
    setUserCaptcha("");
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha.trim().toUpperCase() !== captcha.trim().toUpperCase()) {
      alert("Captcha doesn't match. Please try again.");
      refreshCaptcha();
      return;
    }

    setLoading(true);

    const emailContent = "We’re excited to help you reach your financial goals.";
    const emailData = {
      to: formData.email,
      subject: "Thank You for Your Enquiry!",
      text: `Dear ${formData.username},\n\nWe sincerely appreciate your interest and the time you took to fill out our enquiry form. We have received your details, and our team will be in touch with you soon.\n\n${emailContent}`,
    };

    const senderData = {
      to: sitedata?.email,
      subject: "New Enquiry Received",
      text: `New Enquiry:\n\nName: ${formData.username}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\nService: ${formData.service}\nMessage: ${formData.message}`,
    };

    try {
      const res = await axios.post("/api/leads", formData);
      if (res.status === 201) {
        await axios.post("/api/email", emailData);
        if (sitedata?.email) await axios.post("/api/email", senderData);

        setSubmitted(true);
        setFormData({
          username: "",
          mobile: "",
          email: "",
          service: "",
          message: "",
        });
        refreshCaptcha();
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-green-500 font-semibold">
        Thank you! Your message has been sent.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Name"
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`${styles.input} text-gray-700`}
          required
        >
          <option value="" className="text-gray-200">
            Select Service
          </option>
          <option value="Mutual Fund">Mutual Fund</option>
          <option value="Gift City">Gift City</option>
          <option value="Health Insurance">Health Insurance</option>
          <option value="Life Insurance">Life Insurance</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Phone"
          className={styles.input}
          required
        />
      </div>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        className={styles.textarea}
        required
      />

      <div className="flex items-center gap-2 flex-wrap">
        {captchaImage && (
          <img
            src={captchaImage}
            alt="Captcha"
            className="h-10 w-[120px] border rounded shadow-sm"
          />
        )}
        <input
          name="captcha"
          type="text"
          placeholder="Enter Captcha"
          className="flex-1 min-w-[180px] p-2 rounded bg-white border border-black/10"
          value={userCaptcha}
          onChange={(e) => setUserCaptcha(e.target.value)}
          required
        />
        <button
          type="button"
          className="px-3 py-2 rounded text-sm bg-[var(--rv-primary-dark)] text-white border border-white/10 hover:border-white/20"
          onClick={refreshCaptcha}
        >
          Refresh
        </button>
      </div>

      <button
        type="submit"
        className={`btn ${styles.btnLight} btn-theme btn-secondary w-44`}
        disabled={loading}
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            <span>S</span>
            <span>e</span>
            <span>n</span>
            <span>d</span>
            <span className="space"></span>
            <span>M</span>
            <span>e</span>
            <span>s</span>
            <span>s</span>
            <span>a</span>
            <span>g</span>
            <span>e</span>
          </>
        )}
      </button>
    </form>
  );
}


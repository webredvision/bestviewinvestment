"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function WebPopup() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [content, setContent] = useState("");

  const fetchPopup = async () => {
    const res = await axios.get("/api/webpopups");
    setContent(res.data[0]);
  };

  const fetchPopupStatus = async () => {
    const res = await axios.get("/api/webpopups");
    const status = res?.data[0]?.status;
    setStatus(status);
  };

  useEffect(() => {
    fetchPopupStatus();
    fetchPopup();
  }, []);

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setModalOpen(true);
    }
  }, []);

  const onClose = () => {
    setModalOpen(false);
  };

  const onCommit = () => {
    setModalOpen(false);
    localStorage.setItem("popupShown", "true");
  };

  return (
    <>
      {status && modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 top-14">
          {/* Popup Box */}
          <div className="popup relative  rounded-xl  flex flex-col w-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="relative top-3  -right-[35%] lg:-right-[22%] text-white hover:text-[var(--rv-primary)]"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className=" text-xl text-white font-semibold text-center mb-4">
              {content?.title || "Popup Title"}
            </h2>

            {/* Image */}
            <div className="flex-grow flex items-center justify-center">
              {content?.image?.url ? (
                <Image
                  src={content.image.url}
                  alt="Popup Image"
                  width={800}
                  height={600}
                  className="max-w-[65%]  md:max-w-[40%] object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-11">
              <button
                onClick={onClose}
                className="btn btn-light btn-theme btn-primary"
              >
                Close
              </button>
              <button
                onClick={onCommit}
                className="btn btn-light btn-theme btn-secondary"
              >
                Don’t Show Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WebPopup;

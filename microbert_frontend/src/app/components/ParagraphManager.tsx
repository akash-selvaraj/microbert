"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import MascotSuperBig from "./MascotSuperBig";

function ParagraphManager() {
  const [paragraph, setParagraph] = useState("");
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [backendParagraph, setBackendParagraph] = useState("");
  const [isStoring, setIsStoring] = useState(false);

  useEffect(() => {
    // Fetch the paragraph from the backend when the component mounts
    fetchParagraph();
  }, []);

  const fetchParagraph = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/get-paragraph"
      );

      // Check if paragraph exists in the response
      if (response.data && response.data.paragraph) {
        setBackendParagraph(response.data.paragraph);
      } else {
        setBackendParagraph("");
      }
      setError(null); // Clear any previous error
    } catch (error) {
      setError(
        "Failed to fetch paragraph. Please check your internet connection."
      );
    }
  };

  const handleStoreParagraph = async (e) => {
    e.preventDefault();
    setIsStoring(true); // Set isStoring to true to show storing message

    try {
      const response = await axios.post(
        "http://localhost:8000/set-paragraph",
        { para: paragraph }
      );

      console.log("Paragraph stored successfully:", response.data); // Handle success (optional)
      setSuccessMessage("Paragraph stored successfully"); // Set success message
      setParagraph(""); // Clear paragraph after storing
      setError(null); // Clear any previous error

      // Fetch the updated paragraph from the backend
      fetchParagraph();
    } catch (error) {
      setError(error.message || "Failed to store paragraph.");
    } finally {
      setIsStoring(false); // Reset isStoring to false after response
    }
  };

  return (
    <div>
      <div className="hero relative min-h-screen">
        <div className="hero-content fixed text-center">
          <div className="max-w-xl">
            <div className="flex rounded-xl flex-col glass lg:flex-row shadow-xl">
              <figure>
                <MascotSuperBig />
              </figure>
              <div className="card-body flex flex-col text-center items-center">
                <h2 className="card-title  flex font-bold text-2xl">
                  Howdy!
                  {successMessage && (
                    <div
                      className="tooltip"
                      data-tip="Paragraph Stored Successfully"
                    >
                      <div className="badge badge-success p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 -960 960 960"
                          width="20"
                          className="p-1"
                        >
                          <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {backendParagraph && (
                    <div
                      className="tooltip"
                      data-tip="Paragraph Present Already"
                    >
                      <div className="badge badge-success p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 -960 960 960"
                          width="20"
                          className="p-1"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="tooltip" data-tip="Connection error...">
                      <div className="badge badge-error p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 -960 960 960"
                          width="20"
                          className="p-1"
                        >
                          <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q88 0 166.5 36T782-742L480-440v-360q-134 0-227 93t-93 227q0 134 93 227t227 93q69 0 132-28.5T720-270v110q-53 38-114 59T480-80Zm320-160v-320h80v320h-80Zm40 160q-17 0-28.5-11.5T800-120q0-17 11.5-28.5T840-160q17 0 28.5 11.5T880-120q0 17-11.5 28.5T840-80Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {isStoring && (
                    <div className="tooltip" data-tip="Storng Paragraph...">
                      <div className="badge badge-info p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 -960 960 960"
                          width="20"
                          className="p-1"
                        >
                          <path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </h2>
                <div className="justify-center flex text-xl">
                  <form onSubmit={handleStoreParagraph}>
                    <textarea
                      id="paragraph"
                      value={paragraph}
                      onChange={(e) => setParagraph(e.target.value)}
                      placeholder="Enter Paragraph"
                      className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                      required
                    />
                    <div className="flex inline gap-x-8 justify-center place-items-center mx-10">
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip="Store Paragraph"
                      >
                        <button className="btn  mt-5 bg-primary" type="submit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M241.538-211.538Q138.308-243.154 89.923-322q-48.385-78.846-48.385-158t48.385-158q48.385-78.846 151.615-110.462V-706q-71 24-115.5 86t-44.5 140q0 78 44.5 140t115.5 86v42.462Zm320 11.538q-116.846 0-198.423-81.577T281.538-480q0-116.846 81.577-198.423T561.538-760q54.462 0 103.616 19.615 49.154 19.616 87.769 55.154l-28.308 28.308q-32.23-29.923-73.423-46.5Q610-720 561.538-720q-100 0-170 70t-70 170q0 100 70 170t170 70q48.462 0 89.654-16.577 41.193-16.577 73.423-46.5l28.308 28.308q-38.615 35.538-87.769 55.154Q616-200 561.538-200Zm224.616-147.692L757.846-376l84-84H526.154v-40h315.692l-84-84 28.308-28.308L918.462-480 786.154-347.692Z" />
                          </svg>
                        </button>
                      </div>
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip="Continue to Chat"
                      >
                        <a className="btn  mt-5 bg-accent" href="/chat">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M260-420h280v-40H260v40Zm0-120h440v-40H260v40Zm0-120h440v-40H260v40ZM120-156.923v-618.462Q120-803 138.5-821.5 157-840 184.615-840h590.77Q803-840 821.5-821.5 840-803 840-775.385v430.77Q840-317 821.5-298.5 803-280 775.385-280H243.077L120-156.923ZM226-320h549.385q9.23 0 16.923-7.692Q800-335.385 800-344.615v-430.77q0-9.23-7.692-16.923Q784.615-800 775.385-800h-590.77q-9.23 0-16.923 7.692Q160-784.615 160-775.385v521.154L226-320Zm-66 0v-480 480Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParagraphManager;

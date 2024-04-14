"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Mascot from "./Mascot";
function Chat() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);
  const chatHistoryRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setKeyboardOpen(windowHeight !== documentHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedConversation = localStorage.getItem("conversationHistory");
    if (storedConversation) {
      try {
        const parsedConversation = JSON.parse(storedConversation);
        setConversation(parsedConversation);
      } catch (error) {
        console.error("Error parsing stored conversation:", error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) {
      setError("Please enter a question.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/answer-question",
        { qn: question }
      );
      const data = response.data;
      setConversation((prevConversation) => [
        ...prevConversation,
        { question, answer: data.ans },
      ]);
      setQuestion("");

      localStorage.setItem(
        "conversationHistory",
        JSON.stringify([...conversation, { question, answer: data.ans }])
      );

      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };

  const clearConversation = () => {
    setConversation([]);
    localStorage.removeItem("conversationHistory");
  };

  return (
    <div className="lg:w-1/3 sm:w-full sm:block min-h-full">
      <div className="chat-bg   min-h-full">
        <div className='lg:hero-overlay min-h-screen lg:bg-opacity-20'>
        <div className="navbar glass nav sm:w-full sm:max-w-full lg:w-1/3 lg:max-w-1/3 lg:mt-0 fixed">
          <div className="flex-none"></div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl" href="about">
              <div className="avatar">
                <div className="w-10 mask mask-hexagon">
                  <img src="/avatar.jpeg" />
                </div>
              </div>
              MicroBert
            </a>
            {error && (
              <div className="badge badge-error gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="p-1"
                >
                  <path d="M3 16h2v5H3zm4-3h2v8H7zM21 3h-2v14.59l-2-2V7h-2v6.59l-2-2V10h-1.59l-7.7-7.71-1.42 1.42 18 18 1.42-1.42-.71-.7V3zm-6 18h1.88L15 19.12V21zm-4 0h2v-3.88l-2-2V21z"></path>
                </svg>
              </div>
            )}
          </div>
          <div className="flex-none gap-x-2">
            <a href="/" className="px-5 btn bg-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={clearConversation}
              disabled={!conversation.length}
              className="px-5 btn bg-warning"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M427.692-500h104.616v-292.308q0-21.615-15.347-36.961-15.346-15.346-36.961-15.346t-36.961 15.346q-15.347 15.346-15.347 36.961V-500ZM195.385-355.385h569.23v-80q0-10.769-6.923-17.692T740-460H220q-10.769 0-17.692 6.923t-6.923 17.692v80Zm-31.847 240h104.154v-100q0-8.5 5.758-14.25t14.269-5.75q8.512 0 14.243 5.75 5.73 5.75 5.73 14.25v100H460v-100q0-8.5 5.758-14.25 5.757-5.75 14.269-5.75t14.242 5.75q5.731 5.75 5.731 14.25v100h152.308v-100q0-8.5 5.757-14.25 5.758-5.75 14.27-5.75 8.511 0 14.242 5.75 5.731 5.75 5.731 14.25v100h104.154q12.307 0 20-9.615 7.692-9.615 3.846-21.154l-49.231-169.23H188.923l-49.231 169.23q-3.846 11.539 3.846 21.154 7.693 9.615 20 9.615Zm639.077 40h-645.23q-29.001 0-47.616-23.307Q91.154-122 99.615-150.77l55.769-191.539V-440q0-25.308 17.347-42.654Q190.077-500 215.385-500h172.307v-292.308q0-38.461 26.923-65.385 26.923-26.923 65.385-26.923t65.385 26.923q26.923 26.924 26.923 65.385V-500h172.307q25.308 0 42.654 17.346 17.347 17.346 17.347 42.654v97.692l55.769 193.077q9.154 28-9.577 50.923-18.731 22.924-48.193 22.924Zm-38-384.615h-569.23 569.23Zm-232.307-40H427.692h104.616Z" />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <div
            className="conversation-history  align-bottom overflow-y-auto p-2 h-full"
            ref={chatHistoryRef}
          >
            <div className="center mt-40  flex justify-center">
              <div className="card w-56 mt-30 bg-base-100 shadow-2xl lg:hidden">
                <figure>
                  <Mascot />
                </figure>
                <div className="card-body bg-base-100 rounded-xl">
                  <h2 className="card-title">Howdy!</h2>
                  <p>Nice Text! What are you looking for?</p>
                </div>
              </div>
            </div>
            <ul className="my-20 ">
              {conversation.map((item, index) => (
                <li key={index}>
                  <div className="chat chat-start">
                    <div className="chat-image avatar mask mask-hexagon">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.freepik.com/premium-photo/modern-line-icon-cute-character-smiling-bold-lines-solid-color-pixel-perfect-isolate-minimalistic_68067-5341.jpg"
                        />
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-primary">
                      {item.question}
                    </div>
                  </div>
                  <div className="chat chat-end">
                    <div className="chat-image avatar mask mask-hexagon">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="/avatar.jpeg"
                        />
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-secondary">
                      {item.answer}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="btm-nav glass text-chat mb-0 p-2 sm:w-full lg:w-1/3">
            <form onSubmit={handleSubmit} className="min-w-full">
              <div className="inline-flex flex min-w-full gap-x-4">
                <input
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  placeholder="Ask a Question..."
                  className="input input-bordered w-5/6 input-success"
                />
                <button className="btn bg-success" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M160-220v-520l616.924 260L160-220Zm40-60 474-200-474-200v155.385L393.846-480 200-435.385V-280Zm0 0v-400 400Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

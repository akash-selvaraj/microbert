"use client";
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import axios from "axios";
import KeyboardResponsiveWrapper from './KeyboardResponsiveWrapper'
function Test() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);
  const chatHistoryRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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
        "http://192.168.81.3:8000/answer-question",
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
    <KeyboardResponsiveWrapper>
    <div className="lg:w-1/3 sm:w-full pr-2 flex-col">
      <div className="navbar nav sm:w-full sm:max-w-full lg:w-1/3 lg:max-w-1/3 fixed bg-primary ">
        <div className="flex-none">
          <div className="avatar">
            <div className="w-10 mask mask-hexagon">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MicroBert</a>
          {error && (
            <div className="badge badge-error gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 16h2v5H3zm4-3h2v8H7zM21 3h-2v14.59l-2-2V7h-2v6.59l-2-2V10h-1.59l-7.7-7.71-1.42 1.42 18 18 1.42-1.42-.71-.7V3zm-6 18h1.88L15 19.12V21zm-4 0h2v-3.88l-2-2V21z"></path>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-none">
          <button
            type="button"
            onClick={clearConversation}
            disabled={!conversation.length}
            className="px-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 8.001h-4V4.999a2.92 2.92 0 0 0-.874-2.108 2.943 2.943 0 0 0-2.39-.879C10.202 2.144 9 3.508 9 5.117V8H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9.999c0-1.103-.897-2-2-2zM5 10h6V5.117c0-.57.407-1.07 1.002-1.117.266 0 .512.103.712.307a.956.956 0 0 1 .286.692V10h.995l.005.001h5V12H5v-2zm0 10v-6h14l.002 6H5z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className="conversation-history overflow-y-auto lg:my-5 mx-2 mb-20"
        ref={chatHistoryRef}
      >
        <ul className='mt-20'>
          {conversation.map((item, index) => (
            <li key={index}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-bubble chat-bubble-secondary">
                  {item.question}
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-bubble chat-bubble-primary">
                  {item.answer}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-0 mx-2 fixed p-4 sm:w-full lg:w-1/3 btm-nav">
        <form onSubmit={handleSubmit} className="min-w-full">
          <div className="inline-flex justify-between mb-0  min-w-full">
            <input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              placeholder="Ask a Question..."
              className="input input-bordered w-5/6 input-success"
            />
            <button
              className="btn bg-accent btn-circle btn-outline"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
    </KeyboardResponsiveWrapper>
  );
}

export default Test;

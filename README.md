Here is a professional, presentation-style writeup for the **Chat Assistant Web App** based on your latest architecture diagram — including a feature overview, tech stack, architecture explanation, and full run instructions.

---

### 🧠 MicroBert – Conversational Assistant Web App

**MicroBert** is a web-based AI assistant that provides real-time, interactive responses to user queries. It is built with a modern **Next.js frontend** and a scalable **FastAPI backend**, which communicates with an **external ML inference service** to generate responses.

> Type a message → Send → Get a smart, contextual reply instantly!

---
<img width="1920" height="1080" alt="Untitled design(1)" src="https://github.com/user-attachments/assets/780dbee7-a3f3-4381-9d43-601469e1bd39" />


## 💡 Key Features

* 💬 **Chat Interface**: Responsive chat window with typing indicator and animation
* 👾 **Mascot Character**: Optional animated mascot adds personality
* ⌨️ **Keyboard Shortcuts**: Enhanced user accessibility
* 📜 **Paragraph Manager**: Handles multiline and styled responses
* 📄 **About Page**: Static informational content
* 🌗 **Fully responsive & theme-ready interface**

---

## 🖼️ System Architecture

<img width="4840" height="916" alt="diagram(3)" src="https://github.com/user-attachments/assets/abef8231-41e5-4697-aa52-26fd53864c84" />

---

### 🟢 Frontend – Next.js (Port 3000)

#### 📄 Pages

* `Home Page`: Main chat interface
* `Chat Page`: Dedicated conversation window
* `About Page`: Project/about information
* `Global Layout`: Wraps all pages for consistency

#### 🧩 Components

* `ChatComponent`: Core chat box and message handling
* `WaitingAnimation`: Shows while waiting for API response
* `KeyboardResponsiveWrapper`: Listens to keyboard input
* `Mascot`, `MascotBig`, `MascotSuperBig`: Fun animated assistants
* `ParagraphManager`: Formats model outputs
* `TestComponent`: For dev testing
* `AboutComponent`: Info display

#### ⚙️ Frontend Configuration

* `tailwind.config.ts`, `globals.css`: Styling
* `next.config.mjs`, `tsconfig.json`: Build configs
* `package.json`, `package-lock.json`: Dependencies
* `.eslintrc.json`: Linting

---

### 🔵 Backend – FastAPI (Port 8000)

#### Core API

* `app.py`: FastAPI app routing and logic
* `requirements.txt`: Python dependencies
* `readme.md`: Backend documentation

#### 🔶 External Inference

* Backend invokes **external ML model API** for generating responses
* ML model is not hosted in this repo; expects JSON inference endpoint

---

## 🧰 Technology Stack

| Layer     | Tools & Frameworks                              |
| --------- | ----------------------------------------------- |
| Frontend  | Next.js (React), TailwindCSS, TypeScript        |
| Backend   | FastAPI, Python 3.8+                            |
| Inference | External API (e.g., OpenAI, Hugging Face, etc.) |

---

## 🔧 How to Run the Application

---

### 🚀 Backend Setup (FastAPI Server)

1. **Navigate to backend**

```bash
cd backend/
```

2. **Create virtual environment**

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Start the server**

```bash
uvicorn app:app --reload
```

📍 Available at: `http://localhost:8000`

---

### 🌐 Frontend Setup (Next.js App)

1. **Navigate to frontend**

```bash
cd frontend/
```

2. **Install packages**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

📍 Open in browser: `http://localhost:3000`

---

## 🔁 Flow of Operation

1. User types a message in chat UI.
2. Frontend sends a `POST /chat` request to FastAPI.
3. FastAPI calls the external inference service.
4. JSON response is returned with generated message.
5. Frontend renders the response + animation.

---

## 🔌 API Example

**Endpoint**: `POST /chat`
**Body**:

```json
{
  "message": "What is AI?"
}
```

**Response**:

```json
{
  "reply": "AI stands for Artificial Intelligence, which refers to systems that simulate human intelligence..."
}
```

---

## 📝 License & Contribution

This project is open-source under the **MIT License**.
Contributions are welcome via pull requests!

---

Let me know if you’d like:

* Dockerized setup (`Dockerfile` + `docker-compose.yml`)
* Environment variable support for dynamic inference URLs
* Frontend component snippets (e.g., mascot, chat bubble)
* Hosting instructions (Vercel for frontend, Render/Fly.io for backend)

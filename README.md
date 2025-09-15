<<<<<<< HEAD
# Weather-Chat-Agent
=======
# 🌦️ Weather Chat Application

A simple **chat-based weather application** built with **React + Vite + Bootstrap**.  
Users can ask weather-related queries, and the app responds in a conversational chat interface.

---

## 🚀 Features
- 💬 **Chat UI** – user and agent messages displayed in a conversational style  
- ⌨️ **Message Input** – send messages via Enter or Send button  
- 🖼️ **Custom Send Button** – styled with a PNG arrow icon  
- 📱 **Responsive Layout** – works across devices  
- ☁️ **Weather Agent Integration** – fetches live weather data (via Mastra LLM agent API)  
-    **Text box** – Auto scroll feature
---

## 🛠️ Tech Stack
- **React (Vite)** – frontend framework  
- **Bootstrap 5** – UI styling  
- **Mastra LLM Agent API** – provides weather responses  
- **JavaScript (ES6+)**  

---

## 📂 Project Structure
├── src
│ ├── components
│ │ ├── MessageInput.jsx
│ │ ├── MessageList.jsx
│ │ ├── TypingIndicator.jsx
│ ├── hooks
│ │ ├── useWeatherChat.js
│ ├── App.jsx
│ ├── index.css
│ ├── App.css
│ └── main.jsx
├── public
│ ├── top-right.png # custom send button icon
├── .env # API keys and environment variables
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

# -------------------------
# 1️⃣ INITIAL PROJECT SETUP
# -------------------------

# Clone your project (or create a new folder if not cloned yet)
git clone https://github.com/your-username/weather-chat-app.git
cd weather-chat-app

# Initialize Git (if not already done)
git init
git branch -M main

# -------------------------
# 2️⃣ INSTALL DEPENDENCIES
# -------------------------

# Install all packages listed in package.json
npm install

# -------------------------
# 3️⃣ RUN PROJECT LOCALLY
# -------------------------

# Start development server
npm run dev
# Project runs on http://localhost:5173

# -------------------------
# 4️⃣ ADD ENVIRONMENT VARIABLES
# -------------------------

# Create a .env file in project root with your API details
echo "VITE_API_BASE=https://your-api-url.com/api/agents/weatherAgent/stream" >> .env
echo "VITE_THREAD_ID=your-thread-id" >> .env

# -------------------------
# 5️⃣ PUSH TO GITHUB
# -------------------------

# Add all project files
git add .

# Commit changes
git commit -m "Initial commit: Weather Chat App"

# Add your GitHub repository URL (replace with your repo link)
git remote add origin https://github.com/your-username/weather-chat-app.git

# Push to GitHub
git push -u origin main

# -------------------------
# 6️⃣ DEPLOY (OPTIONAL)
# -------------------------

# For Vercel (if installed globally)
vercel

# Or for Netlify
netlify deploy

# For GitHub Pages (install gh-pages first if needed)
npm install gh-pages --save-dev
npm run build
git subtree push --prefix dist origin gh-pages


## 📸 Screenshots

### Chat Interface
![Chat UI](public/Weather-UI-1.png)
![Chat UI](public/Weather-UI-2.png)

### 🚀 Run the Project

Start the development server with:

```bash
npm run dev
The app will be available at:👉 http://localhost:5173

📜 License

This project is licensed under the MIT License.


---

✅ This is a **ready-to-publish README**.  

Do you also want me to write the **exact GitHub upload commands** (from `git init` to pushing with README) so you can publish your project step by step
>>>>>>> 47d3fe8 (Initial commit: Weather Chat App)

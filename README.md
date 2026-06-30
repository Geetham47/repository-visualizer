# 🚀 RepoVision
### AI-Powered Repository Structure Analysis & Visualization System

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React Flow](https://img.shields.io/badge/Visualization-ReactFlow-7B61FF?style=for-the-badge)
![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)

</p>

<p align="center">

**Transform complex software repositories into interactive dependency graphs with AI-powered code understanding.**

Upload any repository as a ZIP archive, automatically visualize its architecture, inspect dependency relationships, analyze repository metrics, and understand unfamiliar source code using Google Gemini AI.

</p>

---

# 🌐 Live Demo

### 🚀 Frontend

**https://repository-visualizer.vercel.app/**

### ⚙️ Backend API

**https://repository-visualizer.onrender.com/**

### 📖 API Documentation

**https://repository-visualizer.onrender.com/docs**

---

# 📖 Overview

Modern software projects often contain hundreds of files distributed across multiple folders and modules. Understanding how these files interact requires developers to manually inspect imports, trace dependencies, and study source code before they can confidently contribute to a project.

**RepoVision** addresses this challenge by automatically analyzing uploaded repositories and generating an interactive dependency graph that visually represents relationships between files. Every source file is represented as a node, while detected imports become dependency edges, enabling developers to understand the architecture of an unfamiliar project within minutes.

Beyond visualization, RepoVision integrates **Google Gemini AI** to provide instant explanations, refactoring suggestions, bug detection, and improvement recommendations for any selected file. Combined with repository analytics, intelligent search, export utilities, and cloud deployment, RepoVision serves as a complete repository exploration platform for developers.

---

# 🎯 Problem Statement Coverage

RepoVision successfully implements every core requirement mentioned in the **Repository Structure Analysis and Visualisation System** problem statement.

| Requirement | Status |
|-------------|:------:|
| Recursive Repository Traversal | ✅ |
| Dependency Detection | ✅ |
| Interactive React Flow Visualization | ✅ |
| FastAPI REST Backend | ✅ |
| AI Powered Code Explanation | ✅ |
| Repository Metrics (LoC & Complexity) | ✅ |
| AI Summary Caching | ✅ |
| Interactive Dependency Exploration | ✅ |

In addition to the required functionality, several advanced developer-focused features were implemented to significantly improve usability, performance, and overall user experience.

---

# ✨ Features

## 📦 Smart Repository Upload

RepoVision removes the need to manually specify local repository paths by allowing repositories to be uploaded directly through the browser.

### Features

- Upload repositories as ZIP archives.
- Automatic ZIP validation before analysis.
- Automatic extraction of uploaded repositories.
- Intelligent nested folder detection.
- Automatic repository root identification.
- Repository persistence across browser refreshes.
- No local configuration required.

---

## 🕸 Interactive Dependency Visualization

Every uploaded repository is automatically converted into an interactive dependency graph using **React Flow**.

### Features

- Interactive infinite canvas.
- Zoom and pan support.
- Draggable nodes.
- Automatic graph layout.
- Incoming dependency highlighting.
- Outgoing dependency highlighting.
- One-click node selection.
- Responsive visualization for large repositories.

---

## 🤖 AI Powered Code Assistant

Every selected source file can be analyzed using **Google Gemini AI**.

### Supported AI Modes

- 📝 Explain Code
- ♻️ Refactoring Suggestions
- 🐞 Bug Detection
- 🚀 Improvement Recommendations

### Smart Features

- Instant AI summaries.
- Plain-English explanations.
- Hash-based caching.
- Automatic cache invalidation whenever the source file changes.
- Reduced API usage and faster repeated analysis.

---

## 📊 Repository Analytics

RepoVision automatically generates useful repository statistics while scanning.

### Metrics Generated

- Total Files
- Total Dependencies
- Lines of Code (LoC)
- Import Count
- Export Count
- Dependency Count
- Repository Health
- File Classification
- Complexity Indicators

These metrics provide developers with an instant overview of the repository structure.

---

## 🔍 Intelligent Search

Large dependency graphs become easy to navigate using the built-in search functionality.

### Features

- Instant file search.
- Automatic node selection.
- Quick navigation inside large repositories.
- Immediate graph focus on matching files.

---

## 📤 Export Utilities

RepoVision provides multiple export options for documentation and further analysis.

### Supported Exports

- 📄 Export Source Code
- 🖼 Export Dependency Graph as PNG
- 📊 Export Graph as JSON

These exports make it easy to share repository architecture, generate documentation, or perform additional offline analysis.

---

## ☁ Cloud Deployment

The complete application has been deployed to the cloud for easy access.

### Deployment

- Frontend hosted on **Vercel**
- Backend hosted on **Render**
- REST API communication
- Environment variable configuration
- Cross-Origin Resource Sharing (CORS) support
- Production-ready deployment

---

# ⭐ Additional Features Beyond the Problem Statement

Although the original problem statement focused primarily on repository visualization and AI summaries, RepoVision introduces several additional capabilities to provide a richer developer experience.

- ✅ Browser-based ZIP repository upload.
- ✅ Automatic nested repository detection.
- ✅ Repository persistence after page refresh.
- ✅ Intelligent file search with automatic node selection.
- ✅ Source code download for selected files.
- ✅ PNG graph export.
- ✅ JSON graph export.
- ✅ Hash-based AI response caching.
- ✅ Modern responsive developer dashboard.
- ✅ Interactive dependency highlighting.
- ✅ Production deployment using Render and Vercel.
- ✅ Professional dark-themed user interface inspired by modern developer tools.

- ---

# ⚙️ How RepoVision Works

RepoVision follows a simple yet powerful workflow that transforms an uploaded repository into an interactive architecture visualization.

```
Upload ZIP Repository
          │
          ▼
Automatic Repository Extraction
          │
          ▼
Recursive Repository Scanning
          │
          ▼
Dependency Parsing
          │
          ▼
Graph Generation
          │
          ▼
Interactive React Flow Visualization
          │
          ▼
Repository Analytics
          │
          ▼
AI Code Analysis (Google Gemini)
          │
          ▼
Export & Documentation
```

### Workflow

1. The user uploads a repository as a ZIP archive through the web interface.
2. The backend automatically validates and extracts the repository.
3. Every supported source file is recursively scanned.
4. Import relationships are detected to build the dependency graph.
5. Repository statistics and metrics are generated.
6. The graph is rendered using React Flow for interactive exploration.
7. Selecting a node enables AI-powered analysis of the corresponding source file.
8. Users can export the graph or download individual source files for further use.

---

# 🏗️ System Architecture

RepoVision follows a modular client-server architecture where the frontend is responsible for visualization and user interaction, while the backend performs repository analysis, dependency extraction, graph generation, and AI processing.

```
                         User
                           │
                           ▼
              React Frontend (Vercel)
                           │
                     REST API Calls
                           │
                           ▼
              FastAPI Backend (Render)
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼
Repository Scanner   Dependency Parser    AI Assistant
      │                    │                    │
      └──────────────┬─────┘                    │
                     ▼                          │
               Graph Builder                   │
                     │                          │
                     ▼                          ▼
        Interactive Dependency Graph     Google Gemini API
```

### Architecture Components

### 🎨 Frontend

- React
- React Flow
- Axios
- React Icons
- Interactive Dashboard
- Export Utilities

### ⚙️ Backend

- FastAPI
- Repository Scanner
- Dependency Parser
- Graph Builder
- AI Service
- Cache Manager

### 🤖 AI Layer

- Google Gemini
- Explain Code
- Bug Detection
- Refactoring Suggestions
- Improvement Recommendations
- Smart Response Caching

- ---

# 🛠️ Technology Stack

RepoVision is built using a modern full-stack architecture that combines interactive visualization, efficient backend processing, and AI-powered code understanding.

| Technology | Purpose |
|------------|---------|
| **React** | Builds the interactive frontend user interface |
| **React Flow** | Visualizes repositories as interactive dependency graphs |
| **FastAPI** | Provides REST APIs for repository analysis and AI services |
| **Python** | Performs repository scanning, parsing, graph generation, and backend processing |
| **Google Gemini AI** | Generates code explanations, bug analysis, refactoring suggestions, and improvement recommendations |
| **Axios** | Handles communication between the frontend and backend |
| **UUID** | Generates unique identifiers for uploaded repositories |
| **python-multipart** | Handles ZIP file uploads through FastAPI |
| **JSON** | Stores graph data and AI response cache |
| **Vercel** | Hosts the React frontend |
| **Render** | Hosts the FastAPI backend |
| **Git & GitHub** | Version control and project collaboration |

---

# 📂 Project Structure

```

RepoVision

├── backend/

│ ├── analyzer/

│ │ ├── ai_service.py

│ │ ├── dependency_parser.py

│ │ ├── graph_builder.py

│ │ └── scanner.py

│ │

│ ├── cache/

│ ├── uploads/

│ ├── app.py

│ └── requirements.txt

│

├── frontend/

│ ├── src/

│ │ ├── components/

│ │ ├── services/

│ │ ├── App.jsx

│ │ └── main.jsx

│ │

│ └── package.json

│

└── README.md

```

### Folder Description

| Folder/File | Description |
|-------------|-------------|
| **backend/analyzer** | Core repository analysis engine including dependency parsing, graph generation, repository scanning, and AI integration. |
| **backend/cache** | Stores cached AI responses to avoid repeated API calls for unchanged files. |
| **backend/uploads** | Temporarily stores uploaded repositories before analysis. |
| **app.py** | Main FastAPI application exposing all REST API endpoints. |
| **frontend/components** | Reusable React UI components used throughout the application. |
| **frontend/services** | Handles API communication between frontend and backend. |
| **App.jsx** | Main application component responsible for rendering the dashboard. |

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/<your-username>/repository-visualizer.git
cd repository-visualizer
```

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows

pip install -r requirements.txt

uvicorn app:app --reload
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file inside the **backend** directory.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Create a `.env` file inside the **frontend** directory.

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

# 🔮 Future Enhancements

Although RepoVision successfully implements all required project objectives, several enhancements can further extend its capabilities.

- Support for additional programming languages.
- AST-based dependency analysis for greater accuracy.
- Direct GitHub repository import.
- Circular dependency detection.
- Repository comparison and version analysis.
- Code quality and security analysis.
- Team collaboration features.
- Interactive architecture reports.

---

# 🎯 Conclusion

RepoVision transforms repository exploration into an intuitive and interactive experience by combining automated repository analysis, dependency visualization, repository analytics, and AI-powered code understanding within a single web application.

Beyond fulfilling every requirement of the original problem statement, the project introduces several practical enhancements including browser-based ZIP uploads, intelligent search, export utilities, repository persistence, cloud deployment, and AI response caching, resulting in a complete developer productivity platform rather than a simple visualization tool.

---

# 👨‍💻 Contributors

**Geetham**

B.Tech Computer Science & Engineering

Indian Institute of Technology Roorkee

---

## ⭐ If you found this project interesting, consider giving it a star on GitHub!

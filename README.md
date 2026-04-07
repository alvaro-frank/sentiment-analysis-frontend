# Financial Sentiment Analysis - Frontend

![CI Status](https://github.com/alvaro-frank/sentiment-analysis-frontend/actions/workflows/ci.yml/badge.svg)
![React](https://img.shields.io/badge/React-18.2%2B-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0%2B-646CFF?logo=vite&logoColor=white)

A modern, responsive, and high-performance frontend for the Sentiment Analysis NLP service. This application allows users to input text (such as financial news or reviews) and sends it to the FastAPI backend engine to calculate the sentiment label and confidence score in real-time. Built with **React**, **TypeScript**, and **Vite**.

## 📂 Project Structure
```text
├── public/                 # Static assets (Favicon, icons)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── SentimentForm.tsx   # Form for text input and action triggers
│   │   └── SentimentResult.tsx # Visualizes the sentiment score and label
│   ├── hooks/              # Custom React hooks
│   │   └── useSentiment.ts     # Manages state, loading, and side-effects for API calls
│   ├── services/           # External API integrations
│   │   └── api.ts              # Fetch requests to the FastAPI backend endpoint
│   ├── types/              # TypeScript interfaces and DTOs
│   │   └── index.ts            # Type definitions for Requests and Responses
│   ├── App.tsx             # Main application layout and state orchestration
│   ├── main.tsx            # React application entry point
│   └── index.css           # Global CSS and theming
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration and backend API proxying
```

## 🛠️ Setup & Requirements

- `Node.js 18+` (or a compatible modern version)
- `npm` (or `yarn` / `pnpm`)

1. **Clone the repository**

```bash
git clone https://github.com/alvaro-frank/sentiment-analysis-frontend.git
cd sentiment-analysis-frontend
```

2. **Install dependencies**

```bash
npm run install
```

## ⚡ Quick Start

To run the application locally in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the local port specified by Vite in your terminal).

_Note: For the application to work end-to-end, ensure the Sentiment Analysis Backend is running locally on `http://localhost:8000`. Vite is configured to proxy requests to `/predict` directly to this port to avoid CORS issues._

## 🏃 Usage & Features

The interface is designed for simplicity and speed, divided into two main sections:

1. **Input Panel**

- **Text Analysis**: A clean, accessible text area where users can type or paste the content they wish to analyze.
- **State Feedback**: The UI disables inputs and shows a loading state while the backend runs the NLP inference model.

2. **Result Visualization**

- **Dynamic Labels**: Once the backend returns the data, the application displays the predicted sentiment (e.g., POSITIVE, NEGATIVE, NEUTRAL) with dynamic color coding.
- **Confidence Metrics**: Displays the model's confidence score as a clear percentage, allowing users to gauge the reliability of the inference.

## 🧠 Methodology & Architecture

**State Management & API**

The component state and backend synchronization are abstracted into the `useSentiment.ts` custom hook. This ensures the main UI components remain clean, declarative, and focused solely on rendering.

**Strict Data Contracts**

The data types are strictly typed with TypeScript interfaces (`SentimentRequest`, `SentimentResponse`). These map perfectly 1:1 with the backend's Pydantic schemas, preventing runtime errors and ensuring the frontend respects the backend contract.

**Code Quality**

The repository is maintained with strict TypeScript rules to ensure clean, maintainable, and error-free code.

```bash
# Run type checking
npx tsc --noEmit

# Build for production
npm run build
```

## ⚙️ CI/CD Pipeline

The project includes a GitHub Actions workflow (`ci.yml`) that automates the quality gate for the frontend application. On every push or pull request to the main branches, the pipeline executes the following checks:

- **Dependency Installation**: Fast and deterministic installs using `npm run install`.
- **Linting & Type Checking**: Ensures code quality and validates strict TypeScript typing.
- **Build Verification**: Executes Vite's build process to guarantee the application compiles successfully without errors before any code is merged.

## 🐳 Docker Support

The frontend application is optimized for containerized deployment using a highly efficient multi-stage build process:

- **Build Stage**: Uses a lightweight `node:20-alpine` image to install dependencies and compile the Vite/React application into static files.
- **Production Stage**: Uses `nginx:alpine` to serve the static compiled assets (/dist), resulting in a tiny, highly performant final image.

To build and run the Docker container locally:

```bash
# Build the Docker image
docker build -t sentiment-analysis-ui .

# Run the container (mapping port 8080 on your host to port 80 in the container)
docker run -p 8080:80 sentiment-analysis-ui
```

The application will then be accessible in your browser at `http://localhost:8080`.

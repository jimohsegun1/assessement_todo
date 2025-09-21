# Project Management Dashboard

This is a modern, interactive project management dashboard built with Next.js, TypeScript, Three.js and Tailwind CSS. It provides a clean and intuitive interface for managing tasks through a Kanban-style board, complete with drag-and-drop functionality, dynamic AI-powered UI elements, and a responsive design that works across all devices.

## ✨ Features

- **Kanban Board:** A fully interactive, three-column board ("To do", "In progress", "Done") to visualize task workflow.
- **Drag-and-Drop:** Seamlessly move tasks between columns to update their status.
- **Task Management:** Add new tasks with titles and descriptions through an intuitive dialog.
- **Dynamic Filtering:** A collapsible sidebar allows users to filter tasks by their status (e.g., "In progress", "Done") or by project.
- **Responsive Design:** The application is fully responsive, featuring a main sidebar for navigation and a collapsible sub-sidebar that adapts to screen size.
- **Light & Dark Modes:** Includes a theme switcher for user preference between light and dark modes.
- **Component-Based Architecture:** Built with reusable and modular React components using ShadCN UI.
- **Iconography:** Utilizes `lucide-react` for clean and consistent icons throughout the application.
- **Notifications:** A toast notification system provides feedback for user actions.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/) & Three.js
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Drag & Drop:** [`@dnd-kit`](https://dndkit.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) (version 18 or later recommended) and npm installed on your machine.

### Installation

1. Clone the repository to your local machine:
   ```sh
   git clone <repository-url>
   ```

2. Navigate into the project directory:
   ```sh
   cd <project-directory>
   ```

3. Install all the required dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

Once the dependencies are installed, you can start the local development server:

```sh
npm run dev
```

This will start the application on `http://localhost:3000`. You can open this URL in your web browser to see the application.

## Available Scripts

- `npm run dev`: Starts the application in development mode with Turbopack.
- `npm run build`: Creates a production-ready build of the application.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase for potential errors.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

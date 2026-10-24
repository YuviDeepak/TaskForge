# TaskForge — Group & Task Management Platform

TaskForge is a full-stack task management platform that helps administrators organize groups, assign tasks, and monitor completion progress. Users can join groups, access assigned tasks, and track their individual progress.

## Features

- **Authentication:** User registration and login.
- **Group Management:** Create and manage groups.
- **Task Assignment:** Assign tasks to multiple groups.
- **Individual Progress Tracking:** Members independently mark assigned tasks as completed.
- **Role-Based Access Control:** Different permissions for administrators and users.
- **Dashboards:** View groups, tasks, users, and task completion status.
- **Analytics:** Visualize task completion data using ApexCharts.
- **Responsive UI:** User-friendly interface across different screen sizes.

## Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS
- **Routing:** React Router
- **Charts:** ApexCharts
- **Build Tool:** Vite
- **Backend:** Node.js and Express.js
- **Database:** MongoDB
- **Deployment:** Vercel (frontend), Render (backend)

## Live Demo

[Launch TaskForge](https://task-forge-iota-navy.vercel.app/)

## Repositories

- **Frontend:** [TaskForge](https://github.com/YuviDeepak/TaskForge)
- **Backend:** [TaskForge-Backend](https://github.com/YuviDeepak/TaskForge-Backend)

## Run Locally

### Prerequisites

- Node.js
- npm
- Access to the TaskForge backend API

### Installation

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/YuviDeepak/TaskForge.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TaskForge
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

**Note:** The frontend currently uses a hardcoded deployed backend URL. Ensure the backend is available when running the frontend locally.

## Project Purpose

TaskForge demonstrates full-stack application development, including React components, REST API integration, authentication, role-based access control, group-based task assignment, progress tracking, and dashboard analytics.

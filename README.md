# Global Express Landing Page

A modern React application built with Vite and Tailwind CSS.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

## Project Structure

```
src/
├── api/              # API configuration and service files
│   ├── apiConfig.js  # Axios instance and interceptors
│   └── userApi.js    # User-related API calls
├── contexts/         # React Context providers
│   └── AuthContext.jsx
├── components/       # Reusable UI components
├── pages/           # Page components
│   └── Home.jsx
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── constants/       # Application constants
└── App.jsx         # Root component

public/
├── images/          # Image assets
├── icons/           # Icon files
└── logos/           # Logo files
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env`:

   ```md
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Architecture Patterns

### API Layer

API calls are organized in the `src/api` directory:

- `apiConfig.js` - Configures axios with base URL, interceptors, and auth headers
- Service files (e.g., `userApi.js`) - Contain specific API endpoint calls

### Context Pattern

State management uses React Context API:

- Contexts are defined in `src/contexts`
- Each context exports a Provider component and a custom hook
- Example: `AuthContext` provides authentication state and methods

### Usage Example

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();

  // Use auth methods and state
}
```

## Environment Variables

Create a `.env` file with:

- `VITE_API_BASE_URL` - Backend API base URL

## License

MIT

# Dark Mode Implementation (Removed)

This file documents the dark mode system that was previously implemented in this codebase, for reference if it needs to be re-added later.

---

## Overview

The dark mode system used:
- **React Context** for state management
- **CSS custom properties (variables)** for theming
- **localStorage** for persistence
- **`data-theme` attribute** on `<html>` for CSS targeting
- A **toggle button** in the NavBar (both desktop and mobile)

---

## Files Involved

### 1. `src/contexts/theme-context.js` — Context Definition & Hook

```js
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

### 2. `src/contexts/ThemeContext.jsx` — Provider Component

```jsx
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./theme-context";

const THEME_STORAGE_KEY = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  return "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
```

### 3. `src/App.jsx` — ThemeProvider Wrapping

The `<ThemeProvider>` wrapped the entire app:

```jsx
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* routes */}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### 4. `src/components/NavBar.jsx` — Toggle Button

Desktop toggle (inside the right-side nav actions):

```jsx
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../contexts/theme-context";

const { theme, toggleTheme } = useTheme();

// Desktop button
<button
  type="button"
  onClick={toggleTheme}
  className="text-[color:var(--icon)] text-lg"
  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
>
  {theme === "dark" ? <FiSun /> : <FiMoon />}
</button>

// Mobile button (inside mobile menu)
<button
  type="button"
  onClick={toggleTheme}
  className="flex items-center gap-2 mt-2 text-[color:var(--icon)]"
  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
>
  {theme === "dark" ? <FiSun /> : <FiMoon />}
  <span className="text-[color:var(--text)]">
    {theme === "dark" ? "Light Mode" : "Dark Mode"}
  </span>
</button>
```

### 5. `src/index.css` — Dark Mode CSS Variables & Helpers

```css
/* Dark theme variable overrides */
[data-theme="dark"] {
  --bg: #232323;
  --surface: #232323;
  --surface-2: #1a1a1a;
  --text: #ffffff;
  --text-muted: #d6d6d6;
  --heading: #ffffff;
  --border: #ffffff;
  --accent: #ff6600;
  --accent-hover: #e65c00;
  --accent-contrast: #ffffff;
  --nav-bg: #232323;
  --header-bg: #4a3328;
  --footer-bg: #232323;
  --footer-text: #ffffff;
  --footer-muted: #d9d9d9;
  --footer-border: rgba(255, 255, 255, 0.3);
  --hero-text: #ffffff;
  --inverse-surface: #ffffff;
  --inverse-text: #232323;
  --inverse-muted: #5c5c5c;
  --icon: #ffffff;
  --link: #ff6600;
  --achievement-gradient-start: #963113;
  --achievement-gradient-end: #ffa78d3d;
}

/* Theme-specific image filters */
[data-theme="light"] .theme-number {
  filter: invert(1);
}

:root .footer-logo {
  filter: brightness(0);
}

[data-theme="dark"] .footer-logo {
  filter: none;
}
```

---

## How It Worked

1. On load, `ThemeProvider` reads the saved theme from `localStorage` (defaults to `"light"`).
2. A `useEffect` sets `data-theme` on `<html>` and saves to `localStorage` whenever theme changes.
3. CSS variables under `[data-theme="dark"]` override the `:root` light-mode defaults.
4. The NavBar toggle button calls `toggleTheme()` which flips between `"dark"` and `"light"`.
5. Icons switch between `FiSun` (in dark mode) and `FiMoon` (in light mode).

---

## To Re-implement

1. Restore `src/contexts/theme-context.js` and `src/contexts/ThemeContext.jsx`
2. Wrap `<App>` in `<ThemeProvider>`
3. Add the `[data-theme="dark"]` CSS block back to `index.css`
4. Add theme toggle buttons back to NavBar (desktop + mobile)
5. Import `FiMoon` and `FiSun` from `react-icons/fi` in NavBar

import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // Default to light mode if no saved preference exists
    return "light";
  }
  return "light";
};

const initialState = getInitialTheme();

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLight: () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", "light");
      }
      return "light";
    },
    setDark: () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", "dark");
      }
      return "dark";
    },
    toggle: (state) => {
      const newTheme = state === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return newTheme;
    },
  },
});

export const { setLight, setDark, toggle } = themeSlice.actions;

// Middleware to persist theme changes
export const themeMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (["theme/setLight", "theme/setDark", "theme/toggle"].includes(action.type)) {
    const theme = store.getState().theme;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }
  return result;
};

export default themeSlice.reducer;
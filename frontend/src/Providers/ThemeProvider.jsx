import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    
    // Only proceed if theme is defined
    if (!theme) return;
    
    root.classList.toggle('dark', theme === 'dark');
    root.setAttribute('data-theme', theme);
    
    // This is now redundant since the slice handles it
    // localStorage.setItem('theme', theme);
    
    return () => {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    };
  }, [theme]);

  return children;
}
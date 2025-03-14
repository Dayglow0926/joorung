import { useState } from 'react';

export default function ToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleEvent = () => {
    console.log(theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleEvent}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md text-black dark:text-white"
    >
      {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
    </button>
  );
}

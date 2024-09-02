import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference in localStorage
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
      if (JSON.parse(savedMode)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('dark-mode', JSON.stringify(newMode));
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">F1 Stats</Link>
        <div className="space-x-4">
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline px-2">Home</Link>
            <Link to="/standings" className="text-white hover:underline px-3">Driver Standings</Link>
            <span className="text-white mr-2">☀️</span>
            <div
              onClick={toggleDarkMode}
              className="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-500"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-500 ${darkMode ? 'translate-x-6' : ''}`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-sm">
                  {darkMode ? '🌙' : ''}
                </span>
              </div>
            </div>
            <span className="text-white ml-2">🌙</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

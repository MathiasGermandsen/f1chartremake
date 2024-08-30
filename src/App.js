import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import DriverStandings from './pages/DriverStandings';
import Home from './pages/Home';

function App() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/standings" element={<DriverStandings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

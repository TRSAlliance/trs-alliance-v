
// src/App.jsx — GEN-2 ROUTING (CLEAN + BOSS-READY)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Crew from './pages/Crew';
import Funders from './pages/Funders';
import GrokShift from './pages/GrokShift';
import Contact from './pages/Contact';
import Try from './pages/Try';
import Dashboard from './pages/Dashboard';  // Internal command center

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/funders" element={<Funders />} />
            <Route path="/grokshift" element={<GrokShift />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/try" element={<Try />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

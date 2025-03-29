import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
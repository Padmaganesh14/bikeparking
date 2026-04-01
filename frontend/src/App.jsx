import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EntryPage from './pages/EntryPage';
import ExitPage from './pages/ExitPage';
import AdminDashboard from './pages/AdminDashboard';
import AdBanner from './components/AdBanner';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/exit" element={<ExitPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        {/* AdSense Ad — visible with proper dimensions */}
        <AdBanner adSlot="YOUR_SLOT_ID" adFormat="auto" />
      </div>
    </Router>
  );
}

export default App;

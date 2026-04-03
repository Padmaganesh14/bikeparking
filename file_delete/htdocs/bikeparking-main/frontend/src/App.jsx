 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import EntryPage from "./pages/EntryPage";
import ExitPage from "./pages/ExitPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/exit" element={<ExitPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

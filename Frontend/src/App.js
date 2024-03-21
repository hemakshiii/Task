
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DisplayData from './DisplayData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display-data" element={<DisplayData />} />
      </Routes>
    </Router>
  );
}

export default App;

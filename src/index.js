import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <Router>
      <HashRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
        </HashRouter>
    // </Router>
  // </React.StrictMode>
);


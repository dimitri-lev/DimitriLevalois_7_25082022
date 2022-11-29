import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <div className="error-message">
        La page que vous cherchez n'existe pas 🙈
      </div>
      <button class="error-btn" onClick={() => navigate('/')}>
        Retour Accueil
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

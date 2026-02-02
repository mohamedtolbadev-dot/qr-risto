import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Success from '../pages/Success';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={
          <div className="min-h-screen bg-light flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl mb-4 block">😕</span>
              <h1 className="text-3xl font-bold text-dark mb-4">الصفحة غير موجودة</h1>
              <p className="text-gray-600 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
              <a 
                href="/"
                className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                العودة للرئيسية
              </a>
            </div>
          </div>
        }/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

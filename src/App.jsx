import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import EcommerceChatbot from './components/Aishoppingchat';

function App() {
  return (
    <BrowserRouter>
      <EcommerceChatbot ></EcommerceChatbot> </BrowserRouter>
  );
}

export default App;
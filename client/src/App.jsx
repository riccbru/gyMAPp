import './App.css'
import API from './lib/API';
import { useContext, useState } from 'react';
import { Home } from '@/pages/Home';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

const handleErrors = (err) => {
  let msg = '';
  if (err.error)
    msg = err.error;
  else if (err.errors) {
    if (err.errors[0].msg)
      msg = err.errors[0].msg + " : " + err.errors[0].path;
  } else if (Array.isArray(err))
    msg = err[0].msg + " : " + err[0].path;
  else if (typeof err === "string") msg = String(err);
  else msg = "Unknown Error";
  // console.log(`handleErrors(App.jsx) - msg:\t${msg}`);
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppRouted />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRouted() {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAuth();

  return (
    <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<></>} />
        </Route>
    </Routes>
  );
}


export default App

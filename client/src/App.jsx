import './App.css'
import { Home } from '@/pages/Home';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <AppRouted />
    </BrowserRouter>
  );
}

function AppRouted() {

  const [isLogged, setIsLogged] = useState(false);

  return (
    <Routes>
        <Route path="/" element={<Home isLogged={isLogged} setIsLogged={setIsLogged} />}>
          <Route path="*" element={<></>} />
        </Route>
    </Routes>
  );
}


export default App

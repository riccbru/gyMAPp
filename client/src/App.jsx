import './App.css'
import { useDarkMode } from './hooks/useDarkMode';
import { Button } from './components/ui/button';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

import { Home } from '@/pages/Home';

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

  return (
    <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<></>} />
        </Route>
    </Routes>
  );
}


export default App

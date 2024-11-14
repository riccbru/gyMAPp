import './App.css'
import { useDarkMode } from './hooks/useDarkMode';
import { Button } from './components/ui/button';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

function App() {
  return (
    <BrowserRouter future={{
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
        <Route path="/" element={<ThemeButton />} />
    </Routes>
  );
}

function ThemeButton() {
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleClick = () => {
    setDarkTheme(!darkTheme);
  }

  return(
    <div className='flex h-screen w-screen bg-white dark:bg-background items-center justify-center mx-auto'>
    <Button className='justify-center bg-background dark:bg-white text-white dark:text-background rounded-3xl hover:bg-background hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer' onClick={handleClick}>
      {darkTheme ? <Sun /> : <Moon />}
    </Button>
    </div>
  );
}

export default App

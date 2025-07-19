import './App.css'
import { Stats } from './pages/Stats';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Meals } from './pages/Meals';
import { Signup } from '@/pages/Signup';
import { Common } from '@/pages/Common';
import { useAuth } from '@/hooks/useAuth';
import { Workouts } from '@/pages/Workouts';
import { NotFound } from '@/pages/NotFound';
import { FileDownload } from '@/pages/FileDownload';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NewBia } from './pages/NewBia/NewBia';

function App() {

  const future = {
    v7_startTransition:   true,
    v7_relativeSplatPath: true,
  };

  return (
    <BrowserRouter future={future}>
      <AuthProvider>
        <DataProvider>
          <AppRouted />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRouted() {
  
  const { isLogged } = useAuth();

  return (
    <Routes>
        <Route path="/" element={isLogged ? <Common /> : <Navigate to="/login" />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/file" element={<FileDownload />} />
          <Route path="/bia" element={<NewBia />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={!isLogged ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!isLogged ? <Signup /> : <Navigate to="/login" />} />
    </Routes>
  );
}


export default App;

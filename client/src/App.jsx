import './App.css'
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { Common } from '@/pages/Common';
import { useAuth } from '@/hooks/useAuth';
import { NotFound } from '@/pages/NotFound';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
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
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={!isLogged ? <Login /> : <Navigate to="/" />} />
    </Routes>
  );
}


export default App;

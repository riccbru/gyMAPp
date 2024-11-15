import './App.css'
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { Common } from '@/pages/Common';
import { useAuth } from '@/hooks/useAuth';
import { NotFound } from '@/pages/NotFound';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

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

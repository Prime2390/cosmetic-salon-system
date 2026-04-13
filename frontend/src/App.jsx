import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserLayout from './layouts/UserLayout';
import UserHomePage from './pages/UserHomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/logowanie" element={<LoginPage />} />

        <Route path="/panel" element={<UserLayout />}>
          <Route index element={<UserHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
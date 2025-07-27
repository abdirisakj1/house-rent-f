import './App.css'
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextProvider } from "./UserContext";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPlacesList from "./pages/AdminPlacesList";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function ProtectedUserRoute({ children }) {
  const { user, ready } = useContext(UserContext);
  const location = useLocation();
  if (!ready) return null;
  if (user && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedUserRoute>
            <Layout />
          </ProtectedUserRoute>
        }>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route index element={<AdminPlacesList />} />
          <Route path="dashboard" element={<AdminPlacesList />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="places/new" element={<PlacesFormPage />} />
          <Route path="places/:id" element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App

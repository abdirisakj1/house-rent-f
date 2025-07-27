import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AdminPlacesList from "./AdminPlacesList";
import UsersManagement from "./UsersManagement";
import PlacesFormPage from "./PlacesFormPage";
import axios from "axios";

export default function AdminDashboard() {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('places');

  // Persist user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && !user) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  async function logout() {
    await axios.post('https://house-rent-bk.onrender.com/api/logout');
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user.name}</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-6">
            <button
              onClick={() => setActiveTab('places')}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                activeTab === 'places' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📍 Places Management
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                activeTab === 'bookings' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📅 Bookings Management
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                activeTab === 'users' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              👥 Users Management
            </button>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="w-md bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'places' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Places Management</h2>
              <PlacesFormPage />
            </div>
          )}
          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Bookings Management</h2>
              <AdminPlacesList />
            </div>
          )}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Users Management</h2>
              <UsersManagement />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
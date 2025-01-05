import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Marketplace from './pages/Marketplace';
import FarmerDashboard from './pages/FarmerDashboard';
import ResourcesServices from './pages/ResourcesServices';
import ProjectDetails from './pages/ProjectDetails';
import ProjectRegistration from './pages/ProjectRegistration';
import ProjectList from './pages/ProjectList';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ProjectCollaboration from './pages/ProjectCollaboration';
import InvestorWallet from './pages/InvestorWallet';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<ResourcesServices />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/projects" element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          } />
          <Route path="/project/:id" element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          } />
          <Route path="/project/:id/collaborate" element={
            <ProtectedRoute>
              <ProjectCollaboration />
            </ProtectedRoute>
          } />
          <Route path="/register-project" element={
            <ProtectedRoute>
              <ProjectRegistration />
            </ProtectedRoute>
          } />
          <Route path="/wallet" element={
            <ProtectedRoute>
              <InvestorWallet />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
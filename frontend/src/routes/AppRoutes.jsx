import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import ProtectedRoute from '../components/ProtectedRoute'
import Report from '../pages/Report'
import UserDashboard from '../pages/UserDashboard'
import IssueDetails from '../pages/IssueDetails'
import WorkerUploadProof from '../pages/WorkerUploadProof'
import WorkerDashboard from '../pages/WorkerDashboard'
import UserReportDetails from '../pages/UserReportDetails'
import Features from '../components/Features'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route path="/"         element={<Landing />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/features" element={<Features />} />

      {/* ── Smart role-based dashboard redirect ── */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ── Admin ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/issues/:id"
        element={
          <ProtectedRoute allowedRoles={["admin", "worker"]}>
            <IssueDetails />
          </ProtectedRoute>
        }
      />

      {/* ── Citizen ── */}
      <Route
        path="/userDashboard"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/report/:id"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <UserReportDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <Report />
          </ProtectedRoute>
        }
      />

      {/* ── Worker ── */}
      <Route
        path="/workerDashboard"
        element={
          <ProtectedRoute allowedRoles={["worker"]}>
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/issues/:id/upload-proof"
        element={
          <ProtectedRoute allowedRoles={["worker"]}>
            <WorkerUploadProof />
          </ProtectedRoute>
        }
      />

      {/* ── 404 ── */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes

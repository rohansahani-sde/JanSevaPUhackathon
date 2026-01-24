import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from '../pages/landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import ProtectedRoute from '../components/ProtectedRoute'
import Report from '../pages/Report'
import UserDashboard from '../pages/UserDashboard'
import IssueDetails from '../pages/IssueDetails'
import WorkerUploadProof from '../pages/WorkerUploadProof'
import WorkerDashboard from '../pages/WorkerDashboard'

const AppRoutes = () => {
  return (
    <BrowserRouter>
            <Routes>
                {/* <Route path="/" element= {<ProtectedRoute > <Landing /> </ProtectedRoute> } /> */}
                <Route path="/" element= { <Landing /> } />
                <Route path="/login" element= {<Login /> } />
                <Route path="/register" element= {<Register /> } />
                <Route path="/admin/issues/:id" element={<IssueDetails />} />
                <Route path="/userDashboard" element= {<UserDashboard /> } />
                {/* <Route path="/worker/issues/upload-proof" element={<ProtectedRoute><WorkerUploadProof /></ProtectedRoute>} /> */}
                <Route
                path="/worker/issues/:id/upload-proof"
                element={
                    <ProtectedRoute>
                        <WorkerUploadProof />
                    </ProtectedRoute>
                }
                />


                <Route path="/admin" element= {<ProtectedRoute > <Admin /> </ProtectedRoute> } />
                <Route path="/workerDashboard" element= { <WorkerDashboard />  } />
                {/* <Route path="/report" element= {<ProtectedRoute > <Report /> </ProtectedRoute> } /> */}
                <Route path="/report" element= { <Report />  } />

            </Routes>
        
        </BrowserRouter>
  )
}

export default AppRoutes
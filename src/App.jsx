import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRouter } from './routes'
import { Admin, Dashboard, Error404, Login, SendInvitation, ConfirmAssistance, Unauthorized } from './modules';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={'/confirm-assistance'} />} />
                <Route path="/confirm-assistance" element={<ConfirmAssistance />} />
                <Route path="/admin" element={<PrivateRouter permissions={["admin"]} element={<Navigate to={'/admin/Dashboard'} />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path='/admin/dashboard' element={<PrivateRouter permissions={["admin"]} element={<Dashboard />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path='/admin/list' element={<PrivateRouter permissions={["admin"]} element={<Admin />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path='/admin/send-invitation' element={<PrivateRouter permissions={["admin"]} element={<SendInvitation />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    )
}

export default App
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRouter } from './routes'
import { Dashboard, Error404, Login, ConfirmAssistance, Unauthorized, InvitationNegated, InvitationAccepted } from './modules';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={'/confirm-assistance'} />} />
                <Route path="/confirm-assistance" element={<ConfirmAssistance />} />
                <Route path="/confirm-assistance/:id" element={<ConfirmAssistance />} />
                <Route path="/admin" element={<PrivateRouter permissions={["admin"]} element={<Navigate to={'/admin/Dashboard'} />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path='/admin/dashboard' element={<PrivateRouter permissions={["admin"]} element={<Dashboard />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path='/admin/invitation-accepted' element={<PrivateRouter permissions={["admin"]} element={<InvitationAccepted />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path='/admin/invitation-negated' element={<PrivateRouter permissions={["admin"]} element={<InvitationNegated />} unauthorized={<Navigate to="/unauthorized" />} />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    )
}

export default App
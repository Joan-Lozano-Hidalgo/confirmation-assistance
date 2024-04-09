import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminLayout } from '../layouts'

const PrivateRouter = ({ element, permissions, unauthorized }) => {

    const user = JSON.parse(localStorage.getItem('user')) || null

    const haspermission = () => {
        // if (!permissions) return true
        // if (!user) return false
        return permissions.some(permission => user.permissions.includes(permission))
    }

    return (
        <Fragment>
            {
                // !user ?
                // haspermission() ?
                <AdminLayout>
                    {element}
                </AdminLayout>
                // : unauthorized
                // : <Navigate to="/login" />
            }
        </Fragment>
    )
}

export default PrivateRouter
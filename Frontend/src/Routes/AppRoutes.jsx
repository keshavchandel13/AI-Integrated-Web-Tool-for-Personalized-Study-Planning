import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../Pages/AuthPage'
import HomePage from '../Pages/HomePage'
import Layout from '../Pages/Layout'
export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route element={<Layout />}>
                    <Route path="/home" element={<HomePage />} />

                </Route>
            </Routes>

        </div>
    )
}

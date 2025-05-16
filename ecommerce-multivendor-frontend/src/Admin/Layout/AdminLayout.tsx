"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import AdminNavbar from "./AdminNav.tsx/AdminNavbar"
import { useAppSelecter } from "../../app/Store"
import { Navigate } from "react-router-dom"

interface AdminLayoutProps {
    children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {

    const {isLoggedIn} = useAppSelecter((state) => state.admin)

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />
    }

    return (
        <div className="flex min-h-screen flex-col">
            <AdminNavbar />
            <motion.main
                className="flex-1 p-4 md:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.main>
        </div>
    )
}

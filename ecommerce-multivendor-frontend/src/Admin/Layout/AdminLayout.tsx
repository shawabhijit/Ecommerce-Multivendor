"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

// import { AdminTopbar } from "./admin-topbar"

interface AdminLayoutProps {
    children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* <AdminTopbar /> */}
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

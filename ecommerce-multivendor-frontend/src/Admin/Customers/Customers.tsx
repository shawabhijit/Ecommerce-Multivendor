import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomerTable, { Customer } from "./CustomerTable";

const mockCustomers: Customer[] = [
    {
        id: "c1d1fa43-2b6e-4d9e-84ec-f24d3f471b59",
        name: "Sophia Moore",
        email: "sophia.moore@example.com",
        joinedDate: "4/15/2025",
        status: "active",
    },
    {
        id: "fd9cfda6-7ab1-49cb-86cb-fd8e6c8a30fc",
        name: "Liam Carter",
        email: "liam.carter@example.com",
        joinedDate: "5/5/2025",
        status: "banned",
    },
    {
        id: "e1b8ffb1-f321-4e85-b13a-8cbdcbca8f4d",
        name: "Emma Johnson",
        email: "emma.johnson@example.com",
        joinedDate: "4/30/2025",
        status: "active",
    },
    {
        id: "9233f2f3-4187-4ce7-a553-b4bb442c7c6a",
        name: "Noah Lee",
        email: "noah.lee@example.com",
        joinedDate: "3/28/2025",
        status: "banned",
    },
    {
        id: "6a4e7f1b-1cf0-406f-97f6-505a0e9c2784",
        name: "Ava Martinez",
        email: "ava.martinez@example.com",
        joinedDate: "4/10/2025",
        status: "active",
    },
    {
        id: "a98b4e56-f6e6-4637-9f98-5b218d2f3b0b",
        name: "Elijah Davis",
        email: "elijah.davis@example.com",
        joinedDate: "5/3/2025",
        status: "active",
    },
    {
        id: "b7e845a3-79d7-40e5-a878-27b5b9ed1f0a",
        name: "Isabella Brown",
        email: "isabella.brown@example.com",
        joinedDate: "3/26/2025",
        status: "banned",
    },
    {
        id: "e8f74a1c-3c2a-49e7-8103-14fbd09f6d34",
        name: "James Wilson",
        email: "james.wilson@example.com",
        joinedDate: "4/20/2025",
        status: "active",
    },
    {
        id: "f4f0c25a-fb94-4021-a8c3-33003de1b7e2",
        name: "Mia Garcia",
        email: "mia.garcia@example.com",
        joinedDate: "4/27/2025",
        status: "banned",
    },
    {
        id: "0bcb4459-d9fc-4d92-b245-eabf3a3c4196",
        name: "Benjamin Walker",
        email: "benjamin.walker@example.com",
        joinedDate: "5/12/2025",
        status: "active",
    },
];
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};


const Customers = ({allCustomers} :any) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API data fetching
        const fetchCustomers = async () => {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setCustomers(mockCustomers);
            setIsLoading(false);
        };

        fetchCustomers();
    }, []);

    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
            {isLoading ? (
                <div className="grid gap-4">
                    <div className="h-10 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
                    <div className="h-96 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
            ) : (
                <div className="grid gap-6 ">
                    <CustomerTable customers={customers} />
                </div>
            )}
        </motion.div>
    );
};

export default Customers;
import { useState } from "react";
import { motion } from "framer-motion";
import { Ban, Check, Search} from "lucide-react";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../Components/ui/alert-dialog";
import { Badge } from "../../Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";

export interface Customer {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: "active" | "banned";
}

interface CustomerTableProps {
  customers: Customer[];
}

export const tableRowAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const CustomerTable = ({ customers }: CustomerTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [tableCustomers, setTableCustomers] = useState<Customer[]>(customers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = tableCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const confirmStatusToggle = () => {
    if (!selectedCustomer) return;

    const newStatus = selectedCustomer.status === "active" ? "banned" : "active";
    const updatedCustomers = tableCustomers.map((c) =>
      c.id === selectedCustomer.id ? { ...c, status: newStatus as "active" | "banned" } : c
    );

    setTableCustomers(updatedCustomers);

    // toast({
    //   title: `Customer ${newStatus === "active" ? "Activated" : "Banned"}`,
    //   description: `${selectedCustomer.name} has been ${newStatus === "active" ? "activated" : "banned"}.`,
    //   variant: "default",
    // });

    setSelectedCustomer(null);
  };

  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="w-full overflow-hidden"
    >
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle>Customers</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="w-full pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-[200px]">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <motion.tr
                      key={customer.id}
                      variants={tableRowAnimation}
                      className="border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.joinedDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={customer.status === "active" ? "default" : "destructive"}
                          className={`${customer.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                        >
                          {customer.status === "active" ? "Active" : "Banned"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant={customer.status === "active" ? "destructive" : "default"}
                              size="sm"
                              onClick={() => handleToggleStatus(customer)}
                              className={`${customer.status === "active" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-[#F97316] text-white hover:bg-[#f97416df]"}`}
                            >
                              {customer.status === "active" ? (
                                <>
                                  <Ban className="mr-1 h-3 w-3" /> Ban
                                </>
                              ) : (
                                <>
                                  <Check className="mr-1 h-3 w-3" /> Activate
                                </>
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {customer.status === "active"
                                  ? "Ban Customer"
                                  : "Activate Customer"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {customer.status === "active"
                                  ? `Are you sure you want to ban ${customer.name}? They will no longer be able to access the platform.`
                                  : `Are you sure you want to activate ${customer.name}? They will regain access to the platform.`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={confirmStatusToggle}>
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="text-sm text-gray-500">
              Showing {filteredCustomers.length} of {tableCustomers.length} customers
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerTable;
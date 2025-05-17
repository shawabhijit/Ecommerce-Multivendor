import { useState } from "react";
import { motion } from "framer-motion";
import { Ban, Check, Eye, Search } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../Components/ui/dialog";
import { Badge } from "../../Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";    
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../Components/ui/select";
import { Vendor } from "./VendorList";
import { containerAnimation, tableRowAnimation } from "../Customers/CustomerTable";

interface VendorTableProps {
    vendors: Vendor[];
}

const VendorTable = ({ vendors }: VendorTableProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [tableVendors, setTableVendors] = useState<Vendor[]>(vendors);
    const [viewVendorOpen, setViewVendorOpen] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
    };

    const filteredVendors = tableVendors.filter((vendor) => {
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            vendor.verificationStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleVerifyVendor = (vendor: Vendor) => {
        setSelectedVendor(vendor);
    };

    const confirmVerification = () => {
        if (!selectedVendor) return;

        const updatedVendors = tableVendors.map((v) =>
            v.id === selectedVendor.id
                ? {
                    ...v,
                    verificationStatus: v.verificationStatus === "verified"
                        ? "pending" as const
                        : "verified" as const
                }
                : v
        );

        setTableVendors(updatedVendors);

        // toast({
        //     title: selectedVendor.verificationStatus === "verified" ? "Verification Revoked" : "Vendor Verified",
        //     description: `${selectedVendor.name}'s verification status has been updated.`,
        //     variant: "default",
        // });

        setSelectedVendor(null);
    };

    const handleViewVendor = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setViewVendorOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "verified":
                return "bg-green-500";
            case "pending":
                return "bg-yellow-500";
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <Card className="border-none shadow-none">
                <CardHeader>
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <CardTitle>Vendors</CardTitle>
                        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                            <Select
                                value={statusFilter}
                                onValueChange={handleStatusFilterChange}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="verified">Verified</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Search vendors..."
                                    className="w-full pl-8 sm:w-[300px]"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Business Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Verification</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredVendors.length > 0 ? (
                                    filteredVendors.map((vendor) => (
                                        <motion.tr
                                            key={vendor.id}
                                            variants={tableRowAnimation}
                                            className="border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <TableCell className="font-medium">
                                                {vendor.name}
                                            </TableCell>
                                            <TableCell>{vendor.businessName}</TableCell>
                                            <TableCell>{vendor.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={
                                                        vendor.verificationStatus === "verified"
                                                            ? "bg-green-500 text-white hover:bg-green-600"
                                                            : vendor.verificationStatus === "pending"
                                                                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                                : "bg-red-500 text-white hover:bg-red-600"
                                                    }
                                                >
                                                    {vendor.verificationStatus.charAt(0).toUpperCase() +
                                                        vendor.verificationStatus.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{vendor.productsCount}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewVendor(vendor)}
                                                    >
                                                        <Eye className="mr-1 h-3 w-3" /> View
                                                    </Button>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant={vendor.verificationStatus === "verified" ? "destructive" : "default"}
                                                                size="sm"
                                                                onClick={() => handleVerifyVendor(vendor)}
                                                            >
                                                                {vendor.verificationStatus === "verified" ? (
                                                                    <>
                                                                        <Ban className="mr-1 h-3 w-3" /> Revoke
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Check className="mr-1 h-3 w-3" /> Verify
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    {vendor.verificationStatus === "verified"
                                                                        ? "Revoke Verification"
                                                                        : "Verify Vendor"}
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    {vendor.verificationStatus === "verified"
                                                                        ? `Are you sure you want to revoke the verification for ${vendor.name}?`
                                                                        : `Are you sure you want to verify ${vendor.name}?`}
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={confirmVerification}>
                                                                    Confirm
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No vendors found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <div className="text-sm text-gray-500">
                            Showing {filteredVendors.length} of {tableVendors.length} vendors
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={viewVendorOpen} onOpenChange={setViewVendorOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Vendor Details</DialogTitle>
                        <DialogDescription>
                            Detailed information about the vendor
                        </DialogDescription>
                    </DialogHeader>

                    {selectedVendor && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium text-gray-500">Name</h3>
                                    <p>{selectedVendor.name}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Business Name</h3>
                                    <p>{selectedVendor.businessName}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Email</h3>
                                    <p>{selectedVendor.email}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Joined</h3>
                                    <p>{selectedVendor.joinedDate}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Products</h3>
                                    <p>{selectedVendor.productsCount}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Status</h3>
                                    <div className="mt-1">
                                        <Badge
                                            className={
                                                selectedVendor.verificationStatus === "verified"
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : selectedVendor.verificationStatus === "pending"
                                                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                        : "bg-red-500 text-white hover:bg-red-600"
                                            }
                                        >
                                            {selectedVendor.verificationStatus.charAt(0).toUpperCase() +
                                                selectedVendor.verificationStatus.slice(1)}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    className="w-full"
                                    onClick={() => setViewVendorOpen(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    );
};

export default VendorTable;
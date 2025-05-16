import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../../Components/ui/dialog'
import { Card, CardContent, CardHeader } from '../../Components/ui/card'
import { Search } from 'lucide-react'
import { Input } from '../../Components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/ui/table'
import { Button } from '../../Components/ui/button'

const VIewCustomersDialog = ({totalCustomer , openCustomers, setOpenCustomers }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [actionType, setActionType] = useState<"ban" | "unban" | null>(null)

    // Handle customer action (ban/unban)
    const handleCustomerAction = (customer: any, action: "ban" | "unban") => {
        setSelectedCustomer(customer)
        setActionType(action)
        setConfirmDialogOpen(true)
    }

    console.log("filteredCustomers", totalCustomer)
    
    return (
        <Dialog open={openCustomers} onOpenChange={setOpenCustomers}>
            <DialogContent className='md:min-w-5xl min-w-2xl'>
                <DialogHeader className='pl-6 pr-6'>
                    <span className='text-xl font-semibold '>All Customers</span>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-gray-500'>Total Customers</span>
                            <span className='text-sm text-gray-500'>{totalCustomer.size}</span>
                        </div>
                    </div>
                </DialogHeader>
                <Card className='border-none shadow-none w-full'>
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="flex gap-2 w-full justify-between">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search customers..."
                                    className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="banned">Banned</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="hidden md:table-cell">Joined Date</TableHead>
                                        <TableHead className="hidden md:table-cell">Orders</TableHead>
                                        <TableHead className="hidden md:table-cell">Total Spent</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {totalCustomer.size === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No customers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        totalCustomer.map((customer) => (
                                            <TableRow key={customer.id}>
                                                <TableCell className="font-medium">{customer.username}</TableCell>
                                                <TableCell>{customer.email}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {customer?.joiningDate}
                                                </TableCell>
                                                {/* <TableCell className="hidden md:table-cell">{customer.orders}</TableCell>
                                                <TableCell className="hidden md:table-cell">${customer.spent.toFixed(2)}</TableCell> */}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div>
                                <Button variant="default" className='cursor-pointer' onClick={() => setOpenCustomers(false)}>
                                    CLose
                                </Button>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <div className="text-sm text-muted-foreground">
                                    Showing <span className="font-medium">{totalCustomer.length}</span> of{" "}
                                    <span className="font-medium">{totalCustomer.length}</span> customers
                                </div>
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default VIewCustomersDialog
"use client"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, DollarSign, IndianRupee, Package, ShoppingCart, Users } from "lucide-react"
import {Area,AreaChart,Bar,BarChart,CartesianGrid,Cell, Legend,Pie,PieChart,ResponsiveContainer,Tooltip,XAxis,YAxis,} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"

import { AdminLayout } from "../Layout/AdminLayout"
import { all } from "axios"

// Sample data for charts
const salesData = [
  { name: "Mon", sales: 0 },
  { name: "Tue", sales: 0 },
  { name: "Wed", sales: 0 },
  { name: "Thu", sales: 0 },
  { name: "Fri", sales: 0 },
  { name: "Sat", sales: 0 },
  { name: "Sun", sales: 3490 },
]

const orderStatusData = [
  { name: "Pending", value: 75, color: "#3B82F6" },
  { name: "Shipped", value:15, color: "#10B981" },
  { name: "Cancelled", value: 10, color: "#F97316" },
]

const vendorSignupData = [
  { month: "Jan", signups: 12 },
  { month: "Feb", signups: 19 },
  { month: "Mar", signups: 15 },
  { month: "Apr", signups: 25 },
  { month: "May", signups: 32 },
  { month: "Jun", signups: 28 },
]

export default function Dashboard({allSelers , allCustomers , allOrders}: any) {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const totalEarnings = allOrders.filter((order: any) => order.orderStatus === "COMPLETE").reduce((acc:any, order:any) => acc + order.totalMrpPrice , 0)

  return (
    <AdminLayout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full bg-green-100 text-green-700`}>
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm text-green-600`}>
                      +12.5%
                    </span>
                    <ArrowUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                  <p className="text-2xl font-bold">{allOrders.length}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full bg-blue-100 text-blue-700`}>
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm text-green-600`}>
                      +8.2%
                    </span>
                    <ArrowUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Vendors</h3>
                  <p className="text-2xl font-bold">{allSelers.length}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full bg-purple-100 text-purple-700`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm text-green-600`}>
                      +4
                    </span>
                    <ArrowUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                  <p className="text-2xl font-bold">{allCustomers.length}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full bg-amber-100 text-amber-700`}>
                    <IndianRupee className="h-5 w-5" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm text-green-600`}>
                      +18.3%
                    </span>
                    <ArrowUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
                  <p className="text-2xl font-bold">₹{totalEarnings}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="7days">
            <div className="flex items-center justify-between">
              <CardTitle>Sales Overview</CardTitle>
              <TabsList>
                <TabsTrigger value="7days">7 days</TabsTrigger>
                <TabsTrigger value="30days">30 days</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="7days" className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="30days" className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData.concat(salesData)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Distribution of current order statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Signup Trends</CardTitle>
              <CardDescription>New vendor registrations by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendorSignupData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="signups" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}

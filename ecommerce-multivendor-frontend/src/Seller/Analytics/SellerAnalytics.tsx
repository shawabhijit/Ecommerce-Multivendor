import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { ShoppingBag, DollarSign, Package, Users, CheckCircle, XCircle, ArrowUpRight, Globe, TrendingUp, MousePointerClick, PieChart } from "lucide-react";
import { motion } from "motion/react"
import { Bar, BarChart, CartesianGrid, Legend, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CategoryPieChart from './Charts/CategoryPieChart';
import OrderStatusChart from './Charts/OrderStatusChart';
import EarningsBarChart from './Charts/EarningsBarChart';
import SalesChart from './Charts/SalessChart';
import ConversionRateChart from './Charts/ConversionRateChart';
import TrafficSourceChart from './Charts/TraficSourceChart';

const SellerAnalytics = () => {
    const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | '90days'>('30days');

    return (
        <div className="p-4 h-full w-full overflow-auto">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-[#1A1F2C]">Seller Analytics</h1>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant={timeFilter === '7days' ? 'default' : 'outline'}
                            onClick={() => setTimeFilter('7days')}
                            className="text-xs h-8"
                        >
                            Last 7 Days
                        </Button>
                        <Button
                            variant={timeFilter === '30days' ? 'default' : 'outline'}
                            onClick={() => setTimeFilter('30days')}
                            className="text-xs h-8"
                        >
                            Last 30 Days
                        </Button>
                        <Button
                            variant={timeFilter === '90days' ? 'default' : 'outline'}
                            onClick={() => setTimeFilter('90days')}
                            className="text-xs h-8"
                        >
                            Last 90 Days
                        </Button>
                    </div>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className='p-0'>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-500">Total Visitors</h3>
                                    <p className="text-2xl font-bold">12,345</p>
                                    <p className="text-sm text-green-600">+12.5% from last period</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className='p-0'>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-full bg-green-100 text-green-700">
                                        <MousePointerClick className="h-5 w-5" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
                                    <p className="text-2xl font-bold">3.2%</p>
                                    <p className="text-sm text-green-600">+0.5% from last period</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className='p-0'>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
                                    <p className="text-2xl font-bold">$85.20</p>
                                    <p className="text-sm text-green-600">+8.3% from last period</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Card className='p-0'>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-500">Page Views</h3>
                                    <p className="text-2xl font-bold">45,678</p>
                                    <p className="text-sm text-green-600">+15.2% from last period</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Charts Section - 2/3 width */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                        <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-4 h-full">
                                <h3 className="text-sm font-semibold mb-2">Sales Trend</h3>
                                <div className="h-[calc(100%-30px)]">
                                    <SalesChart timeFilter={timeFilter} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-4 h-full">
                                <h3 className="text-sm font-semibold mb-2">Monthly Earnings</h3>
                                <div className="h-[calc(100%-30px)]">
                                    <EarningsBarChart timeFilter={timeFilter} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-4 h-full">
                                <h3 className="text-sm font-semibold mb-2">Product Categories</h3>
                                <div className="h-[calc(100%-30px)]">
                                    <CategoryPieChart />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-4 h-full">
                                <h3 className="text-sm font-semibold mb-2">Order Status</h3>
                                <div className="h-[calc(100%-30px)]">
                                    <OrderStatusChart />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side Content - 1/3 width */}
                    <div className="space-y-4">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4 h-full">
                                <h3 className="text-sm font-semibold mb-2">Trafic Source</h3>
                                <div className="h-[calc(100%-30px)]">
                                    <TrafficSourceChart />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4 h-full">
                                <h3 className="text-sm font-semibold mb-2">Conversion Rate</h3>
                                <div className="h-[calc(100%-30px)]">
                                    <ConversionRateChart timeFilter={timeFilter} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAnalytics;
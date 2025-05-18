import { useState } from 'react';
import { Card } from '../../Components/ui/card';
import { ArrowDownCircle, ArrowUpCircle, Clock, DollarSign } from 'lucide-react';
import { Button } from '../../Components/ui/button';
import EarningsChart from './EarningsChart';
import PayoutHistory from './PayoutHistory';
import RequestPayoutDialog from './RequestPayoutDialog';


const SellerEarnings = () => {
    const threshold = 100; // Example threshold
    const availableBalance = 150; // Example balance

    const [openRequestPayout, setOpenRequestPayout] = useState(false);

    const handlePayoutRequest = () => {
        setOpenRequestPayout(true)
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className='mb-10 '>
                    <h1 className="text-2xl font-bold text-[#1A1F2C]">Earnings Dashboard</h1>
                    <p className='text-gray-500 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis mollitia dolores ea numquam quia nulla aut cum. Magni, ea sunt.</p>
                </div>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                                <h3 className="text-2xl font-bold mt-2">$2,458.50</h3>
                                <p className="text-sm text-green-600 flex items-center mt-2">
                                    <ArrowUpCircle className="w-4 h-4 mr-1" />
                                    12% from last month
                                </p>
                            </div>
                            <DollarSign className="w-8 h-8 text-[#7E69AB]" />
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Withdrawn</p>
                                <h3 className="text-2xl font-bold mt-2">$1,890.00</h3>
                                <p className="text-sm text-muted-foreground mt-2">Last payout: 15 Apr</p>
                            </div>
                            <ArrowDownCircle className="w-8 h-8 text-[#6E59A5]" />
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                                <h3 className="text-2xl font-bold mt-2">${availableBalance}</h3>
                                <div className="mt-2">
                                    {availableBalance >= threshold ? (
                                        <Button
                                            onClick={handlePayoutRequest}
                                            className="bg-[#7E69AB] hover:bg-[#6E59A5] text-white cursor-pointer"
                                        >
                                            Request Payout
                                        </Button>
                                    ) : (
                                        <p className="text-sm text-muted-foreground flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            ${threshold - availableBalance} more to request payout
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#9b87f5] flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
                        <EarningsChart />
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Payout Status</h3>
                        <PayoutHistory />
                    </Card>
                </div>
            </div>
            {
                openRequestPayout && <RequestPayoutDialog availableBalance={availableBalance} openRequestPayout={openRequestPayout} setOpenRequestPayout={setOpenRequestPayout} />
            }
        </div>
    );
};

export default SellerEarnings;
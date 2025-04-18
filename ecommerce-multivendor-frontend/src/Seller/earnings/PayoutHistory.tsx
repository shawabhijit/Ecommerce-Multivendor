import { Badge } from "../../Components/ui/badge";

const PayoutHistory = () => {
    const payouts = [
        { id: 1, amount: 890.00, date: '2025-04-15', status: 'processed' },
        { id: 2, amount: 1000.00, date: '2025-04-01', status: 'processed' },
        { id: 3, amount: 750.50, date: '2025-03-15', status: 'pending' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payouts.map((payout) => (
                        <tr key={payout.id} className="border-b last:border-0">
                            <td className="py-3 px-4">
                                {new Date(payout.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </td>
                            <td className="py-3 px-4">${payout.amount.toFixed(2)}</td>
                            <td className="py-3 px-4">
                                <Badge
                                    variant="secondary"
                                    className={`${payout.status === 'processed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-orange-100 text-orange-800'
                                        }`}
                                >
                                    {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayoutHistory;
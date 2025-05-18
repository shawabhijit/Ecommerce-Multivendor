import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart";

interface EarningsBarChartProps {
    timeFilter: '7days' | '30days' | '90days';
}

const EarningsBarChart = ({ timeFilter }: EarningsBarChartProps) => {
    // Generate sample data based on timeFilter
    const generateData = () => {
        if (timeFilter === '7days') {
            return [
                { name: 'Mon', earnings: 420 },
                { name: 'Tue', earnings: 580 },
                { name: 'Wed', earnings: 390 },
                { name: 'Thu', earnings: 620 },
                { name: 'Fri', earnings: 540 },
                { name: 'Sat', earnings: 780 },
                { name: 'Sun', earnings: 490 },
            ];
        } else if (timeFilter === '30days') {
            // Group data into weeks for the 30 days view
            return [
                { name: 'Week 1', earnings: 2450 },
                { name: 'Week 2', earnings: 2780 },
                { name: 'Week 3', earnings: 1890 },
                { name: 'Week 4', earnings: 2340 },
            ];
        } else {
            // Return monthly data for 90 days view
            return [
                { name: 'Jan', earnings: 3200 },
                { name: 'Feb', earnings: 2800 },
                { name: 'Mar', earnings: 3900 },
            ];
        }
    };

    const data = generateData();

    return (
        <div className="w-full h-full">
            <ChartContainer
                config={{
                    earnings: {
                        label: "Earnings",
                        color: "#33C3F0",
                    },
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            tickFormatter={(value) => `$${value}`}
                            width={50}
                        />
                        <ChartTooltip
                            content={({ active, payload }) => (
                                <ChartTooltipContent
                                    active={active}
                                    payload={payload}
                                    formatter={(value) => [`$${value}`, 'Earnings']}
                                />
                            )}
                        />
                        <Bar
                            dataKey="earnings"
                            name="earnings"
                            fill="#33C3F0"
                            radius={[4, 4, 0, 0]}
                            animationDuration={500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};

export default EarningsBarChart;
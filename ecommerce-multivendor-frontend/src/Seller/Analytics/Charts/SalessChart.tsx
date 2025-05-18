import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart";

interface SalesChartProps {
    timeFilter: '7days' | '30days' | '90days';
}

const SalesChart = ({ timeFilter }: SalesChartProps) => {
    // Generate sample data based on timeFilter
    const generateData = () => {
        if (timeFilter === '7days') {
            return [
                { day: 'Mon', sales: 1200 },
                { day: 'Tue', sales: 1800 },
                { day: 'Wed', sales: 1400 },
                { day: 'Thu', sales: 2200 },
                { day: 'Fri', sales: 1900 },
                { day: 'Sat', sales: 2400 },
                { day: 'Sun', sales: 1600 },
            ];
        } else if (timeFilter === '30days') {
            return Array.from({ length: 30 }).map((_, i) => ({
                day: `${i + 1}`,
                sales: Math.floor(Math.random() * 1500) + 1000,
            }));
        } else {
            return Array.from({ length: 12 }).map((_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                return {
                    day: date.toLocaleDateString('en-US', { month: 'short' }),
                    sales: Math.floor(Math.random() * 2000) + 1500,
                };
            }).reverse();
        }
    };

    const data = generateData();

    return (
        <div className="w-full h-full">
            <ChartContainer
                config={{
                    sales: {
                        label: "Sales",
                        color: "#7E69AB",
                    },
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="day"
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
                                    formatter={(value) => [`$${value}`, 'Sales']}
                                />
                            )}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            name="sales"
                            stroke="#7E69AB"
                            strokeWidth={2}
                            dot={{ fill: '#7E69AB', r: 2 }}
                            activeDot={{ r: 6 }}
                            animationDuration={500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};

export default SalesChart;
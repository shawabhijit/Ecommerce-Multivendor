import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart";

interface ConversionRateChartProps {
    timeFilter: '7days' | '30days' | '90days';
}

const ConversionRateChart = ({ timeFilter }: ConversionRateChartProps) => {
    const generateData = () => {
        if (timeFilter === '7days') {
            return [
                { day: 'Mon', rate: 2.8 },
                { day: 'Tue', rate: 3.2 },
                { day: 'Wed', rate: 2.9 },
                { day: 'Thu', rate: 3.8 },
                { day: 'Fri', rate: 3.5 },
                { day: 'Sat', rate: 4.2 },
                { day: 'Sun', rate: 3.9 },
            ];
        } else if (timeFilter === '30days') {
            return Array.from({ length: 30 }).map((_, i) => ({
                day: `${i + 1}`,
                rate: (Math.random() * 2) + 2.5, // Random between 2.5% and 4.5%
            }));
        } else {
            return Array.from({ length: 12 }).map((_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                return {
                    day: date.toLocaleDateString('en-US', { month: 'short' }),
                    rate: (Math.random() * 2) + 2.5,
                };
            }).reverse();
        }
    };

    const data = generateData();

    return (
        <div className="w-full h-full">
            <ChartContainer
                config={{
                    rate: {
                        label: "Conversion Rate",
                        color: "#D946EF",
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
                            tickFormatter={(value) => `${value}%`}
                            width={50}
                        />
                        <ChartTooltip
                            content={({ active, payload }) => (
                                <ChartTooltipContent
                                    active={active}
                                    payload={payload}
                                    formatter={(value) => [`${value}%`, 'Conversion Rate']}
                                />
                            )}
                        />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            name="rate"
                            stroke="#D946EF"
                            strokeWidth={2}
                            dot={{ fill: '#D946EF', r: 2 }}
                            activeDot={{ r: 6 }}
                            animationDuration={500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};

export default ConversionRateChart;
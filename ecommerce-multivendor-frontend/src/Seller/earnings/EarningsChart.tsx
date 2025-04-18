import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', earnings: 400 },
    { month: 'Feb', earnings: 300 },
    { month: 'Mar', earnings: 600 },
    { month: 'Apr', earnings: 800 },
    { month: 'May', earnings: 700 },
    { month: 'Jun', earnings: 950 },
];

const EarningsChart = () => {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280' }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280' }}
                        width={80}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem',
                        }}
                        formatter={(value) => [`$${value}`, 'Earnings']}
                    />
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#7E69AB"
                        strokeWidth={2}
                        dot={{ fill: '#7E69AB' }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningsChart;
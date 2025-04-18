import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart";

const data = [
    { name: 'Delivered', value: 65 },
    { name: 'Pending', value: 25 },
    { name: 'Cancelled', value: 10 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const OrderStatusChart = () => {
    return (
        <div className="w-full h-full">
            <ChartContainer
                config={{
                    Delivered: { color: "#10B981" },
                    Pending: { color: "#F59E0B" },
                    Cancelled: { color: "#EF4444" },
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartTooltip
                            content={({ active, payload }) => (
                                <ChartTooltipContent
                                    active={active}
                                    payload={payload}
                                    formatter={(value, name) => [`${value}%`, name]}
                                />
                            )}
                        />
                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            iconSize={8}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};

export default OrderStatusChart;
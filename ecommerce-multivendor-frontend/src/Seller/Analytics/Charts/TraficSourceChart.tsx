import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart";

const data = [
    { name: 'Direct', value: 40 },
    { name: 'Organic Search', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Referral', value: 15 },
];

const COLORS = ['#8B5CF6', '#0EA5E9', '#F97316', '#10B981'];

const TrafficSourceChart = () => {
    return (
        <div className="w-full h-full">
            <ChartContainer
                config={{
                    Direct: { color: "#8B5CF6" },
                    "Organic Search": { color: "#0EA5E9" },
                    "Social Media": { color: "#F97316" },
                    Referral: { color: "#10B981" },
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="80%"
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
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

export default TrafficSourceChart;
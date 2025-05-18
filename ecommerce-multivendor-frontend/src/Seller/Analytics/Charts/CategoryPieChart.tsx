import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart";

const data = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Home & Kitchen', value: 20 },
    { name: 'Beauty', value: 15 },
    { name: 'Others', value: 5 },
];

const COLORS = ['#7E69AB', '#33C3F0', '#F97316', '#D946EF', '#8B5CF6'];

const CategoryPieChart = () => {
    return (
        <div className="w-full h-full">
            <ChartContainer
                config={{
                    Electronics: { color: "#7E69AB" },
                    Clothing: { color: "#33C3F0" },
                    "Home & Kitchen": { color: "#F97316" },
                    Beauty: { color: "#D946EF" },
                    Others: { color: "#8B5CF6" },
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
                            {data.map((_, index) => (
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

export default CategoryPieChart;
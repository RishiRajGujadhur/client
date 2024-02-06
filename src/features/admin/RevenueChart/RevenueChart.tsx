import { Card } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Define the interface for the revenue data
interface RevenueData {
    month: string;
    revenue: number;
}

// Sample data for the chart
const data: RevenueData[] = [
    { month: 'Jan', revenue: 1000 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 1500 },
    { month: 'May', revenue: 3000 },
    { month: 'Jun', revenue: 2500 },
    { month: 'Jul', revenue: 1800 },
    { month: 'Aug', revenue: 2200 },
    { month: 'Sep', revenue: 2800 },
    { month: 'Oct', revenue: 1200 },
    { month: 'Nov', revenue: 1900 },
    // Add more data here...
];

const RevenueChart: React.FC = () => {
    return (
        <Card>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
                <text x={250} y={30} textAnchor="middle" dominantBaseline="middle">
                    Revenue Month by Month
                </text>
            </BarChart>
        </Card>
    );
};

export default RevenueChart;

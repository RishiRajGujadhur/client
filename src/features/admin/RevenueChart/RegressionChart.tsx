import { Button, Card } from '@mui/material';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import regression from "regression";

const data = [
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
    { month: 'Dec', revenue: 2300 },
    // Add more data points here
];

const RegressionLineChart = () => {
    const [showPredictions, setShowPredictions] = useState(false);

    const handleButtonClick = () => {
        setShowPredictions(true);
    };

    const regressionData = showPredictions ? getRegressionData(data) : [];

    const combinedData = showPredictions ? [...data, ...regressionData] : data;

    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={combinedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#8884d8" />
                    {showPredictions && (
                        <Line type="monotone" dataKey="predictedRevenue" name="Regression Line" stroke="#82ca9d" />
                    )}
                     <text x={250} y={30} textAnchor="middle" dominantBaseline="middle">
                    Revenue and Predictions
                </text>
                </LineChart>
            </ResponsiveContainer>
            <Button size="small" onClick={handleButtonClick}>
                Show Predicted revenue for the next year
            </Button>
        </Card>
    );
};

const getRegressionData = (data: { month: string; revenue: number }[]) => {
        const result = regression.linear(data.map((item: { month: string; revenue: number }, index: number) => [index, item.revenue]));
        const predictedData = result.points.map((point, index) => ({
                month: `Month ${data.length + index + 1}`,
                predictedRevenue: point[1],
        }));
        return predictedData;
};

export default RegressionLineChart;

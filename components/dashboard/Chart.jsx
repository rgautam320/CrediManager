import React from "react";
import { Box, Paper } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ chartData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Box>
                <Doughnut options={options} data={chartData} />
            </Box>
        </Paper>
    );
};

export default Chart;

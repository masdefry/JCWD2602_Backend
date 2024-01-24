'use client'
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

const Page = () => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "2023-01",
            "2023-02",
            "2023-03",
            "2023-04",
            "2023-05",
            "2023-06",
            "2023-07",
          ],
          datasets: [
            {
              data: [100, 120, 115, 134, 168, 132, 200],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              data: [100, 120, 115, 134, 168, 132, 200],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
          ],
        }}
      />
    </div>
  );
};
export default Page;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSession } from "next-auth/react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function groupTransactionsByMonth(transactions) {
  const monthlyData = {};

  transactions.forEach(tx => {
    const date = new Date(tx.startTime);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    if (!monthlyData[monthName]) {
      monthlyData[monthName] = 0;
    }

    monthlyData[monthName] += tx.amount;
  });

  return monthlyData;
}

export const TransactionChart = () => {
  const [chartData, setChartData] = useState(null);
  const {data : session , status} = useSession()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/P2P`, {
        params: { userId: session?.user.id }, // Replace with session?.user.id if available
      });

      const transactions = response.data.Transaction;
      const grouped = groupTransactionsByMonth(transactions);

      const labels = Object.keys(grouped);
      const data = Object.values(grouped);

      setChartData({
        labels,
        datasets: [
          {
            label: "Monthly Transactions",
            data,
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.4)",
            borderWidth: 2,
            pointBackgroundColor: "#a855f7",
            pointBorderColor: "#a855f7",
            pointHoverRadius: 8,
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching transaction data", err);
    }
  };

  useEffect(() => {
    if(session?.user.id){

      fetchData();
    }
  }, [session?.user.id]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
      display : false
      },
      tooltip: {
        bodyColor: "#d4d4d4", // tooltip text
        titleColor: "#d4d4d4",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#d4d4d4",
        },
      
        grid: {
      display: false,
      drawBorder: true,
      drawTicks: true,
      drawOnChartArea: false,
    },
    border: {
      display: true,
      color: "#d4d4d4", // ✅ this is the baseline line color for y-axis
    },
      },
      y: {
        ticks: {
          color: "#d4d4d4",
          callback: (value) => `₹${value}`,
        },
         grid: {
      display: false,
      drawBorder: true,
      drawTicks: true,
      drawOnChartArea: false,
    },
    border: {
      display: true,
      color: "#d4d4d4", // ✅ this is the baseline line color for y-axis
    },
   
      },
    },
  };

  return (
    <div className="p-4 bg-neutral-900 rounded-xl">
    <div className="text-xl font-semibold text-neutral-400 mb-5 text-center">Monthly Transaction</div>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="text-neutral-300">Loading chart...</div>
      )}
    </div>
  );
};

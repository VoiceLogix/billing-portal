import React, { useEffect, useRef } from "react";
import * as Chart from "chart.js";
import { Box } from "../UI/Box";
import { theme } from "../theme";
import { InvoiceHistory } from "../../types/InvoiceInterface";
import { formatToUSD } from "../../utils/formatToUSD";

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.BarController,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
);

interface ChartData {
  month: string;
  invoice: number;
  payment: number;
}

interface MonthlyBarChartProps {
  invoiceHistory: InvoiceHistory;
}

const MonthlyBarChart = ({ invoiceHistory }: MonthlyBarChartProps) => {
  console.log("invoiceHistory", invoiceHistory);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const now = new Date();
  const currentMonthIndex = now.getMonth(); // 0-based: Jan = 0, Jun = 5

  // Step 1: Initialize chart data from Jan to current month
  const data: ChartData[] = Array.from(
    { length: currentMonthIndex + 1 },
    (_, i) => ({
      month: monthNames[i],
      invoice: 0,
      payment: 0,
    }),
  );

  // Step 2: Fill actual data into matching months
  invoiceHistory.invoiceAmounts.forEach((item) => {
    const date = new Date(item.finalizedDate);
    const monthIndex = date.getMonth();
    if (monthIndex <= currentMonthIndex) {
      data[monthIndex].invoice += parseFloat(item.billAmount);
      data[monthIndex].payment += parseFloat(item.paidAmount);
    }
  });
  console.log("Processed data for chart:", data);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart.Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Invoice",
            data: data.map((item) => item.invoice),
            backgroundColor: theme.colors.gray,
            borderColor: theme.colors.gray,
            borderWidth: 1,
            barThickness: 20,
          },
          {
            label: "Payment",
            data: data.map((item) => item.payment),
            backgroundColor: theme.colors.blueAccent,
            borderColor: theme.colors.blueAccent,
            borderWidth: 1,
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: theme.colors.lightGray,
            titleColor: theme.colors.primarytext,
            bodyColor: theme.colors.primarytext,
            titleFont: {
              weight: "normal",
            },
            bodyFont: {
              weight: "normal",
            },
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            cornerRadius: 4,
            callbacks: {
              title: (tooltipItems) => {
                return `${tooltipItems[0].label}`;
              },
              label: (context) => {
                return `$${context.parsed.y.toFixed(2)}`;
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              maxTicksLimit: 4,
              callback: function (value) {
                return formatToUSD(value as number);
              },
            },
            grid: {
              color: theme.colors.gray,
              lineWidth: 1,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: theme.colors.secondarytext,
            },
          },
        },
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 10,
            left: 10,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <Box height="100%" padding="16px">
      <canvas ref={chartRef} />
    </Box>
  );
};

export default MonthlyBarChart;

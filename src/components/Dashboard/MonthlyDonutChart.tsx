import React, { useEffect, useRef } from "react";
import * as Chart from "chart.js";
import { Box } from "../UI/Box";
import { theme } from "../theme";
import { AgingInvoices } from "../../types/AgingInvoicesInterface";
import { formatToUSD } from "../../utils/formatToUSD";

// Register Chart.js components
Chart.Chart.register(
  Chart.ArcElement,
  Chart.DoughnutController,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
);

interface PaymentData {
  label: string;
  value: number;
  color: string;
}

interface MonthlyDonutChartProps {
  agingInvoices: AgingInvoices;
}

const MonthlyDonutChart = ({ agingInvoices }: MonthlyDonutChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);

  const agingInvoiceDetails = agingInvoices.agingInvoiceDetails;
  const colorMap: Record<keyof typeof agingInvoiceDetails, string> = {
    notDueYet: "#FF5650",
    oneToThrityDaysDue: "#FFEB3B",
    thirtyToSixtyDaysDue: "#FFC107",
    sixtyToNinetyDaysDue: "#FF9800",
    moreThanNinetyDaysDue: "#F44336",
  };
  function formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  const data = Object.entries(agingInvoiceDetails).map(([key, value]) => ({
    label: formatLabel(key),
    value,
    color: colorMap[key as keyof typeof agingInvoiceDetails],
  }));

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: data.map((item) => item.color),
            hoverBorderWidth: 0,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "40%",
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
            position: "nearest",
            borderWidth: 1,
            borderColor: theme.colors.gray,
            padding: 10,
            cornerRadius: 4,
            callbacks: {
              title: (tooltipItems) => {
                return `${tooltipItems[0].label}`;
              },
              label: (context) => {
                const value = context.parsed as number;
                const dataArray = context.chart.data.datasets[0]
                  .data as number[];
                const total = dataArray.reduce((sum, v) => sum + v, 0);
                const pct =
                  total > 0 ? ((value / total) * 100).toFixed(0) : "0";
                return `${formatToUSD(value)}  (${pct}%)`;
              },
            },
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
    <Box width={160}>
      <canvas ref={chartRef} />
    </Box>
  );
};

export default MonthlyDonutChart;

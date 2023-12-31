"use client";
import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = () => {
  const labels = getLastMonthYear()

  const options = {
    responsive: true,
    Plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Yearly Views",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "views",
        data: [1, 2, 3, 4, 5],
        borderColor: "rgba(107,70,193,0.5)",
        backgroundColor: "#6b46c1",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export const DoughnutChart = () => {
  const data = {
    labels: ["subscribed", "Not Subscribed"],
    datasets: [
      {
        label: "views",
        data: [3, 17],
        borderColor: ["rgb(62,12,171)", "rgb(214,43,129)"],
        backgroundColor: ["rgba(62,12,171,0.3)", "rgba(214,43,129,0.3)"],
      },
    ],
  };

  return <Doughnut data={data} />;
};

function getLastMonthYear() {
  const labels = [];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth: any = new Date().getMonth();
  let remain = 11 - currentMonth;

  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];
    labels.unshift(element);
    if (i === 0) break;
  }

  for (let i = 11; i > remain; i--) {
    if(i===currentMonth) break
    const element = months[i];
    labels.unshift(element);
  }
  return labels;
}


import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

function WeightChart({
  weights,
  title,
  color = "rgba(75, 192, 192, 1)",
}) {
  const data = {
    labels: weights.map((entry) => entry.date), // X-axis: dates
    datasets: [
      {
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        borderColor: color,
        pointHoverRadius: 6,
        label: `${title} (kg)`,
        backgroundColor: color,
        data: weights.map((entry) => entry.weight), // Y-axis: weights
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          text: title,
          display: true,
        },
        beginAtZero: false,
      },
    },
  };

  return ( <Line data={data} options={options} /> );
  
}

export { WeightChart };
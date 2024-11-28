import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title, Filler);

function WeightChart({ weights }) {
    const data = {
        labels: weights.map((entry) => entry.date),     // X-axis: dates
        datasets: [
          {
            label: 'Weight (kg)',
            data: weights.map((entry) => entry.weight), // Y-axis: weights
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Weight (kg)',
            },
            beginAtZero: false,
          },
        },
    };
    return (
        <>
            <Line data={data} options={options} /> 
        </>
    );
}

export { WeightChart };
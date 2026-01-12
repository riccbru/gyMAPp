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
  Filler
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title, Filler);

function ExerciseChart({ logs, exerciseName, color = "rgba(54, 162, 235, 1)" }) {
  const exerciseLogs = logs
    .filter((l) => l.exercise_name === exerciseName)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: exerciseLogs.map((l) => l.date), 
    datasets: [
      {
        label: `Total Volume (Total Reps)`,
        data: exerciseLogs.map((l) => l.reps.reduce((a, b) => a + b, 0)),
        borderColor: color,
        backgroundColor: color.replace("1)", "0.2)"),
        tension: 0.4,
        fill: true,
      },
      {
        label: `Endurance (Max Reps in 1 Set)`,
        data: exerciseLogs.map((l) => Math.max(...l.reps)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderDash: [5, 5], // Dashed line to distinguish from volume
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: '', color: 'white' },
      // title: { display: true, text: exerciseName.toUpperCase(), color: 'white' },
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } },
      y: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" }, beginAtZero: true }
    },
  };

  return (
    <div className="h-full w-full p-4 bg-slate-800 rounded-xl shadow-lg flex items-center">
      <div className="w-full h-full min-h-[320px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export { ExerciseChart };
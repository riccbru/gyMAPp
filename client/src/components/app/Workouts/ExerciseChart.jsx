import { Star } from "lucide-react";
import { Line } from "react-chartjs-2";
import { renderToString } from "react-dom/server";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
);

const createIconImage = () => {
  const svgString = renderToString(
    <Star size={20} fill="#fbbf24" color="#fbbf24" strokeWidth={1} />,
  );
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(svgString);
  return img;
};

const yellowStar = createIconImage();

function ExerciseChart({
  logs,
  exerciseName,
  color = "rgba(54, 162, 235, 1)",
}) {
  const exerciseLogs = logs
    .filter((l) => l.exercise_name === exerciseName)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const volData = exerciseLogs.map((l) => l.reps.reduce((a, b) => a + b, 0));
  const endData = exerciseLogs.map((l) => Math.max(...l.reps));

  const maxVolIdx = volData.lastIndexOf(Math.max(...volData));
  const maxEndIdx = endData.lastIndexOf(Math.max(...endData));

  const absMax = Math.max(...volData, ...endData);

  const data = {
    labels: exerciseLogs.map((l) => l.date),
    datasets: [
      {
        fill: true,
        tension: 0.4,
        data: volData,
        borderColor: color,
        label: `Total Volume (Total Reps)`,
        backgroundColor: color.replace("1)", "0.2)"),
        pointStyle: volData.map((_, i) =>
          i === maxVolIdx ? yellowStar : "circle",
        ),
        pointRadius: volData.map((_, i) => (i === maxVolIdx ? 12 : 4)),
        pointHoverRadius: volData.map((_, i) => (i === maxVolIdx ? 12 : 4)),
      },
      {
        tension: 0.4,
        data: endData,
        borderDash: [5, 5],
        label: `Endurance (Max Reps in 1 Set)`,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointStyle: endData.map((_, i) =>
          i === maxEndIdx ? yellowStar : "circle",
        ),
        pointRadius: endData.map((_, i) => (i === maxEndIdx ? 12 : 4)),
        pointHoverRadius: endData.map((_, i) => (i === maxEndIdx ? 12 : 4)),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "", color: "white" },
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: {
        grid: { color: "#334155" },
        ticks: { color: "#94a3b8" },
      },
      y: {
        beginAtZero: true,
        suggestedMax: absMax + 5,
        grid: { color: "#334155" },
        ticks: { color: "#94a3b8" },
      },
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

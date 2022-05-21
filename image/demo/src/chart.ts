import { Chart, registerables } from "chart.js";
import { classes } from "./model";

const canvas = document.querySelector("#prediction-chart") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

Chart.register(...registerables);

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: classes as unknown as string[],
    datasets: [],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        title: {
          display: true,
          text: "Confidence",
        },
      },
      x: {
        title: {
          display: true,
          text: "Emotion",
        },
      },
    },
  },
});

const colors = [
  "#ff6384",
  "#36a3eb",
  "#ffcf56",
  "#4bc0c0",
  "#9966ff",
  "#ffa040",
  "#4ba1de",
];

export function setPrediction(assocList: [string, number][]) {
  chart.data.datasets = [
    {
      data: assocList.map((e) => e[1]),
      backgroundColor: colors.map((c) => c + "33"),
      borderColor: colors.map((c) => c + "ff"),
      borderWidth: 1,
    },
  ];
  chart.update();
}

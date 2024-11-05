import { IJarItemWithFruit } from "@/interfaces";
import { generateColorFromName } from "@/lib/utils";
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartProps {
  jarItems: IJarItemWithFruit[];
}

export function PieChart({ jarItems }: IPieChartProps) {
  const pieChartData: ChartData<"pie"> = useMemo(() => {
    return {
      labels: jarItems.map((item) => item.fruit.name),
      datasets: [
        {
          label: " Calories",
          data: jarItems.map(
            (item) => item.fruit.nutritions.calories * item.quantity
          ),
          backgroundColor: jarItems.map((item) =>
            generateColorFromName(item.fruit.name)
          ),
        },
      ],
    };
  }, [jarItems]);

  return <Pie data={pieChartData} />;
}

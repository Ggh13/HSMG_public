import { FC } from "react";
import { StatisticGraph } from "@/components/StatisticGraph/StatisticGraph";
import { ExerciseStatistics } from "../../types/types";

interface TrainingStatisticsGraphProps {
    data?: ExerciseStatistics;
    typeData: "weight" | "count";
}

export const TrainingStatisticsGraph: FC<TrainingStatisticsGraphProps> = ({
    data,
    typeData
}) => {
    if (!data?.data || Object.keys(data.data).length === 0) {
        return <p className="m16med">Нет данных для отображения</p>;
    }

    const dataEntries = Object.entries(data.data)
        .map(([date, value]) => ({
            date,
            value
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const labels = dataEntries.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    });

    const values = dataEntries.map(item => item.value);

    const chartData = {
        labels,
        datasets: [
            {
                label: typeData === "weight" ? "Вес (кг)" : "Повторения",
                data: values,
                borderColor: "#007AFF",
                backgroundColor: "#007AFF20",
                fill: true,
            },
        ],
    };

    return (
        <StatisticGraph
            data={chartData}
        />
    );
};
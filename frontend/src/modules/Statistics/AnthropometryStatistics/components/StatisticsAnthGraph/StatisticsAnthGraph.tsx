import { FC } from "react";
import { Anthropometry, BodyMeasurementType } from "../../types/types";
import { StatisticGraph } from "@/components/StatisticGraph/StatisticGraph";

interface StatisticsAnthGraphProps {
    data: Anthropometry[];
    measurementType: BodyMeasurementType;
}

const measurementLabels: Record<BodyMeasurementType, string> = {
    height: "Рост (см)",
    weight: "Вес (кг)",
    neck_girth: "Обхват шеи (см)",
    shoulder_girth: "Обхват плеч (см)",
    chest_girth: "Обхват груди (см)",
    waist_girth: "Обхват талии (см)",
    biceps_girth: "Обхват бицепса (см)",
    forearms_girth: "Обхват предплечья (см)",
    hip_girth: "Обхват бедра (см)",
    quadriceps_girth: "Обхват квадрицепса (см)",
    calf_girth: "Обхват икры (см)",
    wrist_girth: "Обхват запястья (см)",
    ankle_girth: "Обхват лодыжки (см)"
};

export const StatisticsAnthGraph: FC<StatisticsAnthGraphProps> = ({
    data,
    measurementType
}) => {
    if (!data?.length) {
        return <p className="m16med">Нет данных для отображения</p>;
    }

    const dateGroups = data.reduce((acc, measurement) => {
        const dateKey = new Date(measurement.date).toISOString().split('T')[0];
        const value = measurement[measurementType];

        if (!acc[dateKey]) {
            acc[dateKey] = {
                sum: value,
                count: 1,
                date: measurement.date
            };
        } else {
            acc[dateKey].sum += value;
            acc[dateKey].count += 1;
        }

        return acc;
    }, {} as Record<string, { sum: number; count: number; date: string }>);

    const sortedData = Object.entries(dateGroups)
        .map(([_, { sum, count, date }]) => ({
            date,
            value: sum / count
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const chartData = {
        labels: sortedData.map(item =>
            new Date(item.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            })
        ),
        datasets: [{
            label: measurementLabels[measurementType],
            data: sortedData.map(item => item.value),
            borderColor: "#007AFF",
            backgroundColor: "#007AFF20",
            fill: true,
        }]
    };

    return <StatisticGraph data={chartData} />;
};
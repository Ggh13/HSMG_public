import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface StatisticGraphProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      fill?: boolean;
    }[];
  };
  title?: string;
}

export const StatisticGraph: React.FC<StatisticGraphProps> = ({ data }) => {
  const option = {
    legend: {
      show: false,
      data: data.datasets.map((d) => d.label),
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.labels,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    series: data.datasets.map((dataset) => ({
      name: dataset.label,
      type: 'line',
      data: dataset.data,
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: dataset.borderColor || '#007AFF',
      },
      lineStyle: {
        width: 2,
        color: dataset.borderColor || '#007AFF',
      },
      areaStyle: dataset.fill
        ? {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(229, 229, 234, 1)' },
              { offset: 1, color: 'rgba(0, 122, 255, 1)' },
            ]),
          }
        : undefined,
      emphasis: {
        itemStyle: {
          color: '#fff',
          borderColor: dataset.borderColor || '#007AFF',
          borderWidth: 2,
        },
      },
    })),
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

import React, { useState, useEffect } from "react";
import { fetchProductCountsByCategory } from "@/services/products"; 
import { fetchCategoryNamesByIds } from "@/providers/categories";
import ReactApexChart from 'react-apexcharts';

export default function CardBarChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchProductCountsByCategory()
            .then((data) => {
                if (data) {
                    const categoryIds = data.map(item => item[0]);
                    fetchCategoryNamesByIds(categoryIds)
                        .then(names => {
                            const labels = names;
                            const counts = data.map(item => item[1]);
                            setChartData({
                                labels: labels,
                                counts: counts,
                            });
                        });
                }
            });
    }, []);

    const formatDataForChart = (labels, counts) => {
        return labels.map((label, index) => ({
            x: label,
            y: [0, counts[index]]
        }));
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-dark w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                Performance
                            </h6>
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Quantity of products per Category
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px" style={{ width: '600px' }}>
          {chartData && (
        <ReactApexChart
            options={{
                chart: {
                    height: 350,
                    type: 'rangeBar',
                    zoom: {
                        enabled: false
                    }
                },
                                    plotOptions: {
                                        bar: {
                                            isDumbbell: true,
                                            columnWidth: 3,
                                            dumbbellColors: [['#008FFB', '#00E396']]
                                        }
                                    },
                                    legend: {
                                        show: true,
                                        showForSingleSeries: true,
                                        position: 'top',
                                        horizontalAlign: 'left',
                                        customLegendItems: ['Category']
                                    },
                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            type: 'vertical',
                                            gradientToColors: ['#00E396'],
                                            inverseColors: true,
                                            stops: [0, 100]
                                        }
                                    },
                                    grid: {
                                        xaxis: {
                                            lines: {
                                                show: true
                                            }
                                        },
                                        yaxis: {
                                            lines: {
                                                show: false
                                            }
                                        }
                                    },
                                    xaxis: {
                                        categories: chartData.labels,
                                        tickPlacement: 'on'
                                    }
                                }}
                                series={[{
                                    data: formatDataForChart(chartData.labels, chartData.counts)
                                }]}
                                type="rangeBar"
                                height={350}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

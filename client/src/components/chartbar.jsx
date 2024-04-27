import React, { useState, useEffect } from "react";
import { fetchProductCountsByCategory } from "@/services/products"; 
import ReactApexChart from 'react-apexcharts';

export default function CardBarChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchProductCountsByCategory()
            .then((data) => {
                if (data) {
                    const formattedData = data.map(item => ({
                        label: item[0].name,
                        count: item[1]
                    }));
                    console.log(formattedData)
                    const labels = formattedData.map(item => item.label);
                    const counts = formattedData.map(item => item.count);
                    setChartData({
                        labels: labels,
                        counts: counts
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
            <div className="relative flex flex-col min-w-0 break-words bg-dark w-full mb-6 rounded">
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
                    <div className="relative" style={{ height: '350px' }}>
                    {chartData && (
                        <ReactApexChart
                            options={{
                                chart: {
                                    foreColor: '#9baec8',
                                    type: 'bar', // Changed to column bars
                                    zoom: {
                                        enabled: false
                                    }
                                },
                                plotOptions: {
                                    bar: {
                                        columnWidth: '50%', // Adjust column width as needed
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
                                        gradientToColors: ['cyan'],
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
                            type="bar"
                            height="100%"
                            width="100%"
                        />
                    )}

                    </div>
                </div>
            </div>
        </>
    );
    
}
